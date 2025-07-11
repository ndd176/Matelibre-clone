'use client'

import Image from 'next/image'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApplyNowWithPopup from './CareersApplyPopup'

const accordionData = [
  {
    title: 'What you’ll be doing',
    content: [
      'Designing embroidery mockups and product visuals for e-commerce listings',
      'Creating branding materials and social media assets for campaigns',
      'Collaborating with marketing and production teams to ensure brand consistency',
      'Optimizing design workflows for scalable product customization',
    ],
  },
  {
    title: 'What we’re looking for',
    content: [
      'Proficiency in Adobe Illustrator, Photoshop or equivalent design tools',
      'Experience in embroidery or print-ready artwork is a big plus',
      'Creative thinking, attention to detail, and an eye for clean aesthetics',
      'Basic knowledge of layout for online stores (Shopify, Etsy, etc.)',
    ],
  },
  {
    title: 'Perks & vibes',
    content: [
      'Flexible schedule and hybrid work options',
      'Friendly, fast-paced creative team environment',
      'Room to grow in a scaling DTC brand',
      'Employee discounts on custom apparel & patches',
    ],
  },
]

function AccordionItem({ title, content, isOpen, onClick }: any) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className="border-2 border-green-800 rounded-[24px] overflow-hidden transition-all">
      <button
        className="w-full text-left px-6 py-4 text-green-900 font-bold text-lg flex justify-between items-center"
        onClick={onClick}
      >
        {title}
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div ref={ref} className="px-8 pb-5 pt-2 text-green-800 text-sm">
              <ul className="list-disc list-inside space-y-1">
                {content.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetailWithAccordion() {
  const [openIndex, setOpenIndex] = useState(-1)

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? -1 : index))
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenIndex(0)
    }, 1100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="bg-[#e6f3e6] px-4 md:px-20 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-16 items-start">
      {/* LEFT: Content */}
      <div className="w-full md:w-1/2 font-bold max-w-2xl mx-auto">
        <div className="flex flex-col gap-0">
          {['creative', 'design', 'role'].map((line, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="font-bold text-[48px] sm:text-[64px] md:text-[96px] lg:text-[110px] leading-[1] text-green-800"
            >
              {line}
            </motion.h1>
          ))}
        </div>

        <motion.div
          className="flex justify-between text-sm sm:text-base pt-8 pb-10 gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Feature icon="🎨" label="Creative freedom" />
          <Feature icon="🧵" label="Embroidery design" />
          <Feature icon="🚀" label="Fast-paced team" />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <ApplyNowWithPopup />

          <div className="text-green-900 text-base leading-snug">
            <p className="text-lg sm:text-xl font-semibold">Full-time or freelance</p>
            <p className="opacity-70 text-sm">Based in Vietnam or remote</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                title={item.title}
                content={item.content}
                isOpen={openIndex === index}
                onClick={() => toggleIndex(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Image */}
      <div className="w-full md:w-1/2 max-w-4xl flex flex-col gap-6 mx-auto">
        <motion.div
          initial={{ y: 200, scale: 0.2, borderRadius: '50%', backgroundColor: '#14532d' }}
          animate={{ y: 0, scale: 1, borderRadius: '32px', backgroundColor: 'transparent' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
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
              alt="designer position"
              width={1900}
              height={1900}
              className="w-full h-auto object-cover rounded-[32px]"
            />
          </motion.div>
        </motion.div>
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
