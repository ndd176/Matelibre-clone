'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { jobDetailsApi, apiHelpers } from '../../../lib/api/jobs'
import CVSubmissionForm from '../../../components/CVSubmissionForm'

interface JobDetail {
  id: string
  job_title: string
  salary_range?: string
  overview?: string
  requirements?: string
  benefits?: string
  job_image?: string
  years_experience?: number
  level?: string
  short_description?: string
  avatar_image?: string
  sub_avatar?: string
  department?: string
  location?: string
  type?: string
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

// Helper function to render beautiful numbered content
const renderNumberedContent = (text: string) => {
  if (!text || text.trim() === '') return <span>Nội dung sẽ được cập nhật sớm.</span>
  
  // Split by newlines and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim() !== '')
  
  if (lines.length === 0) return <span>Nội dung sẽ được cập nhật sớm.</span>
  
  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        const trimmedLine = line.trim()
        if (trimmedLine === '') return null
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex items-start gap-4 group hover:bg-blue-50/50 rounded-xl p-4 transition-all duration-300"
          >
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center font-plus-jakarta-sans font-bold text-sm shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              {index + 1}
            </div>
            <div className="flex-1 text-gray-700 font-studio-pro leading-relaxed">
              {trimmedLine}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function CareersDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const [job, setJob] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [mounted, setMounted] = useState(false)
  
  // CV Form states - giữ nguyên logic cũ
  const [isCVFormOpen, setIsCVFormOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState('')
  
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Sử dụng useLayoutEffect để scroll to top ngay khi component được render
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function loadJob() {
      try {
        
        // Tìm job detail có job.id = jobId (relation)
        const detailResponse = await jobDetailsApi.fetchJobDetails()
        
        // Tìm job detail mà có relation job.id = jobId
        const foundJobDetail = detailResponse.data.find((detail: any) => {
          // Kiểm tra nếu có relation job và job.id khớp với jobId
          return detail.job && detail.job.id && detail.job.id.toString() === jobId
        })
        
        if (foundJobDetail) {
          
          // Lấy thông tin từ job detail và job relation
          const relatedJob = foundJobDetail.job
          
          // Format salary range với helper
          const formattedSalary = apiHelpers.formatSalary(foundJobDetail.salary_range)
          
          // Format years experience với helper  
          const experienceText = apiHelpers.formatExperience(foundJobDetail.years_experience)
          
          // Handle image URL với helper
          const getImageSrc = (imageField: any) => {
            return apiHelpers.getImageUrl(imageField)
          }
          

          
          setJob({
            id: jobId, // Giữ nguyên jobId từ URL
            job_title: foundJobDetail.job_title || relatedJob?.job_title || '',
            salary_range: formattedSalary,
            // Lấy thông tin chi tiết từ job detail
            overview: foundJobDetail.overview || 'Thông tin tổng quan về công việc sẽ được cập nhật sớm.',
            requirements: foundJobDetail.requirements || 'Yêu cầu công việc sẽ được cập nhật sớm.',
            benefits: foundJobDetail.benefits || 'Thông tin quyền lợi sẽ được cập nhật sớm.',
            job_image: getImageSrc(foundJobDetail.job_image || relatedJob?.avatar_image),
            years_experience: foundJobDetail.years_experience || 0,
            level: apiHelpers.formatLevel(foundJobDetail.level),
            // Lấy thông tin cơ bản từ related job
            short_description: relatedJob?.short_description || '',
            avatar_image: getImageSrc(relatedJob?.avatar_image),
            department: foundJobDetail.level || 'Engineering',
            location: 'Gia Kiệm, Đồng Nai',
            type: 'Toàn thời gian',
            experience: experienceText,
             team: ['Đồng nghiệp A', 'Đồng nghiệp B', 'Đồng nghiệp C']
          })
        } else {
          // Fallback: tìm trực tiếp job detail với id = jobId
          const directJobDetail = detailResponse.data.find((detail: any) => detail.id.toString() === jobId)
          
          if (directJobDetail) {
            
            const formattedSalary = apiHelpers.formatSalary(directJobDetail.salary_range)
            const experienceText = apiHelpers.formatExperience(directJobDetail.years_experience)
            const getImageSrc = (imageField: any) => apiHelpers.getImageUrl(imageField)
            
            setJob({
              id: directJobDetail.id.toString(),
              job_title: directJobDetail.job_title || '',
              salary_range: formattedSalary,
              overview: directJobDetail.overview || 'Thông tin tổng quan về công việc sẽ được cập nhật sớm.',
              requirements: directJobDetail.requirements || 'Yêu cầu công việc sẽ được cập nhật sớm.',
              benefits: directJobDetail.benefits || 'Thông tin quyền lợi sẽ được cập nhật sớm.',
              job_image: getImageSrc(directJobDetail.job_image),
              years_experience: directJobDetail.years_experience || 0,
              level: apiHelpers.formatLevel(directJobDetail.level),
              short_description: '',
              avatar_image: getImageSrc(directJobDetail.job_image),
              department: directJobDetail.level || 'Engineering',
              location: 'Gia Kiệm, Đồng Nai',
              type: 'Toàn thời gian',
              experience: experienceText,
               team: ['Đồng nghiệp A', 'Đồng nghiệp B', 'Đồng nghiệp C']
            })
          } else {
            setJob(null)
          }
        }
      } catch (error) {
        console.error('Failed to load job detail:', error)
        setJob(null)
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      loadJob()
    }
  }, [jobId])

  // Giữ nguyên logic apply cũ với CV form
  const handleApplyClick = (position: string) => {
    setSelectedPosition(position || job?.job_title || 'Position')
    setIsCVFormOpen(true)
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
            Đang tải thông tin công việc...
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
          <h1 className="text-4xl font-studio-pro-bold text-black mb-4">Vị trí không tồn tại</h1>
          <p className="text-gray-600 font-studio-pro mb-8">Công việc này có thể đã được tuyển hoặc đã bị xóa.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/careers')}
            className="bg-blue-300 text-white px-8 py-4 rounded-full font-studio-pro-bold shadow-lg"
          >
            Xem tất cả vị trí
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: '📋' },
    { id: 'requirements', label: 'Yêu cầu', icon: '✅' },
    { id: 'benefits', label: 'Quyền lợi', icon: '🎁' },
    { id: 'level', label: 'Cấp độ', icon: '🏢' },
    { id: 'team', label: 'Đội ngũ', icon: '👥' }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Floating Back Button */}
       

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
                  <span className="bg-blue-300 text-black px-4 py-2 rounded-full text-sm font-plus-jakarta-sans font-bold">
                    {job.department}
                  </span>
                  <span className="text-blue-300 font-studio-pro">
                    📍 {job.location}
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-plus-jakarta-sans font-bold leading-tight mb-6">
                  {job.job_title}
                </h1>
                
