'use client'

import { useState, useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface FloatingImageProps {
  src: string
  alt: string
  x?: number
  y?: number
  className?: string
  children?: React.ReactNode
  transition?: {
    x: MotionValue
    y: MotionValue
    scale: MotionValue
    rotate: MotionValue
    floatY: MotionValue
    floatScale: MotionValue
    opacity?: MotionValue
  }
}


export default function FloatingImage({
  src,
  alt,
  x = 0,
  y = 0,
  className = '',
  transition,
  children, // ✅ nhận children
}: FloatingImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const width = 600
  const height = 800
  const parallaxSpeed = 0.3
  const scaleRange: [number, number, number] = [1, 1.1, 1.2]
  const borderRadius = 30

  const defaultY = useTransform(scrollYProgress, [0, 1], ['0%', `-${parallaxSpeed * 100}%`])
  const defaultScale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange)

  return (
    <motion.div
      ref={containerRef}
      className={`absolute ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        x: transition?.x ?? useTransform(() => x),
        y: transition?.y ?? useTransform(() => y),
        rotate: transition?.rotate,
        scale: transition?.scale,
        opacity: transition?.opacity ?? 1,
      }}
    >
      <div
        className="relative overflow-hidden shadow-xl"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: `${borderRadius}px`,
        }}
      >
        <motion.div
          style={{
            y: transition?.floatY ?? defaultY,
            scale: transition?.floatScale ?? defaultScale,
          }}
          className="relative w-full h-[130%]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* ✅ Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 flex items-center justify-center
          ${isHovered ? 'opacity-60' : 'opacity-0'}`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  )
}


 
