'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const accordionData = [
  {
    title: 'Ingredients',
    content: [
      'Organic yerba mate infusion (carbonated water, organic yerba mate)',
      'Organic cane sugar',
      'Organic lime juice concentrate',
      'Organic lemon juice concentrate',
      'Chlorophyll',
      'Organic mint oil',
    ],
  },
  {
    title: 'Nutritional facts',
    content: ['Calories: 35', 'Sugar: 7g', 'Caffeine: ~70mg', 'Sodium: 0mg'],
  },
  {
    title: 'No bullsh!t',
    content: [
      'No preservatives',
      'No artificial flavors',
      'Non-GMO',
      'Gluten-free',
    ],
  },
]

export default function ProductDetailWithAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? -1 : index))
  }

  return (
<section className="bg-[#e6f3e6] px-6 md:px-20 py-24 flex flex-col md:flex-row gap-16 items-start">
{/* Left Side */}
  <div className="w-full md:w-1/2 font-bold max-w-2xl">
    <div className="flex flex-col gap-0">
      {['mint & lime', 'energy', 'infusion'].map((line, i) => (
        <motion.h1
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          viewport={{ once: true }}
          className="font-bold text-[115px] leading-[1] text-green-800"
        >
          {line}
        </motion.h1>
      ))}
    </div>

{/* Icon Feature List */}
<motion.div
  className="flex justify-between text-xl pt-10 pb-10 gap-4"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.5 }}
  viewport={{ once: true }}
>
  <Feature icon="🌿" label="organic yerba mate" />
  <Feature icon="🔁" label="no crash" />
  <Feature icon="☕" label="equivalent to an espresso" />
</motion.div>

    {/* Add to cart + pricing */}
<motion.div
  className="flex flex-row items-center gap-8 pb-8"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.5 }}
  viewport={{ once: true }}
>
  <button className="bg-green-800 text-white mt-60 text-xl font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform">
    add to cart
  </button>
  <div className="text-green-900 mt-60 text-base leading-snug">
    <p className="text-xl font-semibold">$32.00 / box of 12×330 ml</p>
    <p className="opacity-70">subscribe and save 10%</p>
  </div>
</motion.div>

 

    <div className="space-y-4">
      {accordionData.map((item, index) => {
        const isOpen = index === openIndex
        return (
          <div
            key={index}
            className="border-2 border-green-800 rounded-[32px] overflow-hidden transition-all"
          >
            <button
              className="w-full text-left px-6 py-5 text-green-900 font-bold text-lg flex justify-between items-center"
              onClick={() => toggleIndex(index)}
            >
              {item.title}
              <span className="text-xl">{isOpen ? '−' : '+'}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-5 text-green-800 text-sm"
                >
                  <ul className="list-disc list-inside space-y-1">
                    {item.content.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  </div>

      {/* Right Side */}
      <div className="w-full max-w-[960px] flex flex-col pl-40 mr-[-20px] flex-wrap gap-4 mx-auto ">
        {/* Image Top */}
        <motion.div
          initial={{
        y: 200,
        scale: 0.2,
        borderRadius: '50%',
        backgroundColor: '#14532d', // text-green-800
          }}
          animate={{
        y: 0,
        scale: 1,
        borderRadius: '32px',
        backgroundColor: '#ffffff00', // transparent sau khi mở rộng
          }}
          transition={{
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="w-full mx-auto overflow-hidden relative"
        >
          <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="w-full h-auto"
          >
        <Image
          src="/images/position.jpg"
          alt="mint & lime"
          width={1900}
          height={1900}
          className="w-full h-auto object-cover rounded-[32px]"
        />
          </motion.div>
        </motion.div>


        {/* Form Bottom */}
      <form className="bg-white p-10 rounded-[32px] shadow-md w-full max-w-[960px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-[16px] font-normal">
        <input
          type="text"
          placeholder="Your name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[16px] font-bold"
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-[16px] font-bold"
        />
        <input
          type="tel"
          placeholder="Phone number"
          required
          className="w-full sm:col-span-2 px-4 py-3 border border-gray-300 rounded-md text-[16px] font-bold"
        />
        <textarea
          placeholder="Cover Letter"
          required
          className="w-full sm:col-span-2 px-4 py-3 border border-gray-300 rounded-md text-[16px] font-bold"
          rows={4}
        ></textarea>
        <div className="w-full sm:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <input type="file" className="font-bold text-[16px]" />
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-900 text-white px-8 py-3 rounded-md font-bold text-[16px]"
          >
            Submit Now
          </button>
        </div>
      </form>

      </div>
    </section>
  )
}

function Feature({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-green-800 text-sm min-w-[100px]">
      <div className="text-[50px]">{icon}</div>
      <p className="mt-1 text-center text-[16px] whitespace-nowrap">{label}</p>
    </div>
  )
}
