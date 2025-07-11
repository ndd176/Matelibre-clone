'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
 export default function ProductCard({
  title,
  description,
  canImage,
  bgImage,
  color = 'green',
}: {
  title: string
  description: string
  canImage: string
  bgImage: string
  color?: string
}) {
  const [hovered, setHovered] = useState(false)

  const bgColor = {
    black: 'bg-[#000000]',
    milk: 'bg-[#F2EFE6]',
    matcha: 'bg-[#8C8A6F]',
    dark_green: 'bg-[#09290E]',
    white: 'bg-[#ffffff]',
  }[color]

  const textColor = {
    black: 'text-white',
    milk: 'text-black',
    matcha: 'text-[#09290E]',
    dark_green: 'text-white',
    white: 'text-black',
  }[color]

  const buttonColor = {
    black: 'bg-white',
    milk: 'bg-black',
    matcha: 'bg-[#8C8A6F]',
    dark_green: 'bg-[#09290E]',
    white: 'bg-black',
  }[color]

  return (
    <div
className={`relative ${bgColor} w-[500px] h-[400px] rounded-[40px] p-10 overflow-hidden flex flex-col justify-between
  transition-all duration-300
  shadow-[8px_8px_0px_#000000] `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <Image
        src={bgImage}
        alt=""
        width={300}
        height={300}
        className={`absolute bottom-0 right-0 z-0 opacity-0 scale-90 transition-all duration-700 ${
          hovered ? 'opacity-100 scale-100' : ''
        }`}
      />

      {/* Title */}
      <h2 className={`text-5xl font-bold ${textColor} z-10 leading-tight text-right`}>
        {title}
      </h2>

      {/* Bottom content */}
      <div className="flex flex-row h-full z-10 mt-10 gap-6">
        {/* Left image */}
        <div className="flex justify-center items-center w-1/2">
          <Image
            src={canImage}
            alt={title}
            width={200}
            height={300}
            className={`transition-transform duration-300 transform ${
              hovered ? 'translate-y-10' : 'translate-y-0'
            }`}
          />
        </div>

        {/* Right text + button */}
        <div className="flex flex-col justify-between w-1/2 relative">
          <p
            className={`text-lg  font-bold leading-relaxed ${textColor} pr-2`}
          >
            {description}
          </p>
          <div className="flex flex-col w-1/2 justify-end relative  bottom-20   mt-auto">
 
 
          <button className="flex flex-col relative h-12 w-[180px] items-center justify-center 
          overflow-hidden rounded-md border border-neutral-200    bg-white px-6 font-semibold text-black text-2xl
             transition-all duration-100 

           [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] 
           active:[box-shadow:0px_0px_rgb(82_82_82)] cursor-pointer">            Apply Now
</button>
          
 {/* <div className="button-container">
  <button className="brutalist-button openai button-1">
    <div className="openai-logo">
      <svg
        className="openai-icon"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5907 8.3829 14.6108 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
          fill="#10A37F"
        ></path>
      </svg>
    </div>
    <div className="button-text">
      <span>Powered By</span>
      <span>GPT-Omni</span>
    </div>
  </button>
</div> */}
 
          </div>
        </div>
      </div>
    </div>
  )
}
