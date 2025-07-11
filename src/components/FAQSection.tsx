'use client'

import { useState   } from 'react'
import { FaCopy, FaFacebookF, FaPlus, FaMinus } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const email = 'ethanecom@gmail.com'

const faqs = [
  {
    question: 'What positions is Ethan Ecom hiring for?',
    answer: (
      <>
        <p className="mb-2">
          We’re growing fast and always on the lookout for awesome teammates! Currently, we’re hiring for: 
          <strong> IT, Designer, Marketing Support, EMB Designer, Fulfillment, TikTok Seller, QA, QC,</strong> and <strong>Media</strong>.  
        </p>
        <p className="mb-2">
          If you’re passionate, curious, and a little obsessed with embroidery or e-commerce — we want to hear from you!
        </p>
      </>
    ),
  },
  {
    question: 'How can I apply?',
    answer: (
      <>
        <p className="mb-2">
          Easy peasy 🍋 Just head over to our <a href="/careers" className="underline font-bold">Careers page</a>, pick the role that speaks to your soul, hit that "Apply" button, upload your CV — and voilà!
        </p>
        <p className="mb-2">
          We’ll get in touch to schedule an interview if it’s a match. Good luck!
        </p>
      </>
    ),
  },
  {
    question: 'I have no experience. Can I still apply?',
    answer: (
      <>
        <p className="mb-2">
          Absolutely! We all start somewhere. Some roles require more experience than others, but if you’re eager to learn, responsible, and have a good attitude — we’ll be happy to train you.
        </p>
        <p className="mb-2">
          Basic computer skills are a must, and if you’ve got some English up your sleeve, that’s a sweet bonus! 🚀
        </p>
      </>
    ),
  },
]


export default function NewsletterWithFAQ() {
  const [copied, setCopied] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* LEFT: Newsletter box */}
        <div className="relative bg-neutral-100 rounded-[48px] p-10 md:p-14 flex flex-col justify-between">
          {/* Facebook icon */}
          <a
            href="https://www.facebook.com/ethanecom3979"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-6 md:top-8 md:right-8 text-black hover:text-blue-600"
          >
            <FaFacebookF size={20} />
          </a>

          {/* Text */}
          <h3 className="text-xl md:text-3xl font-studio-pro-bold max-w-xl mb-6">
 Got questions or just want to say hi? Don’t hesitate to reach out — we're just a message away! 💬  

          </h3>

          {/* Email row */}
          <div className="flex items-center max-w-xl bg-white border border-black rounded-full px-6 py-3 relative mt-auto">
            <span className="text-xl font-medium text-black">{email}</span>
            <button
              onClick={handleCopy}
              className="ml-auto text-black hover:text-blue-600 transition"
              aria-label="Copy email"
            >
              <FaCopy size={16} />
            </button>

            {/* Copied feedback */}
            {copied && (
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full animate-fade">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: FAQ */}
        <div>
          {/* Title on top of FAQ */}
          <h2 className="text-2xl md:text-3xl font-studio-pro-bold mb-6">
            Frequently asked questions
          </h2>

          <div className="flex flex-col divide-y divide-black/10">
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex
              return (
                <div
                  key={index}
                  className={`border border-black px-6 py-4 transition-all rounded-[40px] my-3`}
                >
                  <button
                    className="flex items-center justify-between w-full text-left font-studio-pro-bold text-lg"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                    <span className="ml-4">
                      {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: 'auto', opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-lg font-bold text-neutral-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Animation style */}
      <style>{`
        @keyframes fade {
          0% { opacity: 0; transform: translateY(0.25rem); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-0.25rem); }
        }
        .animate-fade {
          animation: fade 2s ease-in-out forwards;
        }
      `}</style>
    </section>
  )
}
