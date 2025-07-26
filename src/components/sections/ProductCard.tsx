'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function ProductCard({
  id,
  title,
  description,
  canImage,
  bgImage,
  color,
  index,
}: {
  id?: string
  title: string
  description: string
  canImage: string
  bgImage: string
  color?: string
  index?: number
}) {
  const [hovered, setHovered] = useState(false)

  // Mặc định trắng đen xen kẽ, các màu khác comment lại
  const computedColor = typeof index === 'number'
    ? (index % 2 === 0 ? 'white' : 'black')
    : (color || 'white')

  const bgColor = {
    black: 'bg-[#000000]',
    white: 'bg-[#ffffff]',
    // milk: 'bg-[#F2EFE6]',
    // matcha: 'bg-[#8C8A6F]',
    // dark_green: 'bg-[#09290E]',
  }[computedColor]

  const textColor = {
    black: 'text-white',
    white: 'text-black',
    // milk: 'text-black',
    // matcha: 'text-[#09290E]',
    // dark_green: 'text-white',
  }[computedColor]

  // const buttonColor = {
  //   black: 'bg-white',
  //   white: 'bg-black',
  //   milk: 'bg-black',
  //   matcha: 'bg-[#8C8A6F]',
  //   dark_green: 'bg-[#09290E]',
  // }[computedColor]

  // Đổ bóng trắng nếu là card đen, ngược lại giữ bóng đen
  const shadowClass = computedColor === 'black'
    ? 'shadow-[4px_4px_0px_#bdbdbd] sm:shadow-[8px_8px_0px_#bdbdbd]'
    : 'shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000]'

  return (
    <div
      className={`relative ${bgColor} w-full sm:w-[500px] h-[400px] rounded-[20px] sm:rounded-[40px] p-4 sm:p-10 pt-10 overflow-hidden flex flex-col justify-between
        transition-all duration-300
        border-2 sm:border-3 border-black
        ${shadowClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Title */}
      <h2 className={`text-3xl sm:text-4xl font-bold ${textColor} z-10 leading-tight text-left`}>
        {title}
      </h2>

      {/* Bottom content */}
      <div className="flex flex-row h-full z-10 mt-4 sm:mt-6 gap-3 sm:gap-6">
        {/* Left image - chiếm nhiều không gian hơn */}
        <div className="  w-2/3 pl-0 z-20 -ml-6">
          <Image
            src={hovered ? bgImage : canImage}
            alt={title}
            width={500}
            height={750}
            className="transition-opacity duration-1000 sm:duration-2000 object-contain w-full h-auto max-h-full z-20"
          />
        </div>

         {/* Right text + button - thu nhỏ lại */}
        <div className="flex flex-col h-full w-1/3 justify-between">
          {/* Description section */}
          <div>
            <p className={`text-lg sm:text-lg font-bold leading-relaxed ${textColor} pr-1 sm:pr-2`}>
              {description}
            </p>
          </div>
          {/* Button section - luôn nằm dưới cùng */}
<div className="absolute bottom-4 sm:bottom-10 right-4 sm:right-10">
        {id ? (
          <Link href={`/careers/${id}`}>
            <button className="flex flex-col relative h-10 sm:h-12 w-[170px] sm:w-[200px] items-center justify-center 
              overflow-hidden rounded-lg border border-neutral-200 bg-white px-6 sm:px-8 font-bold text-black text-xl sm:text-2xl
              transition-all duration-100 
              [box-shadow:4px_4px_rgb(82_82_82)] sm:[box-shadow:7px_7px_rgb(82_82_82)] 
              active:translate-x-[3px] active:translate-y-[3px] 
              active:[box-shadow:0px_0px_rgb(82_82_82)] cursor-pointer">            
              Ứng tuyển
            </button>
          </Link>
        ) : (
          <button className="flex flex-col relative h-12 sm:h-16 w-[170px] sm:w-[220px] items-center justify-center 
            overflow-hidden rounded-lg border-2 border-black bg-white px-6 sm:px-8 font-bold text-black text-xl sm:text-2xl
            transition-all duration-100 
            [box-shadow:4px_4px_rgb(0_0_0)] sm:[box-shadow:7px_7px_rgb(0_0_0)] 
            active:translate-x-[3px] active:translate-y-[3px] 
            active:[box-shadow:0px_0px_rgb(0_0_0)] cursor-pointer
            hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:3px_3px_rgb(0_0_0)] sm:hover:[box-shadow:5px_5px_rgb(0_0_0)]">            
            Ứng tuyển
          </button>
        )}
      </div>
        </div>
      </div>
    </div>
  );
}
