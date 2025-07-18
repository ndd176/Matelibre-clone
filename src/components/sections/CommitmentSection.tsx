'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLeaf, FaPeopleCarry, FaRecycle, FaHandsHelping } from 'react-icons/fa'

export default function CommitmentSection() {
  const titleLines = [
    'We grow together.',
    'From people to process.',
  ]

  const commitmentList = [
    { icon: <FaLeaf className="text-2xl" />, text: 'Sustainable and low-waste operations' },
    { icon: <FaRecycle className="text-2xl" />, text: 'Eco-conscious packaging & materials' },
    { icon: <FaPeopleCarry className="text-2xl" />, text: 'Collaborative & inclusive work culture' },
    { icon: <FaHandsHelping className="text-2xl" />, text: 'Real support, not just slogans' },
  ]

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 py-16 gap-10 bg-white">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-[40px]">
        <Image
          src="/images/grow-together.jpg"
          alt="Teamwork at Duy Dinh"
          width={600}
          height={600}
          className="w-full h-auto object-cover rounded-[40px]"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2 max-w-xl space-y-6">
        {/* Title lines with upward bounce */}
        <div>
          {titleLines.map((line, idx) => (
            <motion.h2
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: idx * 0.2,
              }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-studio-pro-bold text-black leading-snug"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Description */}
        {/* <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-base md:text-lg leading-relaxed"
        >
          We believe impact starts from within — how we build our team, treat each other, and shape our daily work. 
          Whether it’s choosing eco-packaging or supporting one another, we stay committed to growing the right way.
        </motion.p> */}

        {/* Commitment List */}
        <ul className="space-y-3">
          {commitmentList.map((item, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-3 font-studio-pro text-black md:text-lg"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: 0.6 + idx * 0.2,
              }}
              viewport={{ once: true }}
            >
              {item.icon}
              <span >{item.text}</span>
            </motion.li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 px-6 py-3 bg-black text-white rounded-full font-studio-pro-bold hover:bg-neutral-800 transition text-sm sm:text-base"
        >
          discover our culture
        </motion.button>
      </div>
      <img
  src="/images/Will-Smith-meme-4.png"
  alt="Tree Decoration"

  className="fixed bottom-0 right-0 w-[200px] opacity-10 z-0 pointer-events-none"
/>
    </section>
  )
}
