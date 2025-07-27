'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { WEBSITE_IMAGES } from '@/lib/fast-images'

const momentsData = [
  {
    src: WEBSITE_IMAGES.moments.table1,
  },
  {
    src: WEBSITE_IMAGES.moments.table2,
  },
  {
    src: WEBSITE_IMAGES.moments.table3,
  },
  {
    src: WEBSITE_IMAGES.moments.table4,
  },
]

export default function SimpleMoments() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Early detection with large rootMargin to preload images
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Preload all images when section is approaching
          momentsData.forEach((moment) => {
            const link = document.createElement('link')
            link.rel = 'preload'
            link.as = 'image'
            link.href = moment.src
            document.head.appendChild(link)
          })
        }
      },
      { 
        rootMargin: '300px', // Load images 300px before section comes into view
        threshold: 0 
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative"
      style={{
        backgroundImage: 'url(https://res.cloudinary.com/dbtvr8qyd/image/upload/v1753417680/moment-bg-02_itxsc3.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Khám phá môi trường làm việc
          </h2>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {momentsData.map((moment, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={moment.src}
                  alt="Môi trường làm việc"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="eager" // All images load immediately now
                  priority={index === 0} // First image still has highest priority
                  quality={90} // Higher quality for faster visible loading
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-lg text-white font-bold mb-8">
            Tham gia cùng chúng tôi để tạo nên những khoảnh khắc đáng nhớ
          </p>
 
        </div>
      </div>
    </section>
  )
}
