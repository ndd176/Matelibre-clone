'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { strapiApi } from '../../../lib/api/strapi'
import { Job } from '../../../types/api/strapi'
import { getImageUrl } from '../../../lib/utils/image'

interface JobDetail extends Job {
  responsibilities?: string[]
  requirements?: string[]
  benefits?: string[]
  department?: string
  location?: string
  type?: string
  salary?: string
  experience?: string
  skills?: string[]
  team?: string[]
}

// Animation variants
const slideUp = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const fadeInScale = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isApplying, setIsApplying] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await strapiApi.fetchJobs()
        const foundJob = response.data.find((j: Job) => j.id.toString() === params.id)
        
        if (foundJob) {
          setJob({
            ...foundJob,
            responsibilities: [
              'Architect and develop scalable frontend applications using React and Next.js',
              'Lead code reviews and mentor junior developers on best practices',
              'Collaborate with UX/UI designers to implement pixel-perfect interfaces',
              'Optimize application performance and ensure cross-browser compatibility',
              'Drive technical decisions and contribute to our engineering roadmap'
            ],
            requirements: [
              '5+ years of experience in frontend development',
              'Expert knowledge of React, TypeScript, and modern JavaScript',
              'Experience with Next.js, Tailwind CSS, and state management',
              'Strong understanding of web performance optimization',
              'Bachelor\'s degree in Computer Science or equivalent experience'
            ],
            benefits: [
              'Competitive salary: $120k - $160k + equity',
              'Comprehensive health, dental, and vision coverage',
              'Flexible work from home policy',
              '$5000 annual learning and development budget',
              'Top-tier equipment and workspace setup allowance'
            ],
            department: 'Engineering',
            location: 'San Francisco, CA (Remote OK)',
            type: 'Full-time',
            salary: '$120k - $160k',
            experience: '5+ years',
            skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'],
            team: ['Alex Chen - Engineering Manager', 'Sarah Kim - Senior Designer', 'Mike Rodriguez - Product Manager']
          })
        } else {
          // Enhanced mock job for demo
          setJob({
            id: params.id as string,
            job_title: 'Senior Frontend Developer',
            short_description: 'Join our innovative team to build the next generation of web applications that millions of users love and depend on every day.',
            avatar_image: '/images/position.jpg',
            sub_avatar: '',
            responsibilities: [
              'Architect and develop scalable frontend applications using React and Next.js',
              'Lead code reviews and mentor junior developers on best practices',
              'Collaborate with UX/UI designers to implement pixel-perfect interfaces',
              'Optimize application performance and ensure cross-browser compatibility',
              'Drive technical decisions and contribute to our engineering roadmap'
            ],
            requirements: [
              '5+ years of experience in frontend development',
              'Expert knowledge of React, TypeScript, and modern JavaScript',
              'Experience with Next.js, Tailwind CSS, and state management',
              'Strong understanding of web performance optimization',
              'Bachelor\'s degree in Computer Science or equivalent experience'
            ],
            benefits: [
              'Competitive salary: $120k - $160k + equity',
              'Comprehensive health, dental, and vision coverage',
              'Flexible work from home policy',
              '$5000 annual learning and development budget',
              'Top-tier equipment and workspace setup allowance'
            ],
            department: 'Engineering',
            location: 'San Francisco, CA (Remote OK)',
            type: 'Full-time',
            salary: '$120k - $160k',
            experience: '5+ years',
            skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'GraphQL'],
            team: ['Alex Chen - Engineering Manager', 'Sarah Kim - Senior Designer', 'Mike Rodriguez - Product Manager']
          })
        }
      } catch (error) {
        console.error('Failed to load job:', error)
        setJob(null)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadJob()
    }
  }, [params.id])

  const handleApply = () => {
    setIsApplying(true)
    setTimeout(() => {
      window.location.href = `mailto:hr@ethanecom.com?subject=Application for ${job?.job_title}&body=Hi there,%0A%0AI'm interested in applying for the ${job?.job_title} position.%0A%0APlease find my resume attached.%0A%0AThank you!`
      setIsApplying(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div className="text-center">
          <motion.div 
            className="w-20 h-20 border-4 border-blue-300 border-t-transparent rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-gray-600 font-studio-pro"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading job details...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            className="text-8xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🕵️
          </motion.div>
          <h1 className="text-4xl font-studio-pro-bold text-black mb-4">Position Not Found</h1>
          <p className="text-gray-600 font-studio-pro mb-8">This job might have been filled or removed.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/careers-alt')}
            className="bg-blue-300 text-white px-8 py-4 rounded-full font-studio-pro-bold shadow-lg"
          >
            Browse All Positions
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'requirements', label: 'Requirements', icon: '✅' },
    { id: 'benefits', label: 'Benefits', icon: '🎁' },
    { id: 'team', label: 'Meet the Team', icon: '👥' }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ x: -10, scale: 1.1 }}
        onClick={() => router.push('/careers-alt')}
        className="fixed top-8 left-8 z-50 bg-white shadow-xl rounded-full p-4 border border-gray-100 hover:shadow-2xl transition-all duration-300"
      >
        <span className="text-2xl">←</span>
      </motion.button>

      {/* Hero Section */}
      {mounted && (
        <motion.section 
          className="relative min-h-screen flex items-center bg-black text-white overflow-hidden"
        >
        {/* Animated background pattern */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Left content */}
            <div>
              <motion.div className="mb-8" variants={slideUp}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-blue-300 text-black px-4 py-2 rounded-full text-sm font-studio-pro-bold">
                    {job.department}
                  </span>
                  <span className="text-blue-300 font-studio-pro">
                    📍 {job.location}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-studio-pro-bold leading-tight mb-6">
                  {job.job_title}
                </h1>
                
                <p className="text-xl text-gray-300 font-studio-pro leading-relaxed mb-8">
                  {job.short_description}
                </p>

                {/* Key details */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-blue-300 text-2xl mb-2">💰</div>
                    <div className="text-sm text-gray-400 font-studio-pro">Salary</div>
                    <div className="text-white font-studio-pro-bold">{job.salary}</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-blue-300 text-2xl mb-2">⏱️</div>
                    <div className="text-sm text-gray-400 font-studio-pro">Experience</div>
                    <div className="text-white font-studio-pro-bold">{job.experience}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={slideUp} className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#93c5fd' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-blue-300 text-black font-studio-pro-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  {isApplying ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <span className="text-xl">🚀</span>
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('job-details')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                  className="border-2 border-white text-white font-studio-pro-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>

            {/* Right content - Interactive card */}
            <motion.div 
              variants={fadeInScale}
              className="relative"
            >
              <motion.div
                whileHover={{ rotateY: 5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
              >
                <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={getImageUrl(job.avatar_image) || '/images/position.jpg'}
                    alt={job.job_title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills?.slice(0, 4).map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-blue-300/20 text-blue-300 px-3 py-1 rounded-full text-sm font-studio-pro-bold border border-blue-300/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                
                <div className="text-center">
                  <div className="text-white/60 font-studio-pro text-sm mb-2">Join our team of</div>
                  <div className="text-white font-studio-pro-bold text-xl">50+ developers</div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-blue-300 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
              >
                💡
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-white w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg"
              >
                ⚡
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
        </motion.section>
      )}

      {/* Job Details with Tabs */}
      <section id="job-details" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tab Navigation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-studio-pro-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-blue-300 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
            >
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-4xl font-studio-pro-bold text-black mb-8">What You'll Do</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <ul className="space-y-6">
                        {job.responsibilities?.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 group"
                          >
                            <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center text-white font-studio-pro-bold text-sm flex-shrink-0 group-hover:scale-110 transition-transform">
                              {index + 1}
                            </div>
                            <span className="text-gray-600 font-studio-pro leading-relaxed group-hover:text-black transition-colors">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-2xl font-studio-pro-bold text-black mb-4">Your Impact</h3>
                      <p className="text-gray-600 font-studio-pro mb-4">
                        As a Senior Frontend Developer, you'll be at the forefront of creating exceptional user experiences 
                        that millions of users interact with daily.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>🎯 High Impact</span>
                        <span>🚀 Fast Growth</span>
                        <span>💡 Innovation</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div>
                  <h2 className="text-4xl font-studio-pro-bold text-black mb-8">What We're Looking For</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <h3 className="text-2xl font-studio-pro-bold text-black mb-6">Must-Have Skills</h3>
                      <ul className="space-y-4">
                        {job.requirements?.map((req, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                              ✓
                            </span>
                            <span className="text-gray-600 font-studio-pro group-hover:text-black transition-colors">
                              {req}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-studio-pro-bold text-black mb-6">Technical Skills</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {job.skills?.map((skill, index) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-studio-pro-bold text-center cursor-pointer hover:bg-blue-100 transition-colors"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-4xl font-studio-pro-bold text-black mb-8">Why You'll Love It Here</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {job.benefits?.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="text-4xl mb-4">
                          {['💰', '🏥', '🏠', '📚', '💻'][index % 5]}
                        </div>
                        <p className="text-gray-600 font-studio-pro group-hover:text-black transition-colors">
                          {benefit}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div>
                  <h2 className="text-4xl font-studio-pro-bold text-black mb-8">Meet Your Future Teammates</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {job.team?.map((member, index) => (
                      <motion.div
                        key={member}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center group"
                      >
                        <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-studio-pro-bold group-hover:bg-blue-400 transition-colors">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="font-studio-pro-bold text-black mb-1">{member}</h3>
                        <p className="text-gray-600 font-studio-pro text-sm">
                          {['Engineering Team', 'Design Team', 'Product Team'][index % 3]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="text-center bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-studio-pro-bold text-black mb-4">Join Our Growing Team</h3>
                    <p className="text-gray-600 font-studio-pro mb-6">
                      Work alongside passionate professionals who are dedicated to creating amazing products and fostering a collaborative environment.
                    </p>
                    <div className="flex justify-center gap-8 text-sm text-gray-500">
                      <span>🌍 Global Remote Team</span>
                      <span>🎯 Mission-Driven</span>
                      <span>🚀 Fast-Paced Growth</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-studio-pro-bold text-white mb-6"
              animate={{ 
                backgroundImage: [
                  "linear-gradient(45deg, #ffffff, #93c5fd)",
                  "linear-gradient(45deg, #93c5fd, #ffffff)",
                  "linear-gradient(45deg, #ffffff, #93c5fd)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ 
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Ready to Join Us?
            </motion.h2>
            <p className="text-xl text-gray-300 font-studio-pro mb-12 leading-relaxed">
              Don't miss this opportunity to be part of something extraordinary. 
              Your next career adventure starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleApply}
                disabled={isApplying}
                className="bg-blue-300 text-black font-studio-pro-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                {isApplying ? (
                  <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Apply for This Position
                    <span className="text-xl">🚀</span>
                  </>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/careers-alt')}
                className="border-2 border-white text-white font-studio-pro-bold py-4 px-12 rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Browse Other Positions
              </motion.button>
            </div>

            {/* Contact info */}
            <motion.div 
              className="mt-12 pt-8 border-t border-white/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-400 font-studio-pro mb-4">
                Questions about this role? Get in touch with our HR team.
              </p>
              <div className="flex justify-center gap-8 text-sm text-gray-300">
                <span>📧 hr@ethanecom.com</span>
                <span>📞 (555) 123-4567</span>
                <span>💬 Live chat available</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