                <p className="text-xl text-gray-300 font-studio-pro leading-relaxed mb-8">
                  {job.short_description}
                </p>

                {/* Key details */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-blue-300 text-2xl mb-2">💰</div>
                    <div className="text-sm text-gray-400 font-plus-jakarta-sans">Lương</div>
                    <div className="text-white font-studio-pro-bold">
                      {job.salary_range || 'Thỏa thuận'}
                    </div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="text-blue-300 text-2xl mb-2">⏱️</div>
                    <div className="text-sm text-gray-400 font-plus-jakarta-sans">Kinh nghiệm</div>
                    <div className="text-white font-plus-jakarta-sans font-bold">{job.experience}</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={slideUp} className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#93c5fd' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleApplyClick(job.job_title)}
                  className="bg-blue-300 text-black font-plus-jakarta-sans font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  Ứng tuyển ngay
                  <span className="text-xl">🚀</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('job-details')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    })
                  }}
                  className="border-2 border-white text-white font-plus-jakarta-sans font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  Tìm hiểu thêm
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
                <div className="aspect-square relative rounded-2xl overflow-hidden items-end mb-6">
                  <Image
                    src={job.job_image || job.avatar_image || '/images/position.jpg'}
                    alt={job.job_title}
                    width={400}
                    height={400}
                    className="object-cover object-top w-full h-full"
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
                      className="bg-blue-300/20 text-blue-300 px-3 py-1 rounded-full text-sm font-plus-jakarta-sans font-bold border border-blue-300/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
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
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-plus-jakarta-sans font-bold transition-all duration-300 ${
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
                  <h2 className="text-4xl font-plus-jakarta-sans font-bold text-black mb-8">Tổng quan công việc</h2>
                  <div className="max-w-none">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl p-8">
                      {renderNumberedContent(job.overview || 'Thông tin tổng quan về công việc sẽ được cập nhật sớm.')}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div>
                  <h2 className="text-4xl font-plus-jakarta-sans font-bold text-black mb-8">Yêu cầu công việc</h2>
                  <div className="max-w-none">
                    <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-3xl p-8">
                      {renderNumberedContent(job.requirements || 'Yêu cầu công việc sẽ được cập nhật sớm.')}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'benefits' && (
                <div>
                  <h2 className="text-4xl font-plus-jakarta-sans font-bold text-black mb-8">Quyền lợi & Phúc lợi</h2>
                  <div className="max-w-none">
                    <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-3xl p-8">
                      {renderNumberedContent(job.benefits || 'Thông tin quyền lợi sẽ được cập nhật sớm.')}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'level' && (
                <div>
                  <h2 className="text-4xl font-plus-jakarta-sans font-bold text-black mb-8">Cấp độ công việc</h2>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
                    <div className="w-20 h-20 bg-blue-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-3xl">
                        {job.level === 'Quản lý' ? '👨‍💼' : '👨‍💻'}
                      </span>
                    </div>
                    <h3 className="text-3xl font-plus-jakarta-sans font-bold text-black mb-4">
                      {job.level || 'Nhân viên'}
                    </h3>
                    <p className="text-gray-600 font-studio-pro text-lg">
                      {job.level === 'Quản lý' 
                        ? 'Vị trí quản lý với trách nhiệm dẫn dắt đội ngũ và chiến lược phát triển.'
                        : 'Vị trí nhân viên thực hiện công việc chuyên môn và phát triển kỹ năng.'
                      }
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'team' && (
                <div>
                  <h2 className="text-4xl font-plus-jakarta-sans font-bold text-black mb-8">Gặp gỡ đồng nghiệp tương lai</h2>
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
                        <div className="w-24 h-24 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-plus-jakarta-sans font-bold group-hover:bg-blue-400 transition-colors">
                          {member.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h3 className="font-plus-jakarta-sans font-bold text-black mb-1">{member}</h3>
                        <p className="text-gray-600 font-studio-pro text-sm">
                          {['Đội Kỹ thuật', 'Đội Thiết kế', 'Đội Sản phẩm'][index % 3]}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="text-center bg-gray-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-plus-jakarta-sans font-bold text-black mb-4">Tham gia đội ngũ đang phát triển</h3>
                    <p className="text-gray-600 font-studio-pro mb-6">
                      Làm việc cùng các chuyên gia đam mê, luôn tận tâm tạo ra những sản phẩm tuyệt vời và xây dựng môi trường hợp tác.
                    </p>
                    <div className="flex justify-center gap-8 text-sm text-gray-500">
                      <span>🌍 Đội ngũ toàn cầu</span>
                      <span>🎯 Theo sứ mệnh</span>
                      <span>🚀 Phát triển nhanh chóng</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Similar Positions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-plus-jakarta-sans font-bold text-black mb-6">
              Các vị trí tương tự
            </h2>
            <p className="text-xl text-gray-600 font-studio-pro max-w-3xl mx-auto">
              Khám phá những cơ hội nghề nghiệp khác có thể phù hợp với bạn
            </p>
          </motion.div>

          <SimilarPositions currentJobId={job.id} currentLevel={job.level} />
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
              className="text-5xl md:text-6xl font-plus-jakarta-sans font-bold text-white mb-6"
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
              Sẵn sàng tham gia?
            </motion.h2>
            <p className="text-xl text-gray-300 font-studio-pro mb-12 leading-relaxed">
              Đừng bỏ lỡ cơ hội trở thành một phần của điều gì đó phi thường. 
              Cuộc phiêu lưu nghề nghiệp tiếp theo của bạn bắt đầu từ đây.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleApplyClick(job.job_title)}
                className="bg-blue-300 text-black font-plus-jakarta-sans font-bold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                Ứng tuyển vị trí này
                <span className="text-xl">🚀</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/careers')}
                className="border-2 border-white text-white font-plus-jakarta-sans font-bold py-4 px-12 rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                Xem vị trí khác
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
                Có câu hỏi về vị trí này? Liên hệ với đội ngũ HR của chúng tôi.
              </p>
              <div className="flex justify-center gap-8 text-sm text-gray-300">
                <span>📧 hr@ethanecom.com</span>
                <span>📞 (555) 123-4567</span>
                <span>💬 Hỗ trợ trực tuyến</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CV Form - giữ nguyên chức năng cũ */}
      <CVSubmissionForm
        isOpen={isCVFormOpen}
        position={selectedPosition}
        onClose={() => setIsCVFormOpen(false)}
      />
    </div>
  )
}

// Similar Positions Component
function SimilarPositions({ currentJobId, currentLevel }: { currentJobId: string, currentLevel?: string }) {
  const [similarJobs, setSimilarJobs] = useState<JobDetail[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadSimilarJobs() {
      try {
        const response = await jobDetailsApi.fetchJobDetails()
        
        // Filter jobs by same level, excluding current job
        const filtered = response.data
          .filter((detail: any) => {
            // Exclude current job
            if (detail.id.toString() === currentJobId || detail.job?.id?.toString() === currentJobId) {
              return false
            }
            
            // Include jobs with same level or all if no level specified
            if (currentLevel && detail.level) {
              return apiHelpers.formatLevel(detail.level) === currentLevel
            }
            
            return true
          })
          .slice(0, 3) // Limit to 3 positions
          .map((detail: any) => ({
            id: detail.job?.id?.toString() || detail.id.toString(),
            job_title: detail.job_title || detail.job?.job_title || '',
            salary_range: apiHelpers.formatSalary(detail.salary_range),
            level: apiHelpers.formatLevel(detail.level),
            years_experience: detail.years_experience || 0,
            experience: apiHelpers.formatExperience(detail.years_experience),
            short_description: detail.job?.short_description || 'Cơ hội nghề nghiệp tuyệt vời đang chờ đợi bạn.',
            job_image: apiHelpers.getImageUrl(detail.job_image || detail.job?.avatar_image),
            department: detail.level || 'Engineering',
            location: 'Gia Kiệm, Đồng Nai',
            type: 'Toàn thời gian'
          }))

        setSimilarJobs(filtered)
      } catch (error) {
        console.error('Failed to load similar jobs:', error)
        setSimilarJobs([])
      } finally {
        setLoading(false)
      }
    }

    loadSimilarJobs()
  }, [currentJobId, currentLevel])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-3xl p-8 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-2xl mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (similarJobs.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl mb-4"
        >
          🔍
        </motion.div>
        <p className="text-gray-600 font-studio-pro">
          Hiện tại không có vị trí tương tự nào khác
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {similarJobs.map((similarJob, index) => (
        <motion.div
          key={similarJob.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -10, scale: 1.02 }}
          onClick={() => router.push(`/careers/${similarJob.id}`)}
          className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 group"
        >
          {/* Job Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="bg-blue-300 text-black px-3 py-1 rounded-full text-sm font-plus-jakarta-sans font-bold">
                {similarJob.level}
              </span>
              <span className="text-gray-400 text-sm font-studio-pro">
                📍 {similarJob.location}
              </span>
            </div>
            
            <h3 className="text-xl font-plus-jakarta-sans font-bold text-black mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {similarJob.job_title}
            </h3>
            
            <p className="text-gray-600 font-studio-pro text-sm mb-4 line-clamp-2">
              {similarJob.short_description}
            </p>
            
            {/* Job Details */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="font-plus-jakarta-sans font-bold mb-1 text-black">Lương</div>
                <div className="font-plus-jakarta-sans font-bold text-sm text-gray-500">
                  {similarJob.salary_range || 'Thỏa thuận'}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="font-plus-jakarta-sans font-bold mb-1 text-black">Kinh nghiệm</div>
                <div className="font-plus-jakarta-sans font-bold text-sm text-gray-500">
                  {similarJob.experience}
                </div>
              </div>
            </div>
            
            {/* Apply Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-plus-jakarta-sans font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation()
                router.push(`/careers/${similarJob.id}`)
              }}
            >
              Xem chi tiết
              <span className="text-lg">→</span>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}