'use client'

import { useState   } from 'react'
import { FaCopy, FaFacebookF, FaPlus, FaMinus } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const email = 'ethanecom@gmail.com'

const faqs = [
  {
    question: 'What is Yerba Mate?',
    answer: (
      <>
        <p className="mb-2">
          Ilex paraguariensis, or yerba maté, is a tree native to South America. Its leaves are dried and infused for a naturally caffeinated drink.
        </p>
        <p className="mb-2">
          Mate Libre uses these same leaves to offer a refreshing, floral, slightly sweet, and energizing beverage. Learn more about{' '}
          <a href="#" className="underline font-semibold">
            what is Yerba Mate
          </a>
        </p>
      </>
    ),
  },
  {
    question: 'What are the benefits of Yerba Mate?',
    answer: (
      <p>
        Yerba Mate contains antioxidants, vitamins, and caffeine, which may help improve energy, focus, and digestion.
      </p>
    ),
  },
  {
    question: 'Is it safe to drink Yerba Mate everyday?',
    answer: (
      <p>
        When consumed in moderation, Yerba Mate is generally considered safe for daily use. As with all caffeinated beverages, balance is key.
      </p>
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
          <h3 className="text-xl md:text-2xl font-studio-pro-bold max-w-xl mb-6">
            Subscribe to our newsletter and receive 10$ off your first subscription order.
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
                        <div className="mt-4 text-sm text-neutral-700 leading-relaxed">
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
