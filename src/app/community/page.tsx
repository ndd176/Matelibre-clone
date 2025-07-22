'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Clean community data
const communityStats = [
  { label: 'Thành viên toàn cầu', value: '10,000+', description: 'Những tâm hồn sáng tạo trên toàn thế giới' },
  { label: 'Dự án hoạt động', value: '500+', description: 'Hợp tác đang diễn ra' },
  { label: 'Quốc gia', value: '25+', description: 'Phạm vi quốc tế' },
  { label: 'Năm đổi mới', value: '5+', description: 'Tăng trưởng liên tục' }
]

const communityValues = [
  {
    title: 'Tinh thần hợp tác',
    description: 'Chúng tôi tin vào sức mạnh của sự sáng tạo tập thể và kiến thức chia sẻ.',
    icon: '🤝'
  },
  {
    title: 'Đổi mới là trên hết',
    description: 'Vượt qua ranh giới và khám phá những khả năng mới cùng nhau.',
    icon: '💡'
  },
  {
    title: 'Tăng trưởng bao trùm',
    description: 'Mọi tiếng nói đều quan trọng trong việc xây dựng cộng đồng đa dạng của chúng ta.',
    icon: '🌱'
  },
  {
    title: 'Tác động bền vững',
    description: 'Tạo ra những thay đổi có ý nghĩa kéo dài qua nhiều thế hệ.',
    icon: '🌍'
  }
]

const memberSpotlight = [
  {
    name: 'Sarah Chen',
    role: 'Giám đốc sáng tạo',
    location: 'San Francisco, Mỹ',
    quote: 'Cộng đồng này đã đóng vai trò quan trọng trong hành trình sáng tạo của tôi. Sự hỗ trợ và cơ hội hợp tác là không thể sánh được.',
    achievement: 'Dẫn dắt hơn 15 dự án thành công'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Người ủng hộ bền vững',
    location: 'Barcelona, Tây Ban Nha', 
    quote: 'Being part of this movement means contributing to something bigger than ourselves.',
    achievement: 'Initiated 3 green initiatives'
  },
  {
    name: 'Aisha Patel',
    role: 'Innovation Lead',
    location: 'Mumbai, India',
    quote: 'The diversity of perspectives here constantly challenges and inspires me.',
    achievement: 'Mentored 50+ new members'
  }
]

const navigationItems = [
  { id: 'hero', label: 'Community' },
  { id: 'about', label: 'About' },
  { id: 'values', label: 'Values' },
  { id: 'members', label: 'Members' },
  { id: 'impact', label: 'Impact' },
  { id: 'join', label: 'Join Us' }
]

export default function CommunityPage() {
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()

  // Track scroll position for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'values', 'members', 'impact', 'join']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-studio-pro">
      {/* MINIMALIST NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-studio-pro-bold text-black hover:text-gray-600 transition-colors">
              Ethan
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-studio-pro transition-colors ${
                    activeSection === item.id 
                      ? 'text-black font-studio-pro-bold' 
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link 
              href="/careers"
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-studio-pro hover:bg-gray-800 transition-colors"
            >
              Tham gia cộng đồng
            </Link>
          </div>
        </div>
      </nav>

      {/* MINIMALIST HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Beautiful Plant Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Floating Plant Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-16 h-16 opacity-7"
          animate={{ 
            rotate: [0, 10, -5, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 15 Q30 30, 35 50 Q50 70, 65 50 Q70 30, 50 15 Z" />
            <path d="M50 25 Q40 35, 42 50 Q50 60, 58 50 Q60 35, 50 25 Z" fill="white" fillOpacity="0.3" />
            <line x1="50" y1="15" x2="50" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 right-20 w-12 h-12 opacity-6"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-studio-pro-bold text-black mb-6 leading-tight">
              Our Community
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-studio-pro max-w-3xl mx-auto leading-relaxed">
              Where passionate individuals come together to create, innovate, and build sustainable solutions for tomorrow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/careers"
              className="bg-black text-white px-8 py-4 rounded-full font-studio-pro hover:bg-gray-800 transition-colors duration-300"
            >
              Tham gia cộng đồng của chúng tôi
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="border border-gray-300 text-black px-8 py-4 rounded-full font-studio-pro hover:border-black transition-colors duration-300"
            >
              Tìm hiểu thêm
            </button>
          </motion.div>
        </div>
      </section>

      {/* CLEAN ABOUT SECTION */}
      <section id="about" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-full opacity-4"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-8">
                Xây dựng tương lai, cùng nhau
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our community represents a diverse collective of creators, innovators, and changemakers united by a shared vision of sustainable progress.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that meaningful change happens when passionate individuals collaborate, share knowledge, and support each other's growth.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-studio-pro-bold text-black mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-studio-pro text-black mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CLEAN VALUES SECTION */}
      <section id="values" className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute top-0 left-0 w-2/5 h-full opacity-5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1545152840-c05b2ec3dee7?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
              Giá trị cốt lõi của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những nguyên tắc này định hướng mọi việc chúng tôi làm và hình thành văn hóa cộng đồng của chúng ta.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {communityValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-studio-pro-bold text-black mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLEAN MEMBERS SECTION */}
      <section id="members" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-4"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
              Member Spotlight
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet some of the incredible individuals who make our community thrive.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {memberSpotlight.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="text-xl font-studio-pro-bold text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-400">
                    {member.location}
                  </p>
                </div>
                
                <blockquote className="text-gray-600 mb-4 italic">
                  "{member.quote}"
                </blockquote>
                
                <div className="text-sm font-studio-pro text-black">
                  {member.achievement}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLEAN IMPACT SECTION */}
      <section id="impact" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <motion.div 
          className="absolute top-20 right-20 w-12 h-12 opacity-6"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 15 Q70 30, 65 50 Q50 70, 35 50 Q30 30, 50 15 Z" />
            <circle cx="50" cy="45" r="8" fill="white" fillOpacity="0.4" />
          </svg>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-8">
              Creating Lasting Impact
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Together, we're not just building products—we're cultivating a movement toward sustainable innovation and positive change.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-studio-pro-bold text-black mb-2">50+</div>
                <div className="text-gray-600">Sustainable Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-studio-pro-bold text-black mb-2">100k+</div>
                <div className="text-gray-600">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-studio-pro-bold text-black mb-2">25+</div>
                <div className="text-gray-600">Global Partnerships</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLEAN CTA SECTION */}
      <section id="join" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Final Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-8">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Become part of a community that's shaping the future through collaboration, innovation, and sustainable practices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/careers"
                className="bg-black text-white px-8 py-4 rounded-full font-studio-pro hover:bg-gray-800 transition-colors duration-300"
              >
                Explore Opportunities
              </Link>
              <button 
                onClick={() => scrollToSection('hero')}
                className="border border-gray-300 text-black px-8 py-4 rounded-full font-studio-pro hover:border-black transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}