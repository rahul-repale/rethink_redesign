import { useState, useEffect } from 'react'
import { X, CheckCircle2, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import { useUserAction } from '../contexts/UserActionContext'

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  actionName: string
  impactValue: number
  impactUnit?: string
}

// Simulated data dictionary for action-specific steps
const ACTION_STEPS: Record<string, { desc: string, verb: string, unit: string, steps: string[] }> = {
  'Paperless Billing Punch': {
    desc: 'Each paper bill has a CO2e footprint of 70-75 grams (considering paper manufacturing, printing, ink usage, envelope, distribution, etc.).',
    verb: 'switching',
    unit: 'bills',
    steps: [
      'Switch from paper bills to paperless bills.',
      'Check your email or app to confirm the switch.',
      'Track how many utility bills you acted on and add the number below.'
    ]
  },
  'Why Not a Newsletter': {
    desc: 'Unread newsletters clog up servers that consume massive amounts of energy. A single email can emit 4g to 50g of CO2e.',
    verb: 'unsubscribing from',
    unit: 'newsletters',
    steps: [
      'Search your inbox for "unsubscribe".',
      'Unsubscribe from at least 5 newsletters you no longer read.',
      'Delete the old emails from those senders.'
    ]
  },
  'Embarrassing Email Accounts': {
    desc: 'Old, abandoned email accounts continue to receive spam, taking up server space and consuming energy 24/7.',
    verb: 'deleting',
    unit: 'email accounts',
    steps: [
      'Log into an old email account you no longer use.',
      'Forward any important documents to your main account.',
      'Permanently delete the old email account.'
    ]
  },
  'Pick a Bottle and Run': {
    desc: 'Plastic bottles take 450 years to decompose. Picking one up prevents microplastics from entering our waterways.',
    verb: 'picking up',
    unit: 'plastic bottles',
    steps: [
      'Spot a discarded plastic bottle during your commute or run.',
      'Pick it up safely.',
      'Dispose of it in a proper recycling bin.'
    ]
  },
  "Family's Treasure": {
    desc: 'Passing down items reduces the need for new manufacturing, which is the largest source of carbon emissions in fashion.',
    verb: 'reusing',
    unit: 'items',
    steps: [
      'Identify an item you no longer need.',
      'Ask friends or family if they would like to use it.',
      'Hand it over instead of throwing it away.'
    ]
  },
  'Close Those Tabs': {
    desc: 'Every open browser tab consumes memory and CPU power, drawing unnecessary electricity from the grid.',
    verb: 'closing',
    unit: 'tabs',
    steps: [
      'Review your open browser tabs.',
      'Bookmark the ones you might need later.',
      'Close at least 10 tabs you aren\'t actively using.'
    ]
  },
  "Don't Play Autoplay": {
    desc: 'Streaming video is incredibly energy-intensive. Autoplaying videos you aren\'t watching wastes data and power.',
    verb: 'disabling autoplay on',
    unit: 'apps',
    steps: [
      'Go to the settings of your favorite streaming app (YouTube, Netflix, etc.).',
      'Find the "Autoplay" toggle.',
      'Turn Autoplay OFF.'
    ]
  },
  'Wrap It Right': {
    desc: 'Single-use wrapping paper cannot be recycled if it has foil or glitter. Reusable wrapping saves trees and water.',
    verb: 'reusing',
    unit: 'gift wraps',
    steps: [
      'Save gift bags, boxes, or wrapping paper from a gift you received.',
      'Store it safely so it doesn\'t wrinkle.',
      'Reuse it for the next gift you give.'
    ]
  },
  'Period Choices': {
    desc: 'Conventional menstrual products contain up to 90% plastic. Sustainable alternatives drastically reduce landfill waste.',
    verb: 'switching to',
    unit: 'reusable products',
    steps: [
      'Research sustainable period products (menstrual cups, period underwear, etc.).',
      'Purchase one reusable alternative.',
      'Replace at least one cycle\'s worth of disposable products.'
    ]
  },
  'Hair Go Natural': {
    desc: 'Hair dryers use up to 2,000 watts of electricity—more than a microwave. Air drying saves massive amounts of energy.',
    verb: 'air drying',
    unit: 'times',
    steps: [
      'Towel dry your hair after washing.',
      'Skip the blow dryer and let it air dry completely.',
      'Style as usual without heat.'
    ]
  },
  'Air Dry Laundry': {
    desc: 'Tumble dryers are one of the most energy-hungry appliances in a home. Line drying is free and zero-emission.',
    verb: 'air drying',
    unit: 'loads of laundry',
    steps: [
      'Take your wet laundry out of the washing machine.',
      'Hang it on a drying rack or clothesline.',
      'Let the sun and air dry your clothes naturally.'
    ]
  },
  'Handkerchiefs': {
    desc: 'Paper tissues require cutting down trees and industrial processing. Handkerchiefs can be washed and reused for years.',
    verb: 'using',
    unit: 'handkerchiefs',
    steps: [
      'Obtain a reusable cloth handkerchief.',
      'Carry it with you instead of a pack of tissues.',
      'Wash it with your regular laundry when used.'
    ]
  },
  'Wonder Bra': {
    desc: 'Washing machines and dryers break down the elastic in bras faster, requiring frequent, carbon-heavy replacements.',
    verb: 'hand washing',
    unit: 'bras',
    steps: [
      'Hand wash your bra in the sink with mild detergent.',
      'Gently press the water out (do not wring).',
      'Lay flat or hang to air dry.'
    ]
  },
  '1°C Up!': {
    desc: 'Adjusting your AC by just 1 degree can reduce its energy consumption by up to 10% without affecting comfort.',
    verb: 'adjusting',
    unit: 'AC units',
    steps: [
      'Check your air conditioner\'s current set temperature.',
      'Increase the temperature by exactly 1°C.',
      'Leave it at this new baseline.'
    ]
  },
  'Dark Mode': {
    desc: 'On modern OLED screens, displaying black pixels turns off the LED completely, saving battery life and electricity.',
    verb: 'enabling dark mode on',
    unit: 'devices',
    steps: [
      'Open the settings on your phone or computer.',
      'Navigate to Display or Appearance settings.',
      'Enable Dark Mode system-wide.'
    ]
  },
  'Unplug Devices': {
    desc: '"Vampire power" from plugged-in but turned-off devices accounts for up to 10% of residential electricity use.',
    verb: 'unplugging',
    unit: 'devices',
    steps: [
      'Identify appliances you aren\'t actively using (toaster, charger, TV).',
      'Pull the plug from the wall socket.',
      'Leave it unplugged until you actually need it.'
    ]
  },
  'Sleep Mode': {
    desc: 'Leaving a computer running overnight wastes electricity. Sleep mode drops power consumption to a fraction of a watt.',
    verb: 'enabling sleep mode on',
    unit: 'computers',
    steps: [
      'Go to your computer\'s power settings.',
      'Set the screen to turn off after 5 minutes of inactivity.',
      'Set the computer to enter sleep mode after 15 minutes.'
    ]
  },
  'Power Saver': {
    desc: 'Power saving mode throttles background app activity and lowers screen brightness, extending battery life and reducing charges.',
    verb: 'enabling power saver on',
    unit: 'devices',
    steps: [
      'Open your smartphone\'s battery settings.',
      'Toggle on "Low Power Mode" or "Battery Saver".',
      'Keep it on to reduce charging frequency.'
    ]
  },
  'Default': {
    desc: 'Every small action contributes to a sustainable future.',
    verb: 'completing',
    unit: 'actions',
    steps: [
      'Complete the action described.',
      'Confirm your completion.',
      'Log your impact to help us track community progress.'
    ]
  }
}

