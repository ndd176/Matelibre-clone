'use client'

import Image from 'next/image'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
 
// Import API và types
import { strapiApi } from '../../../lib/api/strapi'
import { JobDetail } from '../../../types/api/strapi'
import { getImageUrl as getImageUrlUtil } from '../../../lib/utils/image'
import { IMAGE_CONFIG } from '../../../lib/constants/index'

// Helper function to get image URL
const getImageUrl = (jobImage: unknown): string => {
  if (!jobImage) {
    console.log('No job image provided, using fallback')
    return "/images/position.jpg"
  }

  // If jobImage is already a string (fallback case)
  if (typeof jobImage === 'string') {
    console.log('Job image is string:', jobImage)
    return jobImage
  }

  // If jobImage is an object with url property
  if (typeof jobImage === 'object' && jobImage !== null && 'url' in jobImage && typeof (jobImage as { url?: string }).url === 'string') {
    const fullUrl = `${IMAGE_CONFIG.STRAPI_BASE_URL}${(jobImage as { url: string }).url}`
    console.log('Job image URL:', fullUrl)
    return fullUrl
  }

  console.log('Job image object but no URL, using fallback:', jobImage)
  return "/images/position.jpg"
}

// Fallback data nếu API không có dữ liệu
const fallbackAccordionData = [
  {
    title: 'What you’ll be doing',
    content: [
      'Designing embroidery mockups and product visuals for e-commerce listings',
      'Creating branding materials and social media assets for campaigns',
      'Collaborating with marketing and production teams to ensure brand consistency',
      'Optimizing design workflows for scalable product customization',
    ],
  },
  {
    title: 'What we’re looking for',
    content: [
      'Proficiency in Adobe Illustrator, Photoshop or equivalent design tools',
      'Experience in embroidery or print-ready artwork is a big plus',
      'Creative thinking, attention to detail, and an eye for clean aesthetics',
      'Basic knowledge of layout for online stores (Shopify, Etsy, etc.)',
    ],
  },
  {
    title: 'Perks & vibes',
    content: [
      'Flexible schedule and hybrid work options',
      'Friendly, fast-paced creative team environment',
      'Room to grow in a scaling DTC brand',
      'Employee discounts on custom apparel & patches',
    ],
  },
]

interface AccordionItemProps {
  title: string;
  content: string[];
  isOpen: boolean;
  onClick: () => void;
}

