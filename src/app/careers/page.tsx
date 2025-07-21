'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { strapiApi } from '../../lib/api/strapi'
import { Job } from '../../types/api/strapi'
import { getImageUrl } from '../../lib/utils/image'

// Animation variants để phù hợp với phong cách chung
const elegantFadeIn = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
}

type JobCard = {
  id: string | number
  job_title: string
  short_description: string
  avatar_image: string
}

function JobCard({
  job,
  index,
}: {
  job: JobCard
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={job.avatar_image}
            alt={job.job_title}
            width={400}
            height={400}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={index < 3}
          />
        </div>
        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-studio-pro-bold mb-3 text-black leading-tight">
              {job.job_title}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed font-studio-pro">
              {job.short_description}
            </p>
          </div>
          <Link href={`/careers/${job.id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full text-white font-studio-pro-bold py-3 px-6 rounded-full transition-all duration-300"
              style={{ backgroundColor: 'var(--color-black)' }}
            >
              Apply Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await strapiApi.fetchJobs()
        const mapped: JobCard[] = response.data.map((job: Job) => ({
          id: job.id,
          job_title: job.job_title || 'No Title',
          short_description: job.short_description || 'Join our dynamic team and make a difference.',
          avatar_image: getImageUrl(job.avatar_image) || '/images/position.jpg',
        }))
        setJobs(mapped)
      } catch (error) {
        console.error('Failed to load jobs from API:', error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-studio-pro-bold leading-tight mb-4"
                style={{ color: 'var(--color-blue2)' }}
              >
                Join Our Team
              </motion.h1>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1 mx-auto rounded-full"
                style={{ backgroundColor: 'var(--color-blue1)' }}
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 font-studio-pro max-w-3xl mx-auto leading-relaxed"
            >
              We&apos;re looking for passionate individuals who share our vision of creating 
              sustainable, beautiful products that make a difference.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Jobs Grid Section */}
      <section className="px-6 sm:px-12 py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
              Current Openings
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--color-blue1)' }}></div>
              <p className="text-gray-600 font-studio-pro">Loading opportunities...</p>
            </div>
          ) : jobs.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-studio-pro-bold text-black mb-3">No openings right now</h3>
                <p className="text-gray-600 font-studio-pro">
                  We&apos;re not actively hiring, but we&apos;re always interested in meeting talented people.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white font-studio-pro-bold py-3 px-8 rounded-full transition-all duration-300"
                style={{ backgroundColor: 'var(--color-black)' }}
                onClick={() => window.location.href = 'mailto:hr@ethanecom.com'}
              >
                Send us your resume
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          )}
        </div>
        
      </section>
    </div>
  )
}
