import { useState, useEffect, useRef, type FormEvent } from 'react'
import { Eye, Plus, Heart, Check, Cloud, Globe, Leaf, MapPin, User, Users, Info } from 'lucide-react'
import rethinkLogo from '../assets/rethink-logo.svg'
import logo from '../assets/logo-color.svg'
import { useImpact } from '../contexts/ImpactContext'
import ActionModal from '../components/ActionModal'

const MONTHLY_ACTION = {
  eyebrow: "This Month's Micro-Action",
  title: 'Pick Up Just One Plastic Bottle',
  baseImpact: 0.05, // 50g CO2e = 0.05 kg CO2e per action
}

function useCountUp(end: number, durationMs = 2000) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(end)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated, end])

  useEffect(() => {
    if (!hasAnimated) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    let startTime: number
    let animationFrameId: number

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // easeOutExpo
      const easeProgress =
        progress === durationMs
          ? 1
          : 1 - Math.pow(2, -10 * (progress / durationMs))

      const current = Math.min(Math.round(end * easeProgress), end)
      setCount(current)

      if (progress < durationMs) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [end, durationMs, hasAnimated])

  return { count, ref }
}

function CountUp({ end }: { end: number }) {
  const { count, ref } = useCountUp(end)
  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Home() {
  const [count, setCount] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { metrics } = useImpact()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-grow flex-col items-center justify-center px-4 pb-section-gap pt-12 md:px-8">
      {/* --- IMPACT SECTION (Merged from Impact.tsx) --- */}
      <header className="w-full flex flex-col items-center text-center mb-16 bg-surface-container-lowest py-12 rounded-xl shadow-ambient border border-outline-variant/30 relative">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-4 py-4 md:px-8">
          <img
            alt="ReThink Logo"
            className="h-24 md:h-32 object-contain mr-1"
            src={rethinkLogo}
          />
          <img
            alt="ReThink Logo"
            className="h-24 md:h-32 object-contain"
            src={logo}
          />
        </div>
        <p className="mb-8 -mt-3 text-4xl font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          An initiative of Re
        </p>
        <h1 className="text-headline-lg-mobile md:text-display-lg font-display-lg text-primary mb-4">
          Our Collective Impact
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Make a macro impact to save the planet through micro-actions - sustainability can be simple and free.
        </p>
      </header>

      {/* Bento Grid Metrics */}
      <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Locations Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between shadow-ambient border border-outline-variant/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <MapPin size={64} className="text-primary" />
          </div>
          <div>
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-2">
              Global Reach
            </h3>
            <p className="text-display-lg font-display-lg text-accent-teal">
              <CountUp end={metrics.locations} />
            </p>
          </div>
          <div className="mt-8 flex items-end justify-between relative z-10">
            <p className="text-headline-md font-headline-md text-primary">
              Locations
            </p>
            <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
              <Globe className="text-accent-teal" size={24} />
            </div>
          </div>
        </div>

        {/* Warriors Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between shadow-ambient border border-outline-variant/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users size={64} className="text-primary" />
          </div>
          <div>
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-2">
              Community
            </h3>
            <p className="text-display-lg font-display-lg text-accent-gold">
              <CountUp end={metrics.warriors} />
            </p>
          </div>
          <div className="mt-8 flex items-end justify-between relative z-10">
            <p className="text-headline-md font-headline-md text-primary">
              Sustainability
              <br />
              Warriors
            </p>
            <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
              <User className="text-accent-gold" size={24} />
            </div>
          </div>
        </div>

        {/* CO2e Card */}
        <div className="rounded-xl p-8 flex flex-col justify-between shadow-ambient border border-outline-variant/30 relative overflow-hidden bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Leaf size={64} className="text-primary" />
          </div>
          <div>
            <h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-2">
              Total Carbon Reduction
            </h3>
            <p className="text-display-lg font-display-lg text-accent-orange">
              <CountUp end={metrics.co2e} />
            </p>
          </div>
          <div className="mt-8 flex items-end justify-between relative z-10">
            <p className="text-headline-md font-headline-md text-primary">
              Kgs CO2e
              <br />
              Saved
            </p>
            <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center">
              <Cloud className="text-accent-orange" size={24} />
            </div>
          </div>
        </div>
      </section>

      {/* Measurement Note */}
      <section className="w-full max-w-3xl text-center mb-24">
        <div className="inline-flex items-center gap-2 mb-4">
          <Info size={20} className="text-outline" />
          <span className="text-label-md font-label-md text-outline uppercase tracking-wider">
            Methodology Note
          </span>
        </div>
        <p className="text-body-md font-body-md text-on-surface-variant">
          CO2e is a standard unit for measuring carbon footprints. The impact of
          micro-actions is{' '}
          <em className="text-outline font-semibold">
            calculated based on certain assumptions
          </em>
          . Every action counts towards a larger global movement.
        </p>
      </section>

      <div className="mb-16 h-px w-full max-w-4xl bg-surface-variant opacity-50" />

      {/* --- ORIGINAL HOME SECTION --- */}
      <section className="grid w-full grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        {/* Left: value proposition */}
        <div className="space-y-4 pr-0 lg:col-span-6 lg:pr-12">
          <span className="text-label-md font-label-md inline-block rounded-sm bg-primary-fixed/20 px-3 py-1 uppercase tracking-wider text-primary">
            Disciplined Optimism
          </span>
          <h2 className="text-display-lg font-display-lg leading-tight text-primary">
            Sustainability doesn't have to be an overhaul.
          </h2>
          <p className="text-body-lg font-body-lg max-w-lg text-on-surface-variant">
            Small, deliberate actions compound over time. Join a community dedicated to
            structured, measurable environmental impact without the overwhelm.
          </p>
        </div>

        {/* Right: interactive micro-action card */}
        <div className="relative mt-12 lg:col-span-6 lg:mt-0">
          <div
            className="absolute -inset-4 z-0 rounded-full bg-primary-fixed/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="shadow-ambient relative z-10 mx-auto w-full max-w-md rounded-lg border border-surface-variant bg-surface-container-lowest p-8 md:p-10">
            <div className="mb-8 text-center">
              <span className="text-label-md font-label-md mb-2 block uppercase tracking-wide text-on-surface-variant">
                {MONTHLY_ACTION.eyebrow}
              </span>
              <h3 className="text-headline-md font-headline-md text-primary">
                {MONTHLY_ACTION.title}
              </h3>
            </div>

            {/* 3-step guide: Spot -> Log -> Feel Good */}
            <div className="relative mb-10 flex items-start justify-between">
              <div
                className="absolute left-10 right-10 top-6 -z-10 h-px bg-outline-variant"
                aria-hidden="true"
              />

              <div className="flex w-1/3 flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant bg-white text-primary shadow-sm">
                  <Eye size={22} />
                </div>
                <span className="text-label-md font-label-md text-center text-on-surface-variant">
                  Spot
                </span>
              </div>

              <div className="flex w-1/3 flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container shadow-sm">
                  <Plus size={22} />
                </div>
                <span className="text-label-md font-label-md text-center font-bold text-primary">
                  Log
                </span>
              </div>

              <div className="flex w-1/3 flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-outline-variant bg-white text-primary shadow-sm">
                  <Heart size={20} fill="currentColor" />
                </div>
                <span className="text-label-md font-label-md text-center text-on-surface-variant">
                  Feel Good
                </span>
              </div>
            </div>

            {/* Log form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="bottle-count"
                  className="text-label-md font-label-md block uppercase text-on-surface-variant"
                >
                  How many bottles did you pick up today?
                </label>
                <input
                  id="bottle-count"
                  name="bottle-count"
                  type="number"
                  min={1}
                  value={count}
                  onChange={(event) => setCount(Number(event.target.value))}
                  className="text-body-lg font-body-lg w-full rounded-sm border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="text-label-md font-label-md flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container py-4 font-semibold text-on-primary transition-all duration-200 hover:opacity-80"
              >
                <Check size={18} />
                Log My Action
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-on-surface-variant opacity-70">
              Join {metrics.warriors.toLocaleString()} Sustainability Warriors who've already taken action.
            </p>
          </div>
        </div>
      </section>

      <ActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        actionName={MONTHLY_ACTION.title}
        impactValue={MONTHLY_ACTION.baseImpact}
        initialQuantity={count}
      />
    </main>
  )
}
