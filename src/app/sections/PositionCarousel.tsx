'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'
import MarqueeBackground from '../../components/MarqueeBackground'
import MarqueeTailwind from '@/components/MarqueeTailwind'

gsap.registerPlugin(ScrollTrigger)

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


export default function ProductCardList() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = scrollRef.current
    if (!wrapper || !container) return

    const totalWidth = container.scrollWidth
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth

    gsap.to(container, {
      x: () => `-${scrollDistance}`,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top+=20 top',
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
       },
    })
  }, [])

  return (
    <>
      {/* <section ref={wrapperRef} className="mt-[0.5vh] relative w-full h-screen bg-white  ">
        <div
          ref={scrollRef}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-36 px-[20vw] w-max"
        >
          {products.map((item, i) => (
            <div key={i} className="shrink-0 w-[400px]">
              <ProductCard {...item} />
            </div>
          ))}
        </div>
          <MarqueeBackground />

      </section> */}
<section ref={wrapperRef} className="relative w-full h-screen bg-white  ">
  <div className="flex flex-col w-full h-full">
    
    {/* Nửa trên: Horizontal Slider */}
    <div className="relative h-1/2 w-full flex items-center justify-center mt-16 md:mt-28">
      <div
        ref={scrollRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-10 md:gap-36 px-[10vw] w-max"
      >
        {products.map((item, i) => (
          <div key={i} className="shrink-0 w-[80vw] sm:w-[400px] transition-transform hover:scale-[1.02] duration-300">
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </div>

    {/* Nửa dưới: Marquee */}
    <div className="relative h-1/2 w-full mt-[-30px] overflow-hidden">
      <MarqueeBackground />
      {/* <MarqueeTailwind/> */}
    </div>

  </div>
</section>



    </>
  )
}
