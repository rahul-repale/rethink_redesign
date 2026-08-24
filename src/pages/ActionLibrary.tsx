import { useState, useMemo } from 'react'
import {
  Mail,
  Trash2,
  FileText,
  Footprints,
  Gift,
  AppWindow,
  Video,
  Package,
  Droplets,
  Scissors,
  Shirt,
  Scroll,
  Thermometer,
  Monitor,
  Plug,
  Moon,
  Zap,
  ArrowUpDown,
  Share2,
  Plus,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ActionModal from '../components/ActionModal'

/* Brand SVG icons (lucide-react doesn't include brand logos) */
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Real data from the live site (rethink.getre.org/rethink/micro-actions) */
/* ------------------------------------------------------------------ */

type Category = 'Digital Footprint' | 'Plastic' | 'Generic' | 'Trees'

interface MicroAction {
  name: string
  description: string
  impact: number
  impactUnit: string
  category: Category
  icon: LucideIcon
}

const ACTIONS: MicroAction[] = [
  {
    name: 'Why Not a Newsletter',
    description:
      'Unsubscribe from newsletters you never read. Every stored email consumes server energy around the clock.',
    impact: 1577,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: Mail,
  },
  {
    name: 'Embarrassing Email Accounts',
    description:
      'Delete old, unused email accounts and their stored data. Reduce your hidden digital carbon footprint.',
    impact: 2654,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: Trash2,
  },
  {
    name: 'Paperless Billing Punch',
    description:
      'Switch all your bills and statements to digital. Less paper means fewer trees cut and less transport emissions.',
    impact: 249,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: FileText,
  },
  {
    name: 'Pick a Bottle and Run',
    description:
      'Pick up just one plastic bottle during your walk or jog. A 500ml PET bottle produces around 50gm CO2e over its life cycle.',
    impact: 0.05,
    impactUnit: 'kg CO2e',
    category: 'Plastic',
    icon: Footprints,
  },
  {
    name: "Family's Treasure",
    description:
      'Pass on pre-loved items within your family instead of buying new. Reduce manufacturing demand and waste.',
    impact: 14,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Gift,
  },
  {
    name: 'Close Those Tabs',
    description:
      'Close browser tabs you\'re not using. Each open tab consumes memory and energy, even in the background.',
    impact: 2,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: AppWindow,
  },
  {
    name: "Don't Play Autoplay",
    description:
      'Disable autoplay on streaming platforms. You watch what you choose, and save data and energy in the process.',
    impact: 191,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: Video,
  },
  {
    name: 'Wrap It Right',
    description:
      'Use newspaper, cloth, or reusable wrapping instead of plastic wrap and glossy gift paper.',
    impact: 35,
    impactUnit: 'kg CO2e',
    category: 'Plastic',
    icon: Package,
  },
  {
    name: 'Period Choices',
    description:
      'Switch to sustainable menstrual products like cups or cloth pads. Reduce single-use plastic waste monthly.',
    impact: 1,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Droplets,
  },
  {
    name: 'Hair Go Natural',
    description:
      'Let your hair air dry instead of using a blow dryer. Save energy and keep your hair healthier.',
    impact: 16,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Scissors,
  },
  {
    name: 'Air Dry Laundry',
    description:
      'Skip the dryer and hang your clothes to air dry. A single dryer cycle uses significant energy.',
    impact: 294,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Shirt,
  },
  {
    name: 'Handkerchiefs',
    description:
      'Replace disposable tissues with a reusable handkerchief. Small switch, lifelong impact on paper waste.',
    impact: 0.13,
    impactUnit: 'kg CO2e',
    category: 'Trees',
    icon: Scroll,
  },
  {
    name: 'Wonder Bra',
    description:
      'Extend the life of your bras by hand-washing and air drying them. Fewer replacements means less waste.',
    impact: 55,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Shirt,
  },
  {
    name: '1°C Up!',
    description:
      'Raise your AC temperature by just 1°C. You won\'t notice the difference, but your energy bill and the planet will.',
    impact: 2898,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Thermometer,
  },
  {
    name: 'Dark Mode',
    description:
      'Switch your devices to dark mode. On OLED screens, dark pixels use significantly less power.',
    impact: 138,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: Monitor,
  },
  {
    name: 'Unplug Devices',
    description:
      'Unplug chargers and devices when not in use. Phantom energy drain adds up across your home.',
    impact: 140,
    impactUnit: 'kg CO2e',
    category: 'Generic',
    icon: Plug,
  },
  {
    name: 'Sleep Mode',
    description:
      'Enable sleep mode on your computer instead of leaving it running. Cuts idle energy use dramatically.',
    impact: 2265,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: Moon,
  },
  {
    name: 'Power Saver',
    description:
      'Turn on power-saving mode on your phone and laptop. Small setting, measurable energy savings.',
    impact: 1605,
    impactUnit: 'kg CO2e',
    category: 'Digital Footprint',
    icon: Zap,
  },
]

const CATEGORIES: Category[] = [
  'Digital Footprint',
  'Plastic',
  'Trees',
  'Generic',
]

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  'Digital Footprint': {
    bg: 'bg-accent-teal/10',
    text: 'text-accent-teal',
  },
  Plastic: {
    bg: 'bg-accent-orange/10',
    text: 'text-accent-orange',
  },
  Trees: {
    bg: 'bg-accent-gold/10',
    text: 'text-accent-gold',
  },
  Generic: {
    bg: 'bg-accent-blue/10',
    text: 'text-accent-blue',
  },
}

