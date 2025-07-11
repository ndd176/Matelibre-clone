'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLeaf, FaBookOpen, FaSeedling } from 'react-icons/fa'

export default function CommitmentSection() {
  const titleLines = [
    'Committed from our raw',
    'material to packaging.',
  ]

  const commitmentList = [
    { icon: <FaLeaf className="text-xl" />, text: 'carbon-free delivery in greater montreal' },
    { icon: <FaBookOpen className="text-xl" />, text: 'fair trade yerba mate' },
    { icon: <FaSeedling className="text-xl" />, text: 'certified organic' },
    { icon: <FaSeedling className="text-xl" />, text: 'hello' },
  ]

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10 bg-white">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 overflow-hidden rounded-[50px]">
        <Image
          src="/images/congty-2.jpg"
          alt="Commitment"
          width={600}
          height={600}
          className="w-full h-auto object-cover rounded-[50px]"
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
              className="text-4xl font-studio-pro-bold text-black leading-snug"
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-base leading-relaxed"
        >
          We’re not perfect, but we’re committed to making an environmental and social difference as best we can.
          Our carbon-neutral delivery is just one way to work towards making a positive impact because it has never been more important.
        </motion.p>

        {/* Commitment List */}
        <ul className="space-y-3">
          {commitmentList.map((item, idx) => (
            <motion.li
              key={idx}
              className="flex items-center gap-3 font-studio-pro text-black"
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
              <span>{item.text}</span>
            </motion.li>
          ))}
        </ul>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-6 px-6 py-3 bg-black text-white rounded-full font-studio-pro-bold hover:bg-neutral-800 transition"
        >
          discover our commitments
        </motion.button>
      </div>
    </section>
  )
}
