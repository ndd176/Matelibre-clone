'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import ScrollDiscoverIndicator from '../../components/ui/ScrollDiscoverIndicator'

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

export default function ContactAltPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
      phone: ''
    })
    setIsSubmitting(false)
    alert('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ lại với bạn sớm.')
  }

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      label: 'Ghé thăm chúng tôi',
      value: '61/1G Vo Dong 2, Gia Kiem, Thong Nhat, Dong Nai',
      color: 'text-blue-300'
    },
    {
      icon: FaPhoneAlt,
      label: 'Gọi cho chúng tôi',
      value: '+84 967 473 979',
      color: 'text-green-500',
      action: 'tel:+84967473979'
    },
    {
      icon: FaEnvelope,
      label: 'Email cho chúng tôi',
      value: 'hr@ethanecom.com',
      color: 'text-purple-500',
      action: 'mailto:hr@ethanecom.com'
    }
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="w-20 h-20 border-4 border-blue-300 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <motion.section className="relative min-h-screen flex items-center bg-black text-white overflow-hidden">
        {/* Enhanced animated background with multiple layers */}
        <div className="absolute inset-0">
          {/* Large floating orbs */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-blue-300/10 blur-xl"
              style={{
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50, -30, 0],
                y: [0, -40, 60, 0],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.3, 0.6, 0.2, 0.3],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Smaller animated particles */}
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-300 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Geometric shapes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute border border-blue-300/20"
              style={{
                width: `${50 + Math.random() * 100}px`,
                height: `${50 + Math.random() * 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 20 + Math.random() * 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={slideUp} className="mb-12">
              {/* Enhanced title with multiple effects */}
              <motion.div className="relative mb-8">
                <motion.h1 
                  className="text-7xl md:text-9xl font-studio-pro-bold leading-tight relative z-10"
                  animate={{ 
                    backgroundImage: [
                      "linear-gradient(45deg, #ffffff, #93c5fd, #ffffff)",
                      "linear-gradient(90deg, #93c5fd, #ffffff, #93c5fd)",
                      "linear-gradient(135deg, #ffffff, #93c5fd, #ffffff)"
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  style={{ 
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Kết nối với chúng tôi
                </motion.h1>
                
                {/* Glowing backdrop for title */}
                <motion.div 
                  className="absolute inset-0 blur-3xl opacity-30"
                  animate={{
                    background: [
                      "radial-gradient(ellipse at center, #93c5fd 0%, transparent 70%)",
                      "radial-gradient(ellipse at center, #60a5fa 0%, transparent 70%)",
                      "radial-gradient(ellipse at center, #93c5fd 0%, transparent 70%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
              
              <motion.p 
                className="text-2xl md:text-3xl text-gray-300 font-studio-pro max-w-4xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                 <br />Chúng tôi ở đây để lắng nghe, hợp tác, và tạo ra điều gì đó <span className="text-blue-300 font-studio-pro-bold">đặc biệt</span> cùng nhau.
              </motion.p>

              {/* Animated CTA buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group bg-blue-300 text-black font-studio-pro-bold py-4 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Thêm nghề nghiệp
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
                
                <motion.a
                  href="tel:+84967473979"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-studio-pro-bold py-4 px-10 rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/10 flex items-center justify-center gap-3"
                >
                  <FaPhoneAlt />
                  Gọi ngay cho chúng tôi
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Enhanced stats section */}
            <motion.div 
              variants={slideUp}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
            >
              {[
                { number: '500+', label: 'Dự án hoàn thành',   color: 'from-blue-400 to-blue-600' },
                { number: '24/7', label: 'Hỗ trợ có sẵn',  color: 'from-green-400 to-green-600' },
                { number: '100+', label: 'Khách hàng hài lòng',  color: 'from-purple-400 to-purple-600' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  whileHover={{ scale: 1.08, y: -10 }}
                  className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 cursor-pointer overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    initial={false}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-5xl mb-4"
                      animate={{ 
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {/* {stat.icon} */}
                    </motion.div>
                    <div className="text-4xl font-studio-pro-bold text-blue-300 mb-2 group-hover:text-white transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-studio-pro text-lg group-hover:text-white transition-colors">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Floating particles on hover */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

         {/* <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <ScrollDiscoverIndicator />
        </div> */}

        {/* Corner decorative elements */}
        <motion.div 
          className="absolute top-10 right-10 w-20 h-20 border-2 border-blue-300/30 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-16 h-16 border-2 border-blue-300/30"
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </motion.section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-studio-pro-bold text-black mb-6">Start the Conversation</h2>
            <p className="text-xl text-gray-600 font-studio-pro max-w-3xl mx-auto">
              Tell us about your project and we'll get back to you within 24 hours with a personalized response.
            </p>
          </motion.div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-studio-pro-bold mb-2">Full Name *</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent font-studio-pro transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-studio-pro-bold mb-2">Email Address *</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent font-studio-pro transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-studio-pro-bold mb-2">Company</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent font-studio-pro transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-studio-pro-bold mb-2">Phone Number</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent font-studio-pro transition-all"
                      placeholder="+84 967 473 979"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-studio-pro-bold mb-2">Subject *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent font-studio-pro transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-studio-pro-bold mb-2">Message *</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent font-studio-pro resize-none transition-all"
                    placeholder="Tell us about your project, ideas, or questions..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-300 text-white font-studio-pro-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="text-lg" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-studio-pro-bold text-black mb-4">Find Us Here</h3>
                <div className="w-full h-64 rounded-2xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.217393698736!2d107.1718264!3d11.0282733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174f1b31482ccdd%3A0xd88f760c662ca310!2sEthan%20Ecom!5e0!3m2!1sen!2s!4v1689580000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-studio-pro-bold text-black mb-4">Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Saturday', hours: '7:30 AM - 5:00 PM' },
                     { day: 'Sunday', hours: 'Closed' }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-studio-pro text-gray-600">{schedule.day}</span>
                      <span className="font-studio-pro-bold text-black">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-studio-pro-bold text-black mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: FaFacebook, color: 'text-blue-600', link: 'https://www.facebook.com/ethanecom3979' },
                    { icon: FaLinkedin, color: 'text-blue-700', link: '#' },
                    { icon: FaTwitter, color: 'text-blue-400', link: '#' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 ${social.color} bg-gray-50 rounded-full flex items-center justify-center text-xl hover:bg-gray-100 transition-colors`}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
    </div>
  )
}
