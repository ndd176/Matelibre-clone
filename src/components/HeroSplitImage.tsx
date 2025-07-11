'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

export default function HeroSplitImage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.3 })

  const setRefs = (node: HTMLDivElement) => {
    containerRef.current = node
    inViewRef(node)
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
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

  // === STAGE 1: SPLIT CLIP ===
  const sideInset = useTransform(scrollSpring, [0, 0.3], [100, 0])
  const clipPath = useTransform(sideInset, (v) => `inset(0% ${v}% 0% ${v}%)`)
  const defaultClip = `inset(0% 100% 0% 100%)`

  // === STAGE 2: TEXT REVEAL ===
  const textReveal = useTransform(scrollSpring, [0.3, 0.5], [50, 0])
  const textClipPath = useTransform(textReveal, (v) => `inset(${v}% 0% ${v}%)`)
  const defaultTextClip = `inset(50% 0% 50%)`

  // === STAGE 3: OVERLAY FADE ===
  const overlayOpacity = useTransform(scrollSpring, [0.5, 0.7], [0, 0.6])

  // === STAGE 4: TEXT FLOAT ===
  const textY = useTransform(scrollSpring, [0.5, 1], ['15vh', '70vh'])

  return (
    <div ref={setRefs} className="relative w-full h-[300vh]">
      <motion.div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* IMAGE */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: enabled ? clipPath : defaultClip,
            willChange: 'clip-path',
          }}
        >
          <Image
            src="/images/banner-3.webp"
            alt="Hero Split"
            fill
            className="object-cover"
            priority
          />

          {/* OVERLAY */}
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{
              opacity: enabled ? overlayOpacity : 0,
              willChange: 'opacity',
            }}
          />
        </motion.div>

        {/* TEXT */}
        <motion.div className="absolute inset-0 z-30 pointer-events-none flex justify-center">
          <div className="sticky top-[15vh] h-[60vh] w-full flex items-start justify-center">
            <motion.h1
              className="max-w-4xl text-white text-5xl text-center leading-tight"
              style={
                enabled
                  ? {
                      y: textY,
                      clipPath: textClipPath,
                      fontFamily:
                        'var(--font-studio-pro-bold), "Arial Black", sans-serif',
                      fontWeight: 700,
                      willChange: 'transform, clip-path',
                    }
                  : { opacity: 0 }
              }
            >
              The perfect energy
              <br />
              for your day
            </motion.h1>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
