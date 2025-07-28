'use client'

import Marquee from './marquee'

const speeds = 20

export default function MarqueeBackground() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Dòng 1: Chữ đậm */}
      <div className="absolute w-full select-none top-[20%]">
        <Marquee
          text="TUYỂN DỤNG"
          speed={speeds}
          fontSize="text-[100px] sm:text-[150px] md:text-[200px] lg:text-[200px]"
          opacity={1}
          textColor="text-black font-bold"
          reverse={false}
          outlined={false}
        />
      </div>
      
      {/* Dòng 2: Chữ rỗng ruột - chỉ hiện trên mobile/tablet */}
      <div className="absolute w-full select-none top-[60%] block lg:hidden">
        <Marquee
          text="TUYỂN DỤNG"
          speed={speeds * 0.8}
          fontSize="text-[100px] sm:text-[120px] md:text-[200px]"
          opacity={0.3}
          textColor="text-black font-bold"
          reverse={true}
          />
      </div>
    </div>
  )
}
