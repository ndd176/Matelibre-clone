'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../sections/ProductCard'

const products = [
  {
    title: 'IT',
    description: 'Build and maintain the backbone of our systems — from automation to optimization.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/anh-hiep.png',
    color: 'white',
  },
  {
    title: 'Designer',
    description: 'Craft visual identities and transform bold ideas into standout designs.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-2.webp',
    color: 'milk',
  },
  {
    title: 'EMB Designer',
    description: 'Sketch and digitize embroidery artwork — where every stitch tells a story.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-2.webp',
    color: 'matcha',
  },
  {
    title: 'Seller',
    description: 'Drive growth by managing storefronts, optimizing listings, and closing orders.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-2.webp',
    color: 'dark_green',
  },
  {
    title: 'Media',
    description: 'Capture brand energy through short videos, photos, and creative visuals.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-1.webp',
    color: 'black',
  },
  {
    title: 'Support',
    description: 'Assist sellers, solve problems, and ensure every customer has a great experience.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-1.webp',
    color: 'white',
  },
]

export default function ProductCarouselHover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ✅ Mobile version: scrollable cards with spacing
  if (isMobile) {
    return (
      <section className="bg-white py-16 px-4">
        <div className="flex gap-36 overflow-x-hide">
          {products.map((product, index) => (
            <div key={index} className="shrink-0 min-w-[90%]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  // ✅ Desktop: expand on hover, with correct zIndex stacking
  const maxWidth = 1800
  const expandedWidth = 520
  const collapsedCount = products.length - 1
  const collapsedWidth = hoveredIndex !== null
    ? (maxWidth - expandedWidth) / collapsedCount
    : maxWidth / products.length

return (
  <section className="bg-white py-16 px-8 overflow-hidden">
    <div
      className="flex mx-auto transition-all"
      style={{
        maxWidth: `${maxWidth}px`,
        transform: `translateX(-${(products.length - 1) * 20}px)`, // ✅ cân lại phần dịch
      }}
    >
      {products.map((product, index) => {
        const isHovered = index === hoveredIndex
        const width = isHovered ? expandedWidth : collapsedWidth
        const zIndex = products.length - index

        return (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width,
              x: (products.length - 1 - index) * 40,
            }}
            transition={{ type: 'spring', stiffness: 250, damping: 30 }}
            className="rounded-[32px] overflow-hidden"
            style={{
              flexShrink: 0,
              zIndex,
              position: 'relative',
            }}
          >
            <ProductCard {...product} />
          </motion.div>
        )
      })}
    </div>
  </section>
)

}
