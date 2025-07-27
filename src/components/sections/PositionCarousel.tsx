'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'
import MarqueeBackground from '../ui/MarqueeBackground'

// Import từ lib structure
import { Job } from '../../types/api/strapi'
import { strapiApi } from '../../lib/api/strapi'
 import { getImageUrl } from '../../lib/utils/image'

gsap.registerPlugin(ScrollTrigger)

// Interface for ProductCard
interface ProductCardData {
  id: string
  title: string
  description: string
  canImage: string
  bgImage: string
  color: string
}

// Sử dụng transform utility function

function jobToProductCard(job: Job, idx: number): ProductCardData {
  // Debug image processing
  console.log('🖼️ Processing job images:', {
    jobId: job.id,
    avatar_image: job.avatar_image,
    sub_avatar: job.sub_avatar
  })
  const canImageUrl = getImageUrl(job.avatar_image)
  const bgImageUrl = getImageUrl(job.sub_avatar)
  console.log('📸 Generated URLs:', {
    canImage: canImageUrl,
    bgImage: bgImageUrl
  })
  return {
    id: String(job.id),
    title: job.job_title,
    description: job.short_description,
    canImage: canImageUrl || '/images/duydinh-bg-2.png',
    bgImage: bgImageUrl || '/images/anh-hiep.png',
    color: idx % 2 === 0 ? 'black' : 'white',
  }
}

export default function ProductCardList() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [products, setProducts] = useState<ProductCardData[]>([])
  const [loading, setLoading] = useState(true)

  // Load data from API
  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await strapiApi.fetchJobs()
        
        const apiJobs = response.data.map((job: Job, idx: number) => jobToProductCard(job, idx))
        
        setProducts(apiJobs)
      } catch (err) {
        console.error('Error loading jobs:', err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  useEffect(() => {
    if (loading || products.length === 0) return
    
    const wrapper = wrapperRef.current
    const container = scrollRef.current
    if (!wrapper || !container) return

    const totalWidth = container.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth + 900

    let st: ScrollTrigger | undefined;

    if (scrollDistance > 0) {
      const anim = gsap.to(container, {
        x: () => `-${scrollDistance}`,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top+=15 top',
          end: () => `+=${totalWidth}`,
          scrub: true,
          pin: true,
          onEnter: () => {
            // Reset position khi trigger được kích hoạt
            gsap.set(container, { x: 0 });
          }
        },
      })

      st = anim.scrollTrigger;
    }

    // Cleanup function
    return () => {
      if (st) {
        st.kill(); // Xóa ScrollTrigger instance
      }
      // Reset position
      gsap.set(container, { x: 0 });
      ScrollTrigger.refresh();
    }
  }, [loading, products])
  return (
    <>
      {loading ? (
        <section className="relative w-full h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading positions...</p>
          </div>
        </section>
      ) : products.length === 0 ? (
        <section className="relative w-full h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-xl">No positions available at the moment.</p>
            <p className="text-gray-500 mt-2">Please check back later for new opportunities.</p>
          </div>
        </section>
      ) : (
        <section ref={wrapperRef} className="relative w-full h-screen bg-white">
          <div className="flex flex-col w-full h-full">
            
            {/* Nửa trên: Horizontal Slider với drag */}
            <div className="relative h-1/2 w-full flex items-center justify-center mt-16 md:mt-28">
              <div
                ref={scrollRef}
                className="absolute left-[700px] top-1/2 -translate-y-1/2 flex gap-16 md:gap-32 w-max pr-[10vw]"
              >
                <div className="flex flex-col text-[100px] font-bold leading-tight">
                  {'Chọn nghề nghiệp'.split(' ').map((char, i) => (
                    <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </div>
                {products.map((item, i) => (
                  <div key={i} className="shrink-0 w-[85vw] sm:w-[450px] transition-transform hover:scale-[1.02] duration-300">
                    <ProductCard {...item} />
                  </div>
                ))}
              </div>
            </div>

            {/* Nửa dưới: Marquee */}
            <div className="relative h-1/2 w-full overflow-hidden">
               <MarqueeBackground />
            </div>

          </div>
        </section>
      )}
    </>
  )
}