function AccordionItem({ title, content, isOpen, onClick }: AccordionItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div className="border-2 border-green-800 rounded-[24px] overflow-hidden transition-all">
      <button
        className="w-full text-left px-6 py-4 text-green-900 font-bold text-lg flex justify-between items-center"
        onClick={onClick}
      >
        {title}
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div ref={ref} className="px-8 pb-5 pt-2 text-green-800 text-sm">
              <ul className="list-disc list-inside space-y-1">
                {content.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetailWithAccordion({ jobId, onApplyClick }: { jobId?: string, onApplyClick?: (position: string) => void }) {
  const [openIndex, setOpenIndex] = useState(-1)
  const [accordionData, setAccordionData] = useState(fallbackAccordionData)
  const [jobData, setJobData] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const toggleIndex = (index: number) => {
    setOpenIndex(prev => (prev === index ? -1 : index))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response
        
        if (jobId) {
          // Fetch specific job detail by job ID
          response = await strapiApi.fetchJobDetailById(jobId)
        } else {
          // Fetch all job details (fallback to first one)
          response = await strapiApi.fetchJobDetails()
        }
        
        if (response.data && response.data.length > 0) {
          // Lấy job detail (specific one hoặc đầu tiên)
          const jobDetail = response.data[0]
          console.log('Job Detail Data:', jobDetail)
          console.log('Job Image:', jobDetail.job_image)
          setJobData(jobDetail)

          // Tạo 3 mục accordion từ 3 trường mới
          const apiAccordionData = [
            {
              title: "Job Description",
              content: jobDetail.question_1
                ? jobDetail.question_1.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
                : ["No data"],
            },
            {
              title: "Requirements",
              content: jobDetail.question_2
                ? jobDetail.question_2.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
                : ["No data"],
            },
            {
              title: "Benefits",
              content: jobDetail.question_3
                ? jobDetail.question_3.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
                : ["No data"],
            },
          ]
          setAccordionData(apiAccordionData)
        } else {
          setAccordionData(fallbackAccordionData)
        }
      } catch (error) {
        console.error('Error fetching job details:', error)
        console.log('JobId passed:', jobId)
        setAccordionData(fallbackAccordionData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [jobId])

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenIndex(0)
    }, 1100)
    return () => clearTimeout(timer)
  }, [])



  return (
    <section className="bg-[#e6f3e6] px-4 md:px-20 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-16 items-start">
      {loading ? (
        <div className="w-full text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 font-medium">Loading job details...</p>
        </div>
      ) : (
        <>
          {/* LEFT: Content */}
          <div className="w-full md:w-1/2 font-bold max-w-2xl mx-auto">
        <div className="flex flex-col gap-0">
          {jobData?.job_title ? 
            jobData.job_title.toLowerCase().split(' ').map((word: string, i: number) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 1.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-bold text-[48px] sm:text-[64px] md:text-[96px] lg:text-[110px] leading-[1] text-green-800"
              >
                {word}
              </motion.h1>
            )) :
            ['creative', 'design', 'role'].map((line, i) => (
              <motion.h1
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 + 1.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="font-bold text-[48px] sm:text-[64px] md:text-[96px] lg:text-[110px] leading-[1] text-green-800"
              >
                {line}
              </motion.h1>
            ))
          }
        </div>

        <motion.div
          className="flex justify-between text-sm sm:text-base pt-8 pb-10 gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + 1.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {jobData?.text_icon && jobData.text_icon.length > 0 ? 
            jobData.text_icon.map((item: { icon: string; text: string }, index: number) => (
              <Feature key={index} icon={item.icon} label={item.text} />
            )) :
            <>
              <Feature icon="🎨" label="Creative freedom" />
              <Feature icon="🧵" label="Embroidery design" />
              <Feature icon="🚀" label="Fast-paced team" />
            </>
          }
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + 1.5, duration: 0.5 }}
          viewport={{ once: true }}
        > 

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-green-800 transition"
        onClick={() => {
          if (typeof onApplyClick === 'function') {
            onApplyClick(jobData?.job_title || 'Unknown Position')
          }
        }}
      >
        Apply Now
      </motion.button>

          <div className="text-green-900 text-base leading-snug">
            <p className="text-lg sm:text-xl font-semibold">
              {jobData?.salary_range ? `💰 ${jobData.salary_range}` : 'Full-time or freelance'}
            </p>
            {jobData?.job_title && (
              <p className="opacity-70 text-sm mt-1">🎯 {jobData.job_title} Position</p>
            )}
          </div>
        </motion.div>

        <div className="space-y-4">
          {accordionData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + 1.5, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                title={item.title}
                content={item.content}
                isOpen={openIndex === index}
                onClick={() => toggleIndex(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT: Image */}
      <div className="w-full md:w-1/2 max-w-4xl flex flex-col gap-6 mx-auto">
        <motion.div
          initial={{ y: 200, scale: 0.2, borderRadius: '50%', backgroundColor: '#14532d' }}
          animate={{ y: 0, scale: 1, borderRadius: '32px', backgroundColor: 'transparent' }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-full mx-auto overflow-hidden relative"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="w-full h-auto"
          >
            {/* Temporary debug: using img tag instead of Next Image */}
            <div className="w-full h-auto">
              <img
                src={getImageUrlUtil(jobData?.job_image)}
                alt={jobData?.job_title || "job position"}
                className="w-full h-auto object-cover rounded-[32px]"
                onError={(e) => {
                  console.error('Image failed to load:', getImageUrlUtil(jobData?.job_image))
                  e.currentTarget.src = "/images/position.jpg"
                }}
                onLoad={() => console.log('Image loaded successfully:', getImageUrlUtil(jobData?.job_image))}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
        </>
      )}
    </section>
  )
}

function Feature({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-green-800 text-sm min-w-[100px]">
      <div className="text-[50px]">{icon}</div>
      <p className="mt-1 text-center text-[16px] whitespace-nowrap">{label}</p>
    </div>
  )
}