type SortMode = 'default' | 'impact-high' | 'impact-low'

export default function ActionLibrary() {
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set()
  )
  const [sortMode, setSortMode] = useState<SortMode>('default')
  const [loggingAction, setLoggingAction] = useState<MicroAction | null>(null)

  function toggleCategory(cat: Category) {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) {
        next.delete(cat)
      } else {
        next.add(cat)
      }
      return next
    })
  }

  const filteredAndSorted = useMemo(() => {
    let result =
      activeCategories.size === 0
        ? [...ACTIONS]
        : ACTIONS.filter((a) => activeCategories.has(a.category))

    if (sortMode === 'impact-high') {
      result.sort((a, b) => b.impact - a.impact)
    } else if (sortMode === 'impact-low') {
      result.sort((a, b) => a.impact - b.impact)
    }

    return result
  }, [activeCategories, sortMode])

  function cycleSortMode() {
    setSortMode((prev) => {
      if (prev === 'default') return 'impact-high'
      if (prev === 'impact-high') return 'impact-low'
      return 'default'
    })
  }

  const sortLabel =
    sortMode === 'impact-high'
      ? 'Highest Impact'
      : sortMode === 'impact-low'
        ? 'Lowest Impact'
        : 'Sort by Impact'

  function handleShare(actionName: string) {
    const text = `I just discovered "${actionName}" on ReThink! Small actions, big impact. 🌱`
    if (navigator.share) {
      navigator.share({ title: 'ReThink', text, url: window.location.href }).catch(console.error)
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!")
      }).catch(console.error)
    }
  }

  function handleWhatsApp(actionName: string) {
    const text = encodeURIComponent(
      `Check out this micro-action on ReThink: "${actionName}" 🌱\n${window.location.href}`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  function handleInstagram() {
    window.open('https://www.instagram.com/', '_blank')
  }

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12">
      {/* Header Section */}
      <header className="mb-16 text-center md:text-left">
        <h1 className="text-headline-lg-mobile font-headline-lg-mobile md:text-display-lg md:font-display-lg text-primary mb-4">
          Micro-Action Library
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Small shifts, significant impact. Explore our curated library of
          actions designed to integrate seamlessly into your routine.
        </p>
      </header>

      {/* Filter & Sort Controls */}
      <section
        aria-label="Action Filters"
        className="mb-12 flex flex-wrap items-center gap-3"
      >
        <span className="text-label-md font-label-md text-on-surface-variant mr-2">
          Filter by:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategories.has(cat)
          const style = CATEGORY_STYLES[cat]
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-2 rounded-full text-label-md font-label-md uppercase tracking-wider transition-all duration-200 border ${
                isActive
                  ? `${style.bg} ${style.text} border-current font-bold`
                  : `${style.bg} ${style.text} border-transparent hover:border-current`
              }`}
            >
              {cat}
            </button>
          )
        })}

        {/* Sort control */}
        <button
          type="button"
          onClick={cycleSortMode}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-label-md font-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors duration-200"
        >
          <ArrowUpDown size={16} />
          {sortLabel}
        </button>
      </section>

      {/* Results count */}
      <p className="mb-6 text-body-md font-body-md text-secondary">
        Showing {filteredAndSorted.length} of {ACTIONS.length} micro-actions
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {filteredAndSorted.map((action) => {
          const style = CATEGORY_STYLES[action.category]
          const Icon = action.icon
          return (
            <article
              key={action.name}
              onClick={() => setLoggingAction(action)}
              className="bg-surface-container-lowest rounded-lg shadow-ambient p-6 flex flex-col h-full motion-safe:hover:-translate-y-1 transition-transform duration-300 border border-surface-variant/50 cursor-pointer"
            >
              {/* Top: category chip + icon */}
              <div className="mb-4 flex justify-between items-start">
                <span
                  className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-[11px] font-label-md uppercase tracking-wider inline-block`}
                >
                  {action.category}
                </span>
                <Icon size={20} className={`${style.text}`}/>
              </div>

              {/* Title */}
              <h3 className="text-headline-md font-headline-md text-primary mb-2 flex-grow">
                {action.name}
              </h3>

              {/* Description */}
              <p className="text-body-md font-body-md text-outline mb-6">
                {action.description}
              </p>

              {/* Footer: impact + share */}
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-surface-variant">
                <div>
                  <span className="text-label-md font-label-md text-secondary block mb-1 uppercase tracking-wider">
                    Impact
                  </span>
                  <span className={`text-headline-md font-headline-md ${style.text} font-bold`}>
                    {action.impact.toLocaleString()}{' '}
                    <span className="text-body-md font-body-md font-normal text-secondary">
                      {action.impactUnit}
                    </span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label={`Share ${action.name} on WhatsApp`}
                    onClick={(e) => { e.stopPropagation(); handleWhatsApp(action.name); }}
                    className="text-outline hover:text-primary transition-colors p-1"
                  >
                    <WhatsAppIcon size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Share ${action.name} on Instagram`}
                    onClick={(e) => { e.stopPropagation(); handleInstagram(); }}
                    className="text-outline hover:text-primary transition-colors p-1"
                  >
                    <InstagramIcon size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Share ${action.name}`}
                    onClick={(e) => { e.stopPropagation(); handleShare(action.name); }}
                    className="text-outline hover:text-primary transition-colors p-1"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-16 w-full max-w-[560px] mx-auto overflow-hidden rounded-xl bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-8 text-on-surface border border-outline-variant/30">
        <div className="flex items-center justify-between mb-6">
          <span className="bg-primary-fixed/30 text-primary px-3 py-1 text-[11px] font-label-md uppercase tracking-wider rounded-full">
            Community
          </span>
          <Plus size={24} className="text-on-surface-variant" />
        </div>
        <h2 className="text-display-lg font-display-lg mb-8 text-primary">Suggest a Micro-action</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Suggestion submitted!') }}>
          <div>
            <label className="block text-label-md font-label-md uppercase tracking-wider text-on-surface mb-2">
              Your Suggestion
            </label>
            <input 
              required
              className="w-full bg-surface-bright border border-outline-variant focus:border-primary rounded-md px-4 py-3 text-body-md font-body-md outline-none placeholder:text-on-surface-variant/50 transition-colors"
              placeholder="e.g. Use a bamboo toothbrush"
            />
          </div>
          <div>
            <label className="block text-label-md font-label-md uppercase tracking-wider text-on-surface mb-2">
              Estimated Impact
            </label>
            <input 
              required
              className="w-full bg-surface-bright border border-outline-variant focus:border-primary rounded-md px-4 py-3 text-body-md font-body-md outline-none placeholder:text-on-surface-variant/50 transition-colors"
              placeholder="e.g. 0.5 kg CO2e"
            />
          </div>
          <div>
            <label className="block text-label-md font-label-md uppercase tracking-wider text-on-surface mb-2">
              Description
            </label>
            <textarea 
              required
              rows={3}
              className="w-full bg-surface-bright border border-outline-variant focus:border-primary rounded-md px-4 py-3 text-body-md font-body-md outline-none placeholder:text-on-surface-variant/50 transition-colors resize-none"
              placeholder="Briefly explain the benefit..."
            />
          </div>
          <div className="pt-2">
            <p className="text-body-md font-body-md text-on-surface-variant mb-4 text-center">
              By submitting, you agree to our <a href="/terms.pdf" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Terms and Conditions</a>.
            </p>
            <button 
              type="submit"
              className="w-full bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider py-4 rounded-lg hover:bg-primary transition-colors"
            >
              Submit Suggestion
            </button>
          </div>
        </form>
      </div>

      <ActionModal
        isOpen={loggingAction !== null}
        onClose={() => setLoggingAction(null)}
        actionName={loggingAction?.name ?? ''}
        impactValue={loggingAction?.impact ?? 0}
        impactUnit={loggingAction?.impactUnit}
      />
    </main>
  )
}
