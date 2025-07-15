// app/careers/page.tsx (Next.js 13+ App Router)
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Import từ lib
import { Job } from '../../types/api/strapi'
import { strapiApi } from '../../lib/api/strapi'

// Interface for UI display
interface JobDisplay {
  id: string
  title: string
  description: string
  department: string
  location: string
  type: string
  canImage: string
  bgImage: string
  color: 'white' | 'milk' | 'matcha' | 'dark_green' | 'black'
  requirements: string[]
  benefits: string[]
  salaryRange: string
  isActive: boolean
}

// Function to convert Job to JobDisplay
function jobToDisplay(job: Job): JobDisplay {
  return {
    id: job.id,
    title: job.job_title,
    description: job.short_description,
    department: 'Technology', // Default values for missing fields
    location: 'Ho Chi Minh City',
    type: 'Full-time',
    canImage: job.avatar_image || '/images/duydinh-bg-2.png',
    bgImage: job.sub_avatar || '/images/anh-hiep.png',
    color: 'white',
    requirements: [],
    benefits: [],
    salaryRange: '$1500 - $3000',
    isActive: true
  }
}

function ProductCard({
  job,
  index,
  zIndex,
}: {
  job: JobDisplay
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
      className={`relative ${bgColor} w-[500px] h-[400px] rounded-[40px] p-10 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[8px_8px_0px_#000000]`}
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
          <div className="space-y-4">
            <p className={`text-lg font-medium leading-relaxed ${textColor} pr-2`}>
              {job.description}
            </p>
            <div className="flex flex-col gap-2">
              <span className={`text-sm ${textColor} opacity-80`}>📍 {job.location}</span>
              <span className={`text-sm ${textColor} opacity-80`}>💼 {job.type}</span>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Link href={`/careers/${job.id}`}>
              <button className="h-12 px-6 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white font-semibold text-black text-lg transition-all duration-100 [box-shadow:3px_3px_rgb(82_82_82)] hover:translate-x-[1px] hover:translate-y-[1px] hover:[box-shadow:2px_2px_rgb(82_82_82)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(82_82_82)]">
                Chi tiết →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobDisplay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await strapiApi.fetchJobs()
        const apiJobs = response.data.map(jobToDisplay)
        setJobs(apiJobs)
      } catch (err) {
        console.error('Error loading jobs:', err)
        setJobs([]) // Set empty array if API fails
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  if (loading) {
    return (
      <div className="p-10 flex flex-col gap-10">
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
               textShadow: { delay: 1.3, duration: 0.3 },
            }}
            className="text-[120px] leading-[1] font-extrabold tracking-tight text-black"
          >
            WE'RE
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
               delay: 0.3,
              textShadow: { delay: 1.3, duration: 0.3 },
            }}
            className="text-[120px] leading-[1] font-extrabold tracking-tight text-[#1f690c]"
          >
            HIRING
          </motion.h2>
        </div>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading positions...</p>
        </div>
      </div>
    )
  }

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
       textShadow: { delay: 1.3, duration: 0.3 },
    }}
    className="text-[120px] leading-[1] font-extrabold tracking-tight text-black"
  >
    WE'RE
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
       delay: 0.3,
      textShadow: { delay: 1.3, duration: 0.3 },
    }}
    className="text-[120px] leading-[1] font-extrabold tracking-tight text-[#1f690c]"
  >
    HIRING
  </motion.h2>
</div>

    <main className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {jobs.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-600 text-xl">No job positions available at the moment.</p>
          <p className="text-gray-500 mt-2">Please check back later for new opportunities.</p>
        </div>
      ) : (
        jobs.map((job, i) => {
          const row = Math.floor(i / 3)
          const col = i % 3
          const zIndex = 1000 + row * 1000 - col

          return <ProductCard key={job.id} job={job} index={i} zIndex={zIndex} />
        })
      )}
    </main>
    </div>
  )
}

