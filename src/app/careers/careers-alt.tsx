import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { strapiApi } from '../../lib/api/strapi'
import { Job as StrapiJob } from '../../types/api/strapi'
import { getImageUrl } from '../../lib/utils/image'

type JobCard = {
  id: string | number
  job_title: string
  short_description: string
  avatar_image: string
}

const CareersAlt = () => {
  const [jobs, setJobs] = useState<JobCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await strapiApi.fetchJobs()
        const mapped: JobCard[] = res.data.map((job: StrapiJob) => ({
          id: job.id,
          job_title: job.job_title || 'No Title',
          short_description: job.short_description || '',
          avatar_image: getImageUrl(job.avatar_image) || '/images/duydinh-bg-2.png',
        }))
        setJobs(mapped)
      } catch (err) {
        setJobs([])
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
          Job Opportunities
        </h2>
        <div className="w-24 h-px bg-black mx-auto"></div>
      </motion.div>
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No jobs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              className="group"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={job.avatar_image}
                    alt={job.job_title}
                    
                                width={500}
            height={500}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <h3 className="text-2xl font-studio-pro-bold mb-2 text-black">{job.job_title}</h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed font-studio-pro">{job.short_description}</p>
                  <button
                    className="mt-4 bg-gradient-to-r bg-black text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-all duration-300"
                    onClick={() => window.location.href = `/careers/${job.id}`}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CareersAlt
