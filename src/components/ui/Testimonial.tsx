
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function FloatingCards() {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })

  // Chỉ cần 5 transforms cho 5 cards
  const transforms = Array.from({ length: 5 }, (_, i) => ({
    y: useTransform(scrollXProgress, [0, 1], ['0%', `${-40 - i * 15}px`]),
    rotate: useTransform(scrollXProgress, [0, 1], ['0deg', `${i % 2 === 0 ? '-' : ''}${3 + i}deg`]),
    scale: useTransform(scrollXProgress, [0, 1], [1, 1 + i * 0.01 + 0.03]),
  }))

  return (
    <section className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-20 py-40 relative">
      <div
        ref={containerRef}
        className="flex gap-20 w-max relative h-[500px]"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {transforms.map((t, index) => (
          <motion.div
            key={index}
            style={{
              y: t.y,
              rotate: t.rotate,
              scale: t.scale,
            }}
            className="w-[350px] h-[500px] shrink-0 rounded-[40px] overflow-hidden relative scrollSnap-align-start shadow-xl"
          >
            <Image
              src={`/images/banner-${(index % 3) + 1}.webp`}
              alt={`Card ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
