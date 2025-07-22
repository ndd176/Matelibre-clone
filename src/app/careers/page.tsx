'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { strapiApi } from '../../lib/api/strapi'
import { JobDetail } from '../../types/api/strapi'
import { getImageUrl } from '../../lib/utils/image'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 200
    }
  }
}

const floatingVariants = {
  float: {
    y: [-20, 20, -20],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

type JobCard = {
  id: string | number
  job_title: string
  short_description: string
  avatar_image: string
  department?: string
  salary_range?: string
  years_experience?: number
  level?: string
  requirements?: string
}

// Level colors
const levelColors = {
  'Nhân viên': 'bg-green-300',
  'Quản lý': 'bg-purple-300',
  'Default': 'bg-blue-300'
}

function JobCard({
  job,
  index,
}: {
  job: JobCard
  index: number
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const level = job.level || 'Default'
  const colorClass = levelColors[level as keyof typeof levelColors] || levelColors.Default

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      variants={itemVariants}
      className="relative"
    >
      <motion.div
        className="group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-500 group-hover:shadow-xl group-hover:border-blue-300/30">
          {/* Header with department badge */}
          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden">
              <Image
                src={job.avatar_image}
                alt={job.job_title}
                width={400}
                height={300}
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                priority={index < 6}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            
            {/* Floating level badge */}
            <motion.div
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-studio-pro-bold text-white ${colorClass}`}
              whileHover={{ scale: 1.1 }}
              variants={floatingVariants}
              animate="float"
            >
              {level}
            </motion.div>

            {/* Floating expand button */}
            <motion.div
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-blue-300 text-lg">
                {isExpanded ? '−' : '+'}
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <motion.h3 
                  className="text-xl font-studio-pro-bold text-black mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {job.job_title}
                </motion.h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500 font-studio-pro">
                  {job.salary_range && (
                    <span className="flex items-center gap-1">
                       💶  {job.salary_range} triệu +
                    </span>
                  )}
                    {typeof job.years_experience === 'number' && (
                    <span className="flex items-center gap-1">
                      {job.years_experience === 0
                      ? 'Không yêu cầu kinh nghiệm'
                      : <>📅 {job.years_experience} năm kinh nghiệm</>
                      }
                    </span>
                    )}
                </div>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed font-studio-pro mb-4 line-clamp-2">
              {job.short_description}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Link href={`/careers/${job.id}`} className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-300 text-white font-studio-pro-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-blue-300"
                >
                  Apply Now
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setIsExpanded(!isExpanded)
                }}
                className="w-12 h-12 border-2 border-gray-200 rounded-full flex items-center justify-center hover:border-blue-300 transition-colors duration-300"
              >
                <motion.span
                  className="text-gray-500 text-lg"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-100 bg-gray-50/50"
              >
                <div className="p-6">
                  <h4 className="font-studio-pro-bold text-black mb-3">Yêu cầu công việc:</h4>
                  <div className="text-gray-600 font-studio-pro leading-relaxed">
                    {job.requirements ? (
                      <div dangerouslySetInnerHTML={{ __html: job.requirements.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 mt-1">•</span>
                          Bằng cử nhân trong lĩnh vực liên quan
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 mt-1">•</span>
                          Từ 2 năm kinh nghiệm trở lên
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 mt-1">•</span>
                          Kỹ năng giao tiếp tốt
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-300 mt-1">•</span>
                          Tinh thần làm việc nhóm và tư duy phát triển
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Stats Counter Component
function StatsCounter({ target, label, duration = 2 }: { target: number; label: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          const increment = target / (duration * 60) // 60 FPS
          const timer = setInterval(() => {
            setCount(prev => {
              if (prev >= target) {
                clearInterval(timer)
                return target
              }
              return prev + increment
            })
          }, 1000 / 60)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasStarted])

  return (
    <div ref={ref}>
      <motion.div
        className="text-4xl md:text-5xl font-studio-pro-bold text-blue-300 mb-2"
        whileHover={{ scale: 1.1 }}
      >
        {Math.floor(count)}+
      </motion.div>
      <p className="text-gray-600 font-studio-pro text-sm uppercase tracking-wide">
        {label}
      </p>
    </div>
  )
}

export default function CareersAltPage() {
  const [jobs, setJobs] = useState<JobCard[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await strapiApi.fetchJobDetails()
        const mapped: JobCard[] = response.data.map((jobDetail: JobDetail, index: number) => ({
          id: jobDetail.id,
          job_title: jobDetail.job_title || 'No Title',
          short_description: jobDetail.overview || 'Tham gia đội ngũ năng động của chúng tôi và tạo ra sự khác biệt.',
          avatar_image: getImageUrl(jobDetail.job_image) || '/images/position.jpg',
          department: jobDetail.job?.job_title || 'Khác',
          salary_range: jobDetail.salary_range,
          years_experience: jobDetail.years_experience,
          level: jobDetail.level || 'Nhân viên',
          requirements: jobDetail.requirements
        }))
        setJobs(mapped)
      } catch (error) {
        console.error('Failed to load jobs from API:', error)
        // Mock data for demo
        setJobs([
          {
            id: 1,
            job_title: 'Senior Frontend Developer',
            short_description: 'Xây dựng giao diện người dùng tuyệt vời với React và Next.js',
            avatar_image: '/images/position.jpg',
            department: 'Engineering',
            salary_range: '25-35 triệu VNĐ',
            years_experience: 3,
            level: 'Nhân viên',
            requirements: 'Có kinh nghiệm 3+ năm với React/Next.js\nThành thạo TypeScript và JavaScript\nKiến thức về responsive design\nKỹ năng làm việc nhóm tốt'
          },
          {
            id: 2,
            job_title: 'UX/UI Designer',
            short_description: 'Thiết kế trải nghiệm người dùng đẹp và trực quan',
            avatar_image: '/images/position.jpg',
            department: 'Design',
            salary_range: '35-50 triệu VNĐ',
            years_experience: 5,
            level: 'Quản lý',
            requirements: 'Bằng cử nhân ngành thiết kế hoặc liên quan\nThành thạo Figma, Sketch, Adobe Creative Suite\nKinh nghiệm 5+ năm trong UX/UI design\nKỹ năng nghiên cứu người dùng\nKhả năng dẫn dắt đội nhóm'
          },
          {
            id: 3,
            job_title: 'Marketing Specialist',
            short_description: 'Thúc đẩy tăng trưởng thông qua các chiến lược marketing sáng tạo',
            avatar_image: '/images/position.jpg',
            department: 'Marketing',
            salary_range: '18-25 triệu VNĐ',
            years_experience: 2,
            level: 'Nhân viên',
            requirements: 'Kinh nghiệm 2+ năm trong digital marketing\nThành thạo Google Analytics, Facebook Ads\nKỹ năng viết content tốt\nHiểu biết về SEO/SEM'
          },
          {
            id: 4,
            job_title: 'Sales Manager',
            short_description: 'Dẫn dắt đội ngũ bán hàng đạt những thành tựu mới',
            avatar_image: '/images/position.jpg',
            department: 'Sales',
            salary_range: '40-60 triệu VNĐ',
            years_experience: 5,
            level: 'Quản lý',
            requirements: 'Kinh nghiệm 5+ năm trong sales\nKỹ năng lãnh đạo và quản lý team\nKhả năng đàm phán và thuyết phục\nKiến thức về CRM systems'
          },
          {
            id: 5,
            job_title: 'HR Generalist',
            short_description: 'Định hình văn hóa công ty và hỗ trợ đội ngũ',
            avatar_image: '/images/position.jpg',
            department: 'HR',
            salary_range: '15-20 triệu VNĐ',
            years_experience: 2,
            level: 'Nhân viên',
            requirements: 'Bằng cử nhân nhân sự hoặc liên quan\nKinh nghiệm 2+ năm trong HR\nKỹ năng giao tiếp và tư vấn\nHiểu biết về luật lao động'
          },
          {
            id: 6,
            job_title: 'Backend Developer',
            short_description: 'Xây dựng API có thể mở rộng và kiến trúc server mạnh mẽ',
            avatar_image: '/images/position.jpg',
            department: 'Engineering',
            salary_range: '30-40 triệu VNĐ',
            years_experience: 3,
            level: 'Nhân viên',
            requirements: 'Kinh nghiệm 3+ năm với Node.js hoặc Python\nThành thạo database (SQL/NoSQL)\nKiến thức về cloud services (AWS/GCP)\nKỹ năng debug và optimize performance'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const levels = ['All', 'Nhân viên', 'Quản lý']
  
  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'All' || job.level === filter
    const matchesSearch = job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.short_description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-blue-300/20"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 10}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center z-10 px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-studio-pro-bold leading-tight mb-6"
              style={{ color: 'var(--color-blue2)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                Tuyển dụng
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-blue-300 inline-block"
              >
                Hub
              </motion.span>
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 mx-auto rounded-full bg-blue-300"
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 font-studio-pro max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Khám phá những cơ hội thú vị để phát triển sự nghiệp cùng chúng tôi. 
            Tham gia một đội ngũ đánh giá cao sự đổi mới, sáng tạo và tạo tác động thực sự.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('jobs-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
              className="bg-blue-300 text-white font-studio-pro-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              Khám phá vị trí việc làm
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-blue-300 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <StatsCounter target={50} label="Thành viên" />
            <StatsCounter target={25} label="Vị trí tuyển dụng" />
            <StatsCounter target={5} label="Phòng ban" />
            <StatsCounter target={100} label="Câu chuyện thành công" />
          </motion.div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section id="jobs-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
              Tìm vị trí hoàn hảo của bạn
            </h2>
            <div className="w-24 h-px bg-blue-300 mx-auto mb-8"></div>
          </motion.div>

          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto"
          >
            {/* Search Bar */}
            <div className="flex-1">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Tìm kiếm vị trí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 border border-gray-200 rounded-full focus:outline-none focus:border-blue-300 font-studio-pro transition-colors duration-300"
              />
            </div>

            {/* Level Filter */}
            <div className="flex gap-2 flex-wrap justify-center md:justify-start">
              {levels.map((level) => (
                <motion.button
                  key={level}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(level || 'All')}
                  className={`px-6 py-2 rounded-full font-studio-pro-bold transition-all duration-300 ${
                    filter === level
                      ? 'bg-blue-300 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div 
                className="w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-600 font-studio-pro text-lg">
                Đang tải những cơ hội tuyệt vời...
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                className="text-6xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔍
              </motion.div>
              <h3 className="text-2xl font-studio-pro-bold text-black mb-4">
                Không có vị trí nào phù hợp
              </h3>
              <p className="text-gray-600 font-studio-pro mb-6">
                Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFilter('All')
                  setSearchTerm('')
                }}
                className="bg-blue-300 text-white font-studio-pro-bold py-3 px-8 rounded-full"
              >
                Xóa bộ lọc
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-white mb-6">
              Không tìm thấy vị trí phù hợp?
            </h2>
            <p className="text-xl text-gray-300 font-studio-pro mb-8 leading-relaxed">
              Chúng tôi luôn tìm kiếm những cá nhân tài năng để gia nhập đội ngũ. 
              Gửi CV của bạn và hãy cùng khám phá cách chúng ta có thể hợp tác.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#93c5fd' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = 'mailto:hr@ethanecom.com'}
              className="bg-blue-300 text-black font-studio-pro-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Liên hệ với chúng tôi
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
