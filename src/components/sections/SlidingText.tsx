 
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function HeroSplitScrollEffect() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scrollSpring = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.4,
  })

  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (inView) setEnabled(true)
  }, [inView])

  // STAGE 1: Text fly in
  const leftX = useTransform(scrollSpring, [0, 0.2], ['-600px', '0px'])
  const rightX = useTransform(scrollSpring, [0, 0.2], ['600px', '0px'])

  // STAGE 2: Clip text inward
  const clipInset = useTransform(scrollSpring, [0.2, 0.4], [0, 100])
  const clipPathText = useTransform(clipInset, (v) => `inset(0% ${v}% 0% ${v}%)`)

  // STAGE 3: Image reveal
  // const sideInset = useTransform(scrollSpring, [0.4, 0.6], [100, 0])
  const sideInset = useTransform(scrollSpring, [0.25, 0.45], [100, 0])

  const clipPathImage = useTransform(sideInset, (v) => `inset(0% ${v}% 0% ${v}%)`)

  // STAGE 4: Overlay
  // const overlayOpacity = useTransform(scrollSpring, [0.6, 0.7], [0, 0.6])
const overlayOpacity = useTransform(scrollSpring, [0.6, 0.75], [0, 0.6])

  // STAGE 5: Final text
  // const textReveal = useTransform(scrollSpring, [0.6, 0.8], [50, 0])
  const textReveal = useTransform(scrollSpring, [0.45, 0.6], [50, 0])

  const textClipPath = useTransform(textReveal, (v) => `inset(${v}% 0% ${v}%)`)
  // const textY = useTransform(scrollSpring, [0.6, 1], ['15vh', '70vh'])
const textY = useTransform(scrollSpring, [0.6, 1], ['15vh', '70vh'])

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        inViewRef(el)
      }}
      className="relative h-[300vh]"
    >
      <motion.div className="sticky top-0 h-screen w-full   bg-white">
        {/* STAGE 1+2: Text with clip */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
          <motion.h2
            style={{
              x: leftX,
              clipPath: clipPathText,
              willChange: 'transform, clip-path',
            }}
            className="text-[clamp(32px,10vw,100px)] text-black font-studio-pro-bold whitespace-nowrap"
            >
             bold minds
            </motion.h2>
          <motion.h2
            style={{
              x: rightX,
              clipPath: clipPathText,
              willChange: 'transform, clip-path',
            }}
            className="text-[clamp(32px,10vw,100px)] text-black font-studio-pro-bold whitespace-nowrap"
          >
          bright futures
          </motion.h2>
        </div>

        {/* STAGE 3: Image Reveal */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: enabled ? clipPathImage : 'inset(0% 100% 0% 100%)',
            willChange: 'clip-path',
          }}
        >
          <Image
            src="/images/congty.jpg"
            alt="Hero Split"
            fill
            className="object-cover rounded-xl"
            priority
          />
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{
              opacity: enabled ? overlayOpacity : 0,
              willChange: 'opacity',
            }}
          />
        </motion.div>

        {/* STAGE 4: Final Text */}
        {/* NEW: Floating Text Sticky Relative to Page */}
        {/* STAGE 4: Final Text (Sticky within image bounds only) */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          <div className="h-full flex flex-col justify-center">
            <div className="sticky top-1/2 -translate-y-1/2 bottom-[5px] flex justify-center items-center">
              <motion.h1
                className="max-w-4xl text-white text-[clamp(32px,8vw,100px)] text-center leading-tight"
                style={enabled ? {
                  clipPath: textClipPath,
                  fontFamily: 'var(--font-studio-pro-bold), "Arial Black", sans-serif',
                  fontWeight: 700,
                  willChange: 'clip-path',
                } : { opacity: 0 }}
              >
                coming to
                <br />
                join with us
              </motion.h1>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
