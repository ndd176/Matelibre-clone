// app/products/page.tsx (Next.js 13+ App Router)
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

const products = [
  {
    title: 'mint & lime',
    description: 'Refreshing and vibrant, great for summer days.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/mint-bg.png',
    color: 'white',
  },
  {
    title: 'passion',
    description: 'Bold tropical flavor with a zesty twist.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/passion-bg.png',
    color: 'seasalt',
  },
  {
    title: 'rose & hibiscus',
    description: 'Floral and lightly sweet, perfect for relaxing.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/rose-bg.png',
    color: 'ash_gray',
  },
  {
    title: 'ginger',
    description: 'Spicy and invigorating kick in every sip.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/ginger-bg.png',
    color: 'asparagus',
  },
  {
    title: 'original',
    description: 'The classic taste that started it all.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/original-bg.png',
    color: 'poly_green',
  },
  {
    title: 'blood orange',
    description: 'Citrusy with a bold twist of blood orange.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/blood-bg.png',
    color: 'pakistan',
  },
  {
    title: 'grapefruit',
    description: 'Bright and tangy for a refreshing hit.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/grapefruit-bg.png',
    color: 'dark_1',
  },
  {
    title: 'yuzu',
    description: 'Japanese citrus flavor, sharp and unique.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/yuzu-bg.png',
    color: 'dark_2',
  },
  {
    title: 'cherry cola',
    description: 'Classic cola with a cherry twist.',
    canImage: '/images/duydinh-bg-2.png',
    bgImage: '/images/cola-bg.png',
    color: 'black',
  },
]


function ProductCard({
  title,
   canImage,
  bgImage,
  color = 'green',
  index,
  zIndex,
}: {
  title: string
  description: string
  canImage: string
  bgImage: string
  color?: string
  index: number
  zIndex: number
}) {
  const [hovered, setHovered] = useState(false)

const bgColor = {
  white: 'bg-[#FDFDFD]',
  seasalt: 'bg-[#F8F8F9]',
  ash_gray: 'bg-[#B8C5B5]',
  asparagus: 'bg-[#6D995C]',
  poly_green: 'bg-[#264A20]',
  pakistan: 'bg-[#1F3F1A]',
  dark_1: 'bg-[#1F321B]',
  dark_2: 'bg-[#1E2A1C]',
  black: 'bg-[#000000]', // giữ lại nếu cần
}[color]

const textColor = {
  white: 'text-black',
  seasalt: 'text-black',
  ash_gray: 'text-black',
  asparagus: 'text-black',
  poly_green: 'text-white',
  pakistan: 'text-white',
  dark_1: 'text-white',
  dark_2: 'text-white',
  black: 'text-white',
}[color]

  return (
    <motion.div
      initial={{ scale: 0.6 }}
      animate={{ scale: 1.3}}
      transition={{ duration: 0.1, ease: 'easeInOut', delay: index * 0.009 }}
      style={{ zIndex }}
      className={`relative ${bgColor} w-[500px] h-[400px] rounded-[40px] p-10 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[8px_8px_0px_#000000]`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={bgImage}
        alt=""
        width={300}
        height={300}
        className={`absolute bottom-0 left-0 z-0 opacity-0 scale-90 transition-all duration-700 ${hovered ? 'opacity-100 scale-100' : ''}`}
      />

    <h2 className={`text-5xl font-bold ${textColor} z-10 leading-tight text-right`}>
        {title}
      </h2>

      <div className="flex flex-row h-full z-10 mt-10 gap-6">
        <div className="flex justify-center items-center w-1/2">
          <motion.div
            // initial={{ x: 50, y: -30 }}
            // animate={{ x: 0, y: 0 }}
            // transition={{ duration: 0.1, ease: 'easeInOut', delay: index * 0.009 }}
          >
            <Image
              src={canImage}
              alt={title}
              width={200}
              height={300}
              className={`transition-transform duration-300 transform ${hovered ? 'translate-y-10' : 'translate-y-0'}`}
            />
          </motion.div>
        </div>

        <div className="flex flex-col justify-between w-1/2 relative">
          {/* <p className={`text-lg font-medium leading-relaxed ${textColor} pr-2`}>
            {description}
          </p> */}
             <button
              className="flex flex-col relative h-12 w-[180px] items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white px-6 font-semibold text-black text-2xl transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              Apply Now
            </button>
         </div>
      </div>
    </motion.div>
  )
}

export default function ProductGridPage() {
  return (
     <div className="p-10 flex flex-col   gap-10">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'easeInOut', delay: 0 }}
        className="text-5xl font-extrabold"
      >
        Our Energy
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut', delay: 0.4 }}
        className="text-4xl font-semibold"
      >
        Infusions
      </motion.h2>
    <main className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
      {products.map((product, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        const zIndex = row * 100 - col

        return <ProductCard key={i} {...product} index={i} zIndex={zIndex} />
      })}
    </main>
    </div>
  )
}