
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { strapiApi } from '../../lib/api/strapi'
import { Job as StrapiJob } from '../../types/api/strapi'
import { getImageUrl } from '../../lib/utils/image'

type JobCard = {
  id: string | number
  tag: string
  label: string
  bigText: string
  icon: string
  image: string
  field: string
}

export default function VerticalJobSelector() {
  const [jobs, setJobs] = useState<JobCard[]>([])
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await strapiApi.fetchJobs()
        // Map API data về format UI cần
        const mapped: JobCard[] = res.data.map((job: StrapiJob) => ({
          id: job.id,
          tag: job.job_title || '',
          label: job.job_title || '',
          bigText: (job.job_title || '').toUpperCase(),
          icon: getImageUrl((job as any).icon) || '/images/icon-default.png',
          image: getImageUrl(job.avatar_image) || '/images/Will-Smith-meme-4.png',
          field: job.short_description || '',
        }))
        setJobs(mapped)
        setSelectedIdx(0)
      } catch (err) {
        setJobs([])
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading jobs...</div>
      </section>
    )
  }
  if (!jobs.length) {
    return (
      <section className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">No jobs found.</div>
      </section>
    )
  }

  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-white py-12 px-6 md:px-24">
      
      {/* Left: Vertical Scroll / Job Selector */}
      <nav className="w-full md:w-1/4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 pr-4">
        <ul className="space-y-6">
          {jobs.map((job: JobCard, idx: number) => (
            <motion.li 
              key={job.id} 
              layout
              onClick={() => setSelectedIdx(idx)}
              className={`cursor-pointer rounded-lg p-4 flex items-center gap-4 border-2 transition 
                ${selectedIdx === idx 
                  ? 'border-orange-500 bg-orange-100 shadow-lg text-orange-700 font-semibold' 
                  : 'border-gray-200 hover:border-orange-400 hover:bg-orange-50'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => (e.key === 'Enter' || e.key === ' ') && setSelectedIdx(idx)}
              aria-selected={selectedIdx === idx}
            >
              <Image 
                src={job.icon} 
                alt={`${job.label} icon`} 
                width={36} 
                height={36} 
                className="flex-shrink-0" 
                priority
              />
              <span className="text-lg md:text-xl">{job.label}</span>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Right: Job Detail */}
      <main className="w-full md:w-3/4 flex flex-col justify-center px-6 md:px-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={jobs[selectedIdx].id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="relative bg-gradient-to-br from-orange-200 to-pink-200 rounded-3xl p-10 shadow-xl flex flex-col md:flex-row items-center min-h-[380px]"
            style={{ boxShadow: '0 10px 70px rgba(255, 105, 135, 0.2)' }}
          >
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
              <Image 
                src={jobs[selectedIdx].image} 
                alt={`${jobs[selectedIdx].label} illustration`} 
                width={280} 
                height={240} 
                objectFit="contain"
                priority
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="uppercase text-4xl md:text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 mb-3">
                {jobs[selectedIdx].bigText}
              </div>
              <h3 className="text-3xl font-bold text-orange-700 mb-4">
                {jobs[selectedIdx].label}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {jobs[selectedIdx].field}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

    </section>
  )
}
