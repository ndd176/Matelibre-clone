'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../../sections/ProductCard'

// Import từ lib
import { Job } from '../../../types/api/strapi'
import { strapiApi } from '../../../lib/api/strapi'
import { getImageUrl } from '../../../lib/utils/image'

// Interface cho ProductCard
interface ProductCardData {
  id: string
  title: string
  description: string
  canImage: string
  bgImage: string
  color: string
}

// Function to convert Job to ProductCard format với proper image URLs
function jobToProductCard(job: Job): ProductCardData {
  const colors = ['white', 'milk', 'matcha', 'dark_green', 'black']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  // Debug image processing
  console.log('🖼️ Processing carousel job images:', {
    jobId: job.id,
    avatar_image: job.avatar_image,
    sub_avatar: job.sub_avatar
  })
  
  const canImageUrl = getImageUrl(job.avatar_image)
  const bgImageUrl = getImageUrl(job.sub_avatar)
  
  console.log('📸 Generated carousel URLs:', {
    canImage: canImageUrl,
    bgImage: bgImageUrl
  })

  return {
    id: job.id,
    title: job.job_title,
    description: job.short_description,
    canImage: canImageUrl || '/images/duydinh-bg-2.png',
    bgImage: bgImageUrl || '/images/anh-hiep.png',
    color: randomColor,
  }
}

export default function ProductCarouselHover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [products, setProducts] = useState<ProductCardData[]>([])
  const [loading, setLoading] = useState(true)

  // Load data from API
  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await strapiApi.fetchJobs()
        console.log('🔍 API Response for carousel:', response.data) // Debug log
        const apiJobs = response.data.map(jobToProductCard) // Sử dụng local function
        console.log('🎯 Processed carousel jobs:', apiJobs) // Debug log
        setProducts(apiJobs)
      } catch (err) {
        console.error('Error loading jobs for carousel:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-16 px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading related positions...</p>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="bg-white py-16 px-8">
        <div className="text-center">
          <p className="text-gray-600">No related positions available.</p>
        </div>
      </section>
    )
  }

  // ✅ Mobile version: scrollable cards with spacing
  if (isMobile) {
    return (
      <section className="bg-white py-16 px-4">
        <div className="flex gap-36 overflow-x-hide">
          {products.map((product, index) => (
            <div key={product.id} className="shrink-0 min-w-[90%]">
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
            key={product.id}
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
