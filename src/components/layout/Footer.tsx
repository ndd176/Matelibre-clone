'use client';

import { useEffect, useRef, useState } from 'react';
 import { motion, useScroll, useTransform } from 'framer-motion';
 
export default function Footer() {
  // const [exploreOpen, setExploreOpen] = useState(false);

  return (
<footer className="max-w-screen-2xl mx-auto px-4 bg-white py-20 text-black">
{/* Top Text */}


      {/* Animated Logo */}
      <section className="w-full select-none items-end flex justify-center ">
        <div className="ml-0 md:ml-[-35px] w-full">
          <AnimatedWord word="ethanecom" />
        </div>
      </section>
      {/* Extra scroll space for mobile only */}
      <div className="block md:hidden w-full" style={{ height: 120 }} />
    {/* <SplineRobot/>
          <h1>3D Demo with Three.js</h1>
      <BasicScene /> */}
    </footer>
    
  );
}





function AnimatedWord({ word }: { word: string }) {
  const [showIcon, setShowIcon] = useState(false)
  const hasShown = useRef(false)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Responsive: chỉ đổi style khi mobile, desktop giữ nguyên
  const [isMobile, setIsMobile] = useState(false)
            const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const yGroup1 = useTransform(scrollYProgress, [0, 0.25], [isMobile ? -40 : -120, 0])
  const yGroup2 = useTransform(scrollYProgress, [0, 0.25], [isMobile ? -25 : -80, 0])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.2 && !hasShown.current) {
        hasShown.current = true
        requestAnimationFrame(() => {
          setTimeout(() => setShowIcon(true), 1000)
        })
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Style động chỉ khi mobile, desktop giữ nguyên
  const dynamicStyle = isMobile
    ? {
        fontSize: '12vw',
        lineHeight: 1,
        fontWeight: 700,
        letterSpacing: '-0.04em',
        color: '#111',
        textAlign: 'center' as const,
        minHeight: 60,
      }
    : undefined

  return (
    <div
      ref={ref}
      className={
        'relative w-full flex px-2 md:px-4 justify-center items-end text-[15vw] leading-none font-bold text-black tracking-tight' +
        (isMobile ? '' : ' text-[15vw]')
      }
      style={dynamicStyle}
    >
      {word.split('').map((char, index) => {
        let y
        if ('tno'.includes(char)) {
          y = yGroup1
        } else if ('hem'.includes(char)) {
          y = yGroup2
        } else {
          y = useTransform(scrollYProgress, () => 0)
        }
        return (
          <motion.span
            key={index}
            style={{ y, display: 'inline-block', minWidth: isMobile ? 18 : 32 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="text-center"
          >
            {char}
          </motion.span>
        )
      })}

      {/* Icon xuất hiện 1 lần duy nhất */}
      {showIcon && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          className="absolute right-2 top-2 md:top-6 md:right-6 z-50"
        >
          <motion.a
            href="/contact"
            className="group relative block"
          >
            <div className="text-[40px] md:text-[100px] hover:scale-110 transition-transform mr-0 md:mr-[-120px] mt-[-10px]">
              ✉️
            </div>
          </motion.a>
        </motion.div>
      )}
    </div>
  )
}




