'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'
import MarqueeBackground from '../../components/MarqueeBackground'

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    title: 'IT',
    description: 'Fresh and zesty with a kick of energy...',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/anh-hiep.png',
    color: 'white',
  },
    {
    title: 'lemonade boost',
    description: 'Fresh and zesty with a kick of energy...',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-2.webp',
    color: 'milk',
  },
  {
    title: 'lemonade boost',
    description: 'Fresh and zesty with a kick of energy... Fresh and zesty with a kick of energy... Fresh and zesty with a kick of energy...',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-2.webp',
    color: 'matcha',
  },
  {
    title: 'passion',
    description: 'Exotic, rich, and dangerously fruity...',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-2.webp',
    color: 'dark_green',
  },
  {
    title: 'mint & lime',
    description: "It's like happy hour in a can...",
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/subproduct-1.webp',
    color: 'black',
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
        start: 'top+=50 top',
        end: () => `+=${totalWidth}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
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
<section ref={wrapperRef} className="relative w-full h-screen bg-white overflow-hidden"
      // style={{
      //   backgroundImage: 'url(/images/tree-background-4.jpg)',
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundAttachment: 'fixed',
      //   backgroundBlendMode:'normal'
      // }}
>
  {/* Chia đôi màn hình theo chiều dọc */}
  <div className="flex flex-col w-full h-full relative">
    {/* Slider nằm nửa trên */}
    <div className="relative h-1/2 w-full flex items-center mt-40 justify-center">
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
    </div>

    {/* Marquee ở nửa dưới */}
    <div className="h-1/2 mt-[-30px] w-full relative">
      <MarqueeBackground />
    </div>

  
  </div>
</section>


    </>
  )
}
