 
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

  // STAGE 1: Text fly in và image reveal cùng lúc
  const leftX = useTransform(scrollSpring, [0, 0.3], ['-600px', '0px'])
  const rightX = useTransform(scrollSpring, [0, 0.3], ['600px', '0px'])
  const sideInset = useTransform(scrollSpring, [0, 0.3], [100, 0])
  const clipPathImage = useTransform(sideInset, (v) => `inset(0% ${v}% 0% ${v}%)`)

  // Text color change (đen -> trắng khi nằm trên hình)
  const textColorProgress = useTransform(scrollSpring, [0.1, 0.25], [0, 1])
  
  // Text fade out khi hoàn thành
  const textOpacity = useTransform(scrollSpring, [0.25, 0.35], [1, 0])

  // STAGE 2: Overlay và final text
  const overlayOpacity = useTransform(scrollSpring, [0.3, 0.6], [0, 0.6])
  const textReveal = useTransform(scrollSpring, [0.3, 0.6], [50, 0])
  const textClipPath = useTransform(textReveal, (v) => `inset(${v}% 0% ${v}%)`)

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        inViewRef(el)
      }}
      className="relative h-[300vh]"
    >
      <motion.div className="sticky top-0 h-screen w-full bg-white">
        {/* STAGE 1: Text fly in (đổi màu và fade out) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-2 sm:px-0">
          <motion.h2
            style={{
              x: leftX,
              opacity: textOpacity,
              color: useTransform(textColorProgress, [0, 1], ['#000000', '#ffffff']),
              willChange: 'transform, opacity, color',
            }}
            className="text-[clamp(22px,7vw,60px)] sm:text-[clamp(32px,10vw,100px)] font-studio-pro-bold whitespace-nowrap text-center"
          >
            NĂNG ĐỘNG
          </motion.h2>
          <motion.h2
            style={{
              x: rightX,
              opacity: textOpacity,
              color: useTransform(textColorProgress, [0, 1], ['#000000', '#ffffff']),
              willChange: 'transform, opacity, color',
            }}
            className="text-[clamp(22px,7vw,60px)] sm:text-[clamp(32px,10vw,100px)] font-studio-pro-bold whitespace-nowrap text-center"
          >
            SÁNG TẠO
          </motion.h2>
        </div>

        {/* STAGE 1: Image Reveal (cùng lúc với text) */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            clipPath: enabled ? clipPathImage : 'inset(0% 100% 0% 100%)',
            willChange: 'clip-path',
          }}
        >
          <Image
            src="/images/hop-03.jpg"
            alt="Hero Split"
            fill
            className="object-cover rounded-xl"
            priority
            sizes="(max-width: 640px) 100vw, 80vw"
            style={{ objectPosition: 'center' }}
          />
          <motion.div
            className="absolute inset-0 bg-black pointer-events-none"
            style={{
              opacity: enabled ? overlayOpacity : 0,
              willChange: 'opacity',
            }}
          />
        </motion.div>

        {/* STAGE 2: Final Text (overlay + text reveal) */}
          <div className="absolute inset-0 z-40 pointer-events-none">
            <div className="h-full flex flex-col justify-center">
              <div className="sticky top-1/2 -translate-y-1/2 bottom-[5px] flex justify-center items-center px-2 sm:px-0">
                <motion.h1
                  className="max-w-2xl sm:max-w-4xl text-white text-[clamp(28px,8vw,60px)] sm:text-[clamp(48px,12vw,130px)] md:text-[clamp(32px,8vw,100px)] text-center leading-tight"
                  style={enabled ? {
                    clipPath: textClipPath,
                    fontFamily: 'var(--font-studio-pro-bold), "Arial Black", sans-serif',
                    fontWeight: 700,
                    willChange: 'clip-path',
                  } : { opacity: 0 }}
                >
                  MÔI TRƯỜNG 
                  <br></br>
                  THÂN THIỆN
                </motion.h1>
              </div>
            </div>
          </div>
        </motion.div>
    </div>
  )
}
