'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FloatingImage from '../ui/FloatingImage'
import { WEBSITE_IMAGES } from '@/lib/fast-images'

const momentsData = [
  {
    src: WEBSITE_IMAGES.moments.table1,
    top: 3165,
    leftPercent: 0.1,
   },

  {
    src: WEBSITE_IMAGES.moments.table2,
    top: 4320,
    leftPercent: 0.15,
   },
  {
    src: WEBSITE_IMAGES.moments.table3,
    top: 3700,
    leftPercent: 0.59,
   },
  {
    src: WEBSITE_IMAGES.moments.table4,
    top: 2601,
    leftPercent: 0.65,
   },
    {
    src: WEBSITE_IMAGES.moments.table5,
    top: 4860,
    leftPercent: 0.62,
   },
]


export default function TransitionToCards() {
 
  const containerRef = useRef<HTMLDivElement>(null)
  const [screenHeight, setScreenHeight] = useState(800)
  const [screenWidth, setScreenWidth] = useState(1200)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenHeight(window.innerHeight)
      setScreenWidth(window.innerWidth)
      const handleResize = () => {
        setScreenHeight(window.innerHeight)
        setScreenWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const transforms = momentsData.map((item, index) => {
    const startX = index * 350
    const startY = 350
    const endX = (item.leftPercent ?? 0.5) * screenWidth
    const endY = item.top - screenHeight
    const parallaxSpeed = 0.3

    return {
      x: useTransform(scrollYProgress, [0.3, 0.6], [startX, endX]),
      y: useTransform(scrollYProgress, [0.3, 0.6], [startY, endY]),
      rotate: useTransform(scrollYProgress, [0, 0.3, 0.6], [`${index % 2 ? '-' : ''}${5}deg`, '0deg', '0deg']),
      scale: useTransform(scrollYProgress, [0, 0.3, 0.6], [0.5, 0.7, 1]),
      floatY: useTransform(scrollYProgress, [0.6, 1], ['0%', `-${parallaxSpeed * 100}%`]),
      floatScale: useTransform(scrollYProgress, [0.6, 0.8, 1], [1, 1.05, 1.12]),
      opacity: useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 0.2, 1]),
    }
  })

  const stickyPosition = useTransform(scrollYProgress, [0, 0.6, 0.61], ['sticky', 'sticky', 'relative'])

  return (
    <div className="relative w-full h-[600vh] bg-white hidden 2xl:block" 
    ref={containerRef} 
    style={{
        backgroundImage: 'url(https://res.cloudinary.com/dbtvr8qyd/image/upload/v1753417680/moment-bg-02_itxsc3.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'darken',
            }}
          >
          <div className="absolute inset-0 bg-black/50 z-10"></div> {/* lớp phủ mờ */}

      {/* Sticky stage: giữ khung hình đến khi ảnh đạt vị trí */}
      <motion.div
        style={{ position: stickyPosition }}
        className="top-0 h-screen w-full overflow-hidden z-10"
      >
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 0.2], [-300, 0]),  // từ trên xuống giữa
          opacity: useTransform(scrollYProgress, [0, 0.12], [1, 0]), // biến mất sớm
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <h2 className="text-[100px] sticky-30 font-bold text-white text-center">
          Khám phá môi trường làm việc
        </h2>
      </motion.div>



      </motion.div>
        {/* Ảnh bay từ trái → đúng tọa độ */}
      {momentsData.map((item, index) => (
        <FloatingImage
          key={index}
          src={item.src}
          alt={`Image ${index}`}
          transition={transforms[index]}
          className="z-10"
        >
 
        </FloatingImage>
      ))}

      {/* Phần nối thêm để scroll tiếp cho tới đúng top ảnh */}
      <div className="relative h-[400vh] z-0 pointer-events-none" />
    </div>
  )
}
