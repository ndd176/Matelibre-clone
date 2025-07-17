'use client';

import { useEffect, useRef, useState } from 'react';
 import { motion, useScroll, useTransform } from 'framer-motion';

export default function Footer() {
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
<footer className="max-w-screen-2xl mx-auto px-4 bg-white py-20 text-black">
{/* Top Text */}
<motion.div
  initial={{ opacity: 0, y: -40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-center text-[32px] md:text-[48px] font-semibold mb-10"
>
  COME TO JOIN
</motion.div>

{/* Image + Map */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
    {/* Left: Small Image (1/3) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="w-full max-w-xs mx-auto px-4 col-span-1 flex justify-center"
    >
      <img
        src="/images/Will-Smith-meme-4.png"
        alt="Join Image"
        className="w-[220px] rounded-2xl object-cover"
      />
    </motion.div>

    {/* Right: Large Image with Map overlay (2/3) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="relative col-span-2 flex justify-center items-center w-full h-[350px]"
    >
      {/* Large background image */}
      <img
        src="/images/tree-background-1.jpg"
        alt="Large Visual"
        className="w-full h-full object-cover rounded-2xl"
      />

      {/* Map overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-4 left-4 w-[150px] h-[150px] rounded-xl overflow-hidden border border-black shadow-lg bg-white"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.217393698736!2d107.1718264!3d11.0282733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174f1b31482ccdd%3A0xd88f760c662ca310!2sEthan%20Ecom!5e0!3m2!1sen!2s!4v1689580000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </motion.div>
</div>

{/* Bottom Text */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.5 }}
  viewport={{ once: true }}
  className="text-center text-[28px] md:text-[36px] font-medium mt-12 mb-8"
>
  WITH
</motion.div>

      {/* Animated Logo */}
      <section className="w-full select-none items-end hidden md:flex">
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




