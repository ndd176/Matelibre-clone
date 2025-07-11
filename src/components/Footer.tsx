'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation'
import AnimatedEnvelope from './AnimatedEnvelope';

export default function Footer() {
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <footer className="max-w-screen-2xl mx-auto px-4 bg-white pb-5 pl-6 pr-6 md:pl-12 text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-xl font-studio-pro">
        {/* Column 1 */}
        <div className="space-y-4 text-3xl sm:text-4xl md:text-5xl font-studio-pro-bold leading-tight">
          <div>about us</div>
          <div>
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition"
            >
              <span className={`${exploreOpen ? 'text-black' : 'text-gray-500'}`}>
                careers
              </span>
              <span
                className="text-lg transition-transform"
                style={{ transform: `rotate(${exploreOpen ? 180 : 0}deg)` }}
              >
                ▾
              </span>
            </button>

            {exploreOpen && (
              <ul className="mt-4 space-y-1 text-base font-studio-pro-bold text-black animate-fade-in">
                <li><Link href="#">yerba mate</Link></li>
                <li><Link href="#">our story</Link></li>
                <li><Link href="#">fair trade</Link></li>
                <li><Link href="#">faq</Link></li>
              </ul>
            )}
          </div>
          <div>community</div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4 ml-2 md:ml-8">
          <ul className="space-y-1 font-studio-pro-bold text-base md:text-lg">
            <li><Link href="#">wholesale</Link></li>
            <li><Link href="#">faq</Link></li>
            <li><Link href="#">contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-4 ml-2 md:ml-8">
          <ul className="space-y-1 font-studio-pro-bold text-base md:text-lg">
            <li><Link href="#">privacy policy</Link></li>
            <li><Link href="#">terms & conditions</Link></li>
            <li><Link href="#">cookie preferences</Link></li>
          </ul>
        </div>
      </div>
      {/* Ethanecom full-width section */}
 

      {/* DESKTOP view */}
      <section className="w-full min-h-[45vh] select-none   items-end hidden md:flex">
        <div className="ml-[-35px]">
          <AnimatedWord word="ethanecom" />
        </div>
      </section> 
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
// Scale và position icon theo scroll
const scale = useTransform(scrollYProgress, [0.2, 0.7], [1, 4])
const y = useTransform(scrollYProgress, [0.2, 0.7], [0, -150])
const x = useTransform(scrollYProgress, [0.2, 0.7], [0, -150])
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


  const yGroup1 = useTransform(scrollYProgress, [0, 0.25], [-120, 0])
  const yGroup2 = useTransform(scrollYProgress, [0, 0.25], [-80, 0])

  return (
    <div
      ref={ref}
      className="relative w-full text-[15vw] leading-none font-bold text-black tracking-tight flex px-4"
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
            style={{ y }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="inline-block flex-1 text-center"
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
    className="absolute top-4 right-4 md:top-6 md:right-6 z-50"
  >
    <motion.a
      href="/contact"
      className="group relative block"
       
    >
      <div className="mr-[-120px] mt-[-10px] text-[100px] hover:scale-110 transition-transform">
        ✉️
      </div>
    </motion.a>
  </motion.div>
)}
    </div>
  )
}