export default function ActionModal({
  isOpen,
  onClose,
  actionName,
  impactValue,
  impactUnit = 'kg CO2e',
  initialQuantity = 1,
}: ActionModalProps & { initialQuantity?: number }) {
  const [step, setStep] = useState<'info' | 'success'>('info')
  const [errorMsg, setErrorMsg] = useState('')
  const [quantity, setQuantity] = useState(initialQuantity)
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { logAction, karmaPoints, totalCo2e, history } = useUserAction()

  useEffect(() => {
    if (isOpen) {
      setStep('info')
      setErrorMsg('')
      setQuantity(initialQuantity || 1)
    }
  }, [isOpen, initialQuantity])

  useEffect(() => {
    if (isOpen && !currentUser) {
      // Redirect to sign in if not logged in
      navigate('/signin')
      onClose()
    }
  }, [isOpen, currentUser, navigate, onClose])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !currentUser) return null

  // Ensure click inside modal doesn't close it
  function handleModalClick(e: React.MouseEvent) {
    e.stopPropagation()
  }

  const details = ACTION_STEPS[actionName] || ACTION_STEPS[actionName === 'Pick Up Just One Plastic Bottle' ? 'Pick a Bottle and Run' : 'Default'] || ACTION_STEPS['Default']
  const totalImpact = impactValue * quantity

  function handleSubmit() {
    if (quantity < 1) {
      setErrorMsg('Quantity must be at least 1')
      return
    }
    const res = logAction(actionName, totalImpact)
    if (res.success) {
      setStep('success')
      setErrorMsg('')
    } else {
      setErrorMsg(res.error || 'Failed to log action')
    }
  }

  // Custom success data
  const userActionsCount = history.length + 1 // including this one conceptually for the success screen text, though it's already in history if success is true
  const actualCount = step === 'success' ? history.length : userActionsCount

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-xl bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        onClick={handleModalClick}
      >
        {step === 'info' && (
          <>
            <div className="flex items-start justify-between border-b border-outline-variant/30 px-8 pb-4 pt-8 bg-surface-container/30">
              <div>
                <h2 className="mb-1 font-headline-md text-[24px] font-semibold text-primary">
                  {actionName}
                </h2>
                <span className="font-label-md text-[12px] bg-primary-fixed/30 text-primary px-2 py-1 rounded-full uppercase tracking-wider">
                  Base Impact: {impactValue} {impactUnit}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              {errorMsg && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg flex gap-3 text-error">
                  <ShieldAlert size={20} className="shrink-0 mt-0.5" />
                  <p className="font-body-md text-body-md">{errorMsg}</p>
                </div>
              )}

              <p className="font-body-md text-body-md text-on-surface mb-6 leading-relaxed">
                {details.desc}
              </p>

              <div className="mb-8 space-y-4">
                <h4 className="font-label-md text-label-md uppercase tracking-wider text-outline">Steps to complete:</h4>
                <ol className="list-decimal pl-5 space-y-3 font-body-md text-body-md text-on-surface-variant">
                  {details.steps.map((s, i) => (
                    <li key={i} className="pl-2">{s}</li>
                  ))}
                </ol>
              </div>

              <div className="mb-8 space-y-2">
                <label className="block text-label-md font-label-md uppercase text-on-surface-variant mb-2">
                  How many {details.unit} did you complete?
                </label>
                <input 
                  autoFocus
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-surface-bright border border-outline-variant focus:border-primary rounded-md px-4 py-3 text-body-lg font-body-lg outline-none transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-8 py-4 font-label-md text-label-md uppercase tracking-wider text-on-primary shadow-sm transition-colors hover:bg-primary"
                >
                  Log Action ({totalImpact.toFixed(1)} {impactUnit})
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center p-10 text-center relative">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary focus:outline-none"
            >
              <X size={20} />
            </button>
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-fixed/20 rounded-bl-full -z-10 blur-2xl"></div>
            
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-fixed text-primary shadow-sm border border-primary-fixed-dim">
              <CheckCircle2 size={40} />
            </div>

            <h3 className="mb-4 font-headline-md text-headline-md font-semibold text-primary">
              Awesome job, {currentUser.name}!
            </h3>
            
            <div className="mb-8 font-body-md text-body-md text-on-surface-variant space-y-4 leading-relaxed text-left bg-surface-container/30 p-6 rounded-lg border border-outline-variant/30">
              <p>You're acting sustainably and making a real difference!</p>
              
              <p>
                By {details.verb} <strong>{quantity} {details.unit}</strong>, you've saved <strong>{totalImpact.toFixed(3)} {impactUnit}</strong> per month, which adds up to <strong>{(totalImpact * 12).toFixed(3)} {impactUnit}</strong> per year*.
              </p>
              
              <p>
                You've cultivated <strong>0.5 Karma points</strong> through this action — bringing your total eco-score to <strong>{karmaPoints}</strong>!
              </p>
              
              <p>
                Your total impact from <strong>{actualCount} micro-actions</strong> is <strong>{(totalCo2e).toFixed(3)} kg of CO₂e</strong> saved.
              </p>

              <p className="text-[12px] italic text-outline mt-2 pt-2 border-t border-outline-variant/30">
                Note: CO2e is a standard unit that measures the impact of greenhouse gases in terms of the equivalent amount of carbon dioxide (CO₂).
              </p>
            </div>

            <div className="w-full bg-primary-fixed/20 p-4 rounded-lg mb-6 flex flex-col items-center border border-primary-fixed-dim/30">
              <span className="font-label-md text-[11px] uppercase tracking-wider text-primary mb-1">Impact Report</span>
              <p className="font-body-md text-[13px] text-on-surface-variant text-center max-w-[280px]">
                You will receive your impact report on the WhatsApp number you submitted (+91 {currentUser.phone}) within 24-72 hours.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface hover:bg-outline-variant/30 transition-colors uppercase tracking-wider"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
