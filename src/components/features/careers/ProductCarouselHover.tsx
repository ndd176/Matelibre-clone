'use client'

import { useEffect, useState } from 'react'
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
function jobToProductCard(job: Job, index: number): ProductCardData {
  // Không random màu nữa, set trắng đen xen kẽ theo index
  const color = index % 2 === 0 ? 'white' : 'black'
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
    color,
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
        let apiJobs = response.data.map((job: Job, i: number) => jobToProductCard(job, i))
        // Lấy 4 card bất kỳ
        if (apiJobs.length > 3) {
          apiJobs = apiJobs.sort(() => 0.5 - Math.random()).slice(0, 3)
        }
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

  // ✅ Desktop: chỉ hiển thị 3 card trên 1 hàng, giữ kích thước mặc định, không scale khi hover
  const visibleProducts = products.slice(0, 3)
  return (
    <section className="bg-white py-16 px-8 overflow-hidden">
      <div
        className="flex mx-auto gap-8 justify-center items-stretch"
        style={{  overflowX: products.length > 3 ? 'auto' : 'visible' }}
      >
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-[32px] overflow-hidden bg-white shadow-md cursor-pointer relative"
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  )

}
