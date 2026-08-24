import { useState } from 'react'
import { ChevronDown, Leaf } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

const FAQS: FAQ[] = [
  {
    question: 'What is ReThink?',
    answer:
      'ReThink is a program designed to encourage positive environmental impact through simple, manageable micro-actions. Each month, participants are introduced to a new micro-action that can be completed in just 15 minutes, demonstrating that small steps can lead to significant change.',
  },
  {
    question: 'Is there a cost to participate?',
    answer:
      'Accessing the foundational Micro-Action Library and reading The Story is entirely free. We believe basic sustainability education should be accessible to all. We do offer a premium tier for organizations looking to track aggregate impact metrics, which supports our operational costs.',
  },
  {
    question: 'How much time will I need to commit every month?',
    answer:
      'Our micro-actions are small, manageable tasks designed to take just 15 minutes each month. They fit seamlessly into your routine without causing lifestyle fatigue.',
  },
  {
    question: 'How does one earn Karma points?',
    answer:
      'You earn Karma points each time you log a completed micro-action. It is our way of celebrating your consistency and tracking the collective impact we are making together.',
  },
  {
    question: 'Can I suggest new micro-actions?',
    answer:
      'Absolutely. We rely on the collective intelligence of our community. You can submit ideas, and our research team reviews submissions to ensure they are actionable and measurable before adding them to the public library.',
  },
  {
    question: 'Who can join the ReThink community?',
    answer:
      'Anyone who wants to make a difference can join! Whether you are a student, a professional, or someone simply looking to be more eco-conscious, our micro-actions are designed to be accessible to everyone.',
  },
  {
    question: 'How is the total CO₂e impact calculated?',
    answer:
      'We use established emission factors from reputable environmental organizations to estimate the average savings for each action. While these are estimates, they provide a tangible way to see the value of our collective efforts.',
  },
  {
    question: 'Can my school or company participate as a group?',
    answer:
      'Yes, we encourage group participation! Logging actions collectively helps build community momentum. Contact us for information on how to set up an organizational cohort.',
  },
  {
    question: 'Do I need to verify my actions?',
    answer:
      'We operate on an honor system, but we do require phone and email verification to ensure our overall impact metrics reflect real people and true dedication.',
  },
  {
    question: 'Where do the cleanup events take place?',
    answer:
      'Our volunteer-led cleanup events currently span over 100 locations globally, primarily organized by local community ambassadors. You can start one in your own neighborhood too.',
  },
  {
    question: 'How can I become an ambassador?',
    answer:
      'Ambassadors are our most active members. Once you log 10 actions and demonstrate consistent engagement, you can apply to organize local events and help verify new micro-actions.',
  }
]

export default function Story() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [showAllFaqs, setShowAllFaqs] = useState(false)

  function toggleFaq(index: number) {
    setOpenFaqIndex((prev) => (prev === index ? null : index))
  }

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-section-gap">
      {/* Story Section */}
      <section className="mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-ambient bg-surface-container relative z-10 flex items-center justify-center">
             {/* Using a nature placeholder image instead of a fake founder photo */}
            <img
              className="w-full h-full object-cover"
              alt="Lush green leaves representing sustainability and growth"
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary-fixed-dim opacity-20 rounded-full blur-2xl z-0 pointer-events-none"></div>
        </div>
        
        <div className="md:col-span-6 md:col-start-7 space-y-6 mt-8 md:mt-0">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-primary">
            The Story
          </h1>
          <div className="h-1 w-12 bg-primary rounded"></div>
          
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            In our journey of sustainable living, we met two types of people... those who wanted to be sustainable but didn't know how to start, and those who were hesitant, and worried about the time, energy, and cost involved.
          </p>
          <p className="text-body-md font-body-md text-outline">
            ReThink was designed with both of these groups in mind. It's a program that focuses on micro-actions to create a positive impact on the environment. These micro-actions are small, manageable tasks that take just 15 minutes each month, but when combined, they build a powerful force for good and demonstrate that you don't need to overhaul your entire routine to make a difference.
          </p>
          <p className="text-body-md font-body-md text-outline">
            By joining ReThink, you become part of what could be the largest movement of our time. Together, we can reshape our world and leave a legacy that future generations will remember and celebrate, one micro-action at a time.
          </p>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            In 2021, our founder <strong className="text-primary font-semibold">Nirmal Topiwala</strong> was feeling overwhelmed by the sheer scale of the climate crisis. After participating in a massive beach cleanup that left him exhausted, he wondered: <em>"What if, instead of one massive effort a year, thousands of us took 15 minutes a month to do something small?"</em>
          </p>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            He started texting a few friends a single "micro-action" on the first Sunday of every month. By month three, 50 people were doing it. By month six, they had saved an estimated 2,000 kg of CO₂e simply by making tiny tweaks to their daily routines.
          </p>
          <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
            That texting group became <strong>ReThink</strong> — a platform dedicated to the philosophy of Disciplined Optimism. We believe that acknowledging the severity of the crisis is necessary, but pairing it with manageable, collective action is what actually drives change.
          </p>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-outline-variant opacity-30 my-section-gap" />

      {/* FAQ Section */}
      <section className="mb-section-gap max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Leaf className="mx-auto text-primary-fixed-dim mb-4" size={32} />
          <h2 className="text-headline-lg font-headline-lg text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant">
            Everything you need to know about participating.
          </p>
        </div>

        <div className="space-y-4">
          {(showAllFaqs ? FAQS : FAQS.slice(0, 5)).map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div
                key={index}
                className={`bg-surface-container-lowest rounded-lg shadow-ambient overflow-hidden group border border-outline-variant/10 transition-all duration-300`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left p-6 hover:bg-surface-container-low transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3
                    className={`text-body-lg font-body-lg font-semibold transition-colors duration-200 ${
                      isOpen ? 'text-primary-container' : 'text-primary'
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={24}
                    className={`text-outline transition-transform duration-300 ${
                      isOpen ? 'text-primary rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-body-md font-body-md text-outline border-t border-outline-variant/10">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {!showAllFaqs && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllFaqs(true)}
              className="text-label-md font-label-md text-primary border border-outline-variant rounded-full px-6 py-2 hover:bg-surface-container hover:text-primary-container transition-colors duration-200"
            >
              See more questions ({FAQS.length} total)
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
