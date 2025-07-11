'use client'

import Marquee from './marquee'

const speeds = 20

export default function MarqueeBackground() {
  return (
    <div className="absolute inset-0 -z-10  ">
      {[...Array(1)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full select-none"
          style={{ top: `${i *30}%` }}
        >
          <Marquee
            text="WE'RE HIRING"
            speed={speeds}
            fontSize="text-[400px]"
            opacity={1}
            textColor="text-black"
            reverse={i % 2 !== 0}
            outlined={i % 2 !== 0}
          />
        </div>
      ))}
    </div>
  )
}
