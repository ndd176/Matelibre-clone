// app/careers/page.tsx (Next.js 13+ App Router)
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Import từ lib structure
import { CareersNewPosition } from '../../types/api/strapi'
import { strapiApi } from '../../lib/api/strapi'
import { transformJobToCareersNewPosition } from '../../lib/utils/jobs'

 
 

function ProductCard({
  job,
  index,
  zIndex,
}: {
  job: CareersNewPosition
  index: number
  zIndex: number
}) {
  const [hovered, setHovered] = useState(false)

  const bgColorMap: Record<string, string> = {
    white: 'bg-[#FDFDFD]',
    seasalt: 'bg-[#F8F8F9]',
    ash_gray: 'bg-[#B8C5B5]',
    asparagus: 'bg-[#6D995C]',
    poly_green: 'bg-[#264A20]',
    pakistan: 'bg-[#1F3F1A]',
    dark_1: 'bg-[#1F321B]',
    dark_2: 'bg-[#1E2A1C]',
    black: 'bg-[#000000]',
    milk: 'bg-[#F5F5F5]',
    matcha: 'bg-[#87A96B]',
    dark_green: 'bg-[#2F5233]',
  }

  const textColorMap: Record<string, string> = {
    white: 'text-black',
    seasalt: 'text-black',
    ash_gray: 'text-black',
    asparagus: 'text-black',
    poly_green: 'text-white',
    pakistan: 'text-white',
    dark_1: 'text-white',
    dark_2: 'text-white',
    black: 'text-white',
    milk: 'text-black',
    matcha: 'text-black',
    dark_green: 'text-white',
  }

  // Fallback cho các màu từ color property của job
  const actualColor = job.color === 'milk' ? 'seasalt' : 
                     job.color === 'matcha' ? 'asparagus' :
                     job.color === 'dark_green' ? 'poly_green' : job.color

  const bgColor = bgColorMap[actualColor] || 'bg-[#FDFDFD]'
  const textColor = textColorMap[actualColor] || 'text-black'

  return (
    <motion.div
      initial={{ scale: 0.6 }}
      animate={{ scale: 1.3}}
      transition={{ duration: 0.2, ease: 'easeInOut', delay: index * 0.01 }}
      style={{ zIndex }}
      className={`relative ${bgColor} w-[500px] h-[400px] rounded-[40px] p-10 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[8px_8px_0px_#000000] border-4 border-black`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={job.bgImage}
        alt=""
        width={300}
        height={300}
        className={`absolute bottom-0 left-0 z-0 opacity-0 scale-90 transition-all duration-700 ${hovered ? 'opacity-100 scale-100' : ''}`}
      />

    <h2 className={`text-5xl font-bold ${textColor} z-10 leading-tight text-right`}>
        {job.title}
      </h2>

      <div className="flex flex-row h-full z-10 mt-10 gap-6">
        <div className="flex justify-center items-center w-1/2">
          <motion.div
            // initial={{ x: 50, y: -30 }}
            // animate={{ x: 0, y: 0 }}
            // transition={{ duration: 0.1, ease: 'easeInOut', delay: index * 0.009 }}
          >
            <Image
              src={job.canImage}
              alt={job.title}
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
             <Link href={`/careers/${job.id}`}>
             <button
              className="flex flex-col relative h-12 w-[180px] items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white px-6 font-semibold text-black text-2xl transition-all duration-100 [box-shadow:5px_5px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]"
            >
              Apply Now
            </button>
            </Link>
         </div>
      </div>
    </motion.div>
  )
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<CareersNewPosition[]>([])
 
  useEffect(() => {
async function loadJobs() {
  try {
    const response = await strapiApi.fetchJobs()
    const apiJobs = response.data.map(transformJobToCareersNewPosition)
    setJobs(apiJobs)
  } catch (error) {
    console.error('Failed to load jobs from API:', error)
    setJobs([])  
  } finally {
   }
}


    loadJobs()
  }, [])

 

  return (
     <div className="p-10 flex flex-col   gap-10">
<div className="flex items-end gap-4">
  <motion.h1
    initial={{
        textShadow: '0px 0px 0px rgba(0,0,0,0)',
    }}
    animate={{
       textShadow: '8px 8px 0px rgba(0,0,0,0.3)',
    }}
    transition={{
      type: 'spring',
      stiffness: 400,
      damping: 15,
      bounce: 0.6,
       textShadow: { delay: 2.8, duration: 0.3 },
    }}
    className="text-[120px] leading-[1] font-extrabold tracking-tight text-black"
  >
    WE&apos;RE
  </motion.h1>

  <motion.h2
    initial={{
      opacity: 0,
      y: -400,
      textShadow: '0px 0px 0px rgba(0,0,0,0)',
    }}
    animate={{
      opacity: 1,
      y: 0,
       textShadow: '8px 8px 0px rgba(0,0,0,0.3)',
    }}
    transition={{
      type: 'spring',
      stiffness: 400,
      damping: 15,
       delay: 1.8,
      textShadow: { delay: 2.8, duration: 0.3 },
    }}
    className="text-[120px] leading-[1] font-extrabold tracking-tight text-[#1f690c]"
  >
    HIRING
  </motion.h2>
</div>

    <main className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
        
      {jobs.map((job, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
const zIndex = 1000 + row * 1000 - col

        return <ProductCard key={job.id} job={job} index={i} zIndex={zIndex} />
      })}
    </main>
    </div>
  )
}