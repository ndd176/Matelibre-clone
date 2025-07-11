'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../sections/ProductCard' // dùng lại card cũ

const products = [
  {
    title: 'watermelon',
    description: 'Sugar-free with real watermelon flavor.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-1.webp',
    color: 'green',
  },
    {
    title: 'watermelon',
    description: 'Sugar-free with real watermelon flavor.',
    canImage: '/images/product-1.webp',
    bgImage: '/images/subproduct-1.webp',
    color: 'green',
  },
    {
    title: 'watermelon',
    description: 'Sugar-free with real watermelon flavor.',
    canImage: '/images/product-1.webp',
    bgImage: '/images/subproduct-1.webp',
    color: 'green',
  },
    {
    title: 'watermelon',
    description: 'Sugar-free with real watermelon flavor.',
    canImage: '/images/product-1.webp',
    bgImage: '/images/subproduct-1.webp',
    color: 'green',
  },
    {
    title: 'watermelon',
    description: 'Sugar-free with real watermelon flavor.',
    canImage: '/images/product-1.webp',
    bgImage: '/images/subproduct-1.webp',
    color: 'green',
  },
]
export default function ProductCarouselHover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxWidth = 1600
  const expandedWidth = 500
  const collapsedCount = products.length - 1
  const collapsedWidth = hoveredIndex !== null
    ? (maxWidth - expandedWidth) / collapsedCount
    : maxWidth / products.length

  return (
    <div className="overflow-hidden py-16 px-8 bg-white">
    <div
      className="flex mx-auto transition-all"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      {products.map((product, index) => {
        const isHovered = index === hoveredIndex
        const width = isHovered ? expandedWidth : collapsedWidth

        // Đảo zIndex: thẻ bên phải sẽ có zIndex cao hơn
        const zIndex = products.length - index

        return (
        <motion.div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          animate={{ width }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="rounded-[32px] overflow-hidden"
          style={{
            flexShrink: 0,
            zIndex: isHovered ? 100 : zIndex, // thẻ đang hover luôn cao nhất
            position: 'relative',
          }}
        >
          <ProductCard {...product} />
        </motion.div>
        )
      })}
    </div>
    </div>
  )
}
