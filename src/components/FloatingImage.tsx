'use client'

import { useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface FloatingImageProps {
  src: string
  alt: string
  x?: number
  y?: number
  className?: string
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
}: FloatingImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Cấu hình cố định bên trong
  const width = 600
  const height = 800
  const parallaxSpeed = 0.3
  const scaleRange: [number, number, number] = [1, 1.1, 1.2]
  const borderRadius = 30

  // Parallax transforms nếu không có transition truyền vào
  const defaultY = useTransform(scrollYProgress, [0, 1], ['0%', `-${parallaxSpeed * 100}%`])
  const defaultScale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange)

  return (
    <motion.div
      ref={containerRef}
      className={`absolute ${className}`}
      style={{
        x: transition?.x ?? useTransform(() => x),
        y: transition?.y ?? useTransform(() => y),
        rotate: transition?.rotate,
        scale: transition?.scale,
        opacity: transition?.opacity ?? 1, // ✅ THÊM opacity ở đây

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
      </div>
    </motion.div>
  )
}

export function FloatingImageGallery() {
  return (
    <section className="relative w-full h-[200vh] bg-gray-100 overflow-hidden">
      <FloatingImage
        src="/images/banner-1.webp"
        alt="Image 1"
        x={100}
        y={200}
      />
      <FloatingImage
        src="/images/banner-2.webp"
        alt="Image 2"
        x={700}
        y={800}
      />
      <FloatingImage
        src="/images/banner-3.webp"
        alt="Image 3"
        x={300}
        y={1200}
      />
    </section>
  )
}