'use client'

import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaPlay, FaUsers, FaRocket, FaHeart, FaStar, FaQuoteLeft } from 'react-icons/fa'
import ScrollDiscoverIndicator from '../../components/ui/ScrollDiscoverIndicator'

// Advanced Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
      duration: 0.8
    }
  }
}

const itemVariants = {
  hidden: { y: 80, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 200,
      duration: 0.8
    }
  }
}

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

const pulseVariants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-blue-300/20 rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [-50, -100, -50],
            x: [-20, 20, -20],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Interactive Hero Component
const InteractiveHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      })
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -300])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <motion.section
      ref={heroRef}
      style={{ y, opacity }}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />

        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-xl"
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${10 + i * 12}%`,
              top: `${15 + i * 8}%`,
              transform: `translate(${mousePosition.x * (i + 1) * 10}px, ${mousePosition.y * (i + 1) * 5}px)`
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        <FloatingParticles />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Title with Advanced Animation */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1 
              className="text-7xl md:text-9xl lg:text-[12rem] font-studio-pro-bold leading-none mb-6"
              animate={{
                backgroundImage: [
                  "linear-gradient(45deg, #ffffff, #3b82f6, #8b5cf6, #ffffff)",
                  "linear-gradient(90deg, #3b82f6, #ffffff, #8b5cf6, #3b82f6)",
                  "linear-gradient(135deg, #8b5cf6, #3b82f6, #ffffff, #8b5cf6)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: `blur(${Math.abs(mousePosition.x - 0.5) * 2}px)`
              }}
            >
              ETHAN
            </motion.h1>
            
            {/* Glowing underline */}
            <motion.div 
              className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "300px" }}
              transition={{ duration: 2, delay: 0.5 }}
              style={{ 
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.8)",
                filter: "blur(1px)"
              }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.p 
              className="text-2xl md:text-4xl text-gray-300 font-studio-pro max-w-4xl mx-auto leading-relaxed"
              style={{ 
                transform: `translateX(${(mousePosition.x - 0.5) * 50}px)`
              }}
            >
              Crafting digital experiences that{" "}
              <motion.span 
                className="text-blue-400 font-studio-pro-bold"
                animate={{ color: ["#60a5fa", "#a855f7", "#60a5fa"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                inspire
              </motion.span>
              ,{" "}
              <motion.span 
                className="text-purple-400 font-studio-pro-bold"
                animate={{ color: ["#a855f7", "#60a5fa", "#a855f7"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                innovate
              </motion.span>
              , and{" "}
              <motion.span 
                className="text-blue-300 font-studio-pro-bold"
                animate={{ color: ["#93c5fd", "#a855f7", "#93c5fd"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                transform
              </motion.span>{" "}
              the future
            </motion.p>
          </motion.div>

          {/* Interactive CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <motion.button
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 50px rgba(59, 130, 246, 0.8)",
                backgroundColor: "#3b82f6"
              }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-black font-studio-pro-bold py-5 px-10 rounded-full text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Journey
                <motion.span
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.span>
              </span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 opacity-0 group-hover:opacity-20"
                animate={{ 
                  x: ['-100%', '100%'],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: "loop" 
                }}
              />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group border-2 border-white text-white font-studio-pro-bold py-5 px-10 rounded-full text-xl hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm bg-white/10 flex items-center justify-center gap-3"
            >
              <FaPlay className="group-hover:scale-125 transition-transform" />
              Watch Our Story
            </motion.button>
          </motion.div>

          {/* Scroll Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "1000+", label: "Projects" },
              { number: "50+", label: "Clients" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1, y: -10 }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-studio-pro-bold text-blue-300 mb-2"
                  animate={{ 
                    textShadow: [
                      "0 0 10px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.8)",
                      "0 0 10px rgba(59, 130, 246, 0.8)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 font-studio-pro uppercase text-sm tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <ScrollDiscoverIndicator />
      </div>
    </motion.section>
  )
}

// Services Section with 3D Cards
const ServicesSection = () => {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites that deliver exceptional user experiences",
      icon: "🚀",
      color: "from-blue-500 to-blue-700",
      image: "/images/web-dev.jpg"
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications",
      icon: "📱",
      color: "from-purple-500 to-purple-700",
      image: "/images/mobile-app.jpg"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that users love",
      icon: "🎨",
      color: "from-pink-500 to-pink-700",
      image: "/images/ui-design.jpg"
    },
    {
      title: "E-commerce",
      description: "Powerful online stores that drive sales and growth",
      icon: "🛒",
      color: "from-green-500 to-green-700",
      image: "/images/ecommerce.jpg"
    }
  ]

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-studio-pro-bold text-black mb-6"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, #000000, #3b82f6)",
                "linear-gradient(90deg, #3b82f6, #000000)",
                "linear-gradient(135deg, #000000, #3b82f6)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Our Services
          </motion.h2>
          <div className="w-32 h-1 bg-blue-300 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 font-studio-pro max-w-3xl mx-auto">
            We craft digital solutions that push boundaries and exceed expectations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 100, rotateY: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -20, 
                rotateX: 10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Gradient Background */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                initial={false}
              />
              
              {/* Animated Icon */}
              <motion.div 
                className="text-6xl mb-6"
                variants={floatVariants}
                animate="animate"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                {service.icon}
              </motion.div>
              
              <h3 className="text-2xl font-studio-pro-bold text-black mb-4 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 font-studio-pro leading-relaxed mb-6 group-hover:text-gray-800 transition-colors">
                {service.description}
              </p>

              {/* Learn More Button */}
              <motion.div
                className="flex items-center text-blue-500 font-studio-pro-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ x: 10 }}
              >
                Learn More 
                <FaArrowRight className="ml-2" />
              </motion.div>

              {/* Floating Particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: `${20 + i * 20}%`
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Showcase with Advanced Animations
const PortfolioShowcase = () => {
  const [activeProject, setActiveProject] = useState(0)
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern, scalable e-commerce solution with advanced features",
      image: "/images/project1.jpg",
      tech: ["React", "Node.js", "MongoDB"],
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Mobile Banking App",
      description: "Secure and intuitive mobile banking experience",
      image: "/images/project2.jpg",
      tech: ["React Native", "Firebase", "AI/ML"],
      color: "from-green-500 to-teal-600"
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data visualization",
      image: "/images/project3.jpg",
      tech: ["Next.js", "TypeScript", "D3.js"],
      color: "from-purple-500 to-pink-600"
    }
  ]

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-studio-pro-bold mb-6">
            <motion.span
              animate={{
                backgroundImage: [
                  "linear-gradient(45deg, #ffffff, #3b82f6, #8b5cf6)",
                  "linear-gradient(90deg, #8b5cf6, #ffffff, #3b82f6)",
                  "linear-gradient(135deg, #3b82f6, #8b5cf6, #ffffff)"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Featured Work
            </motion.span>
          </h2>
          <div className="w-32 h-1 bg-blue-300 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Project Navigation */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-500 ${
                  activeProject === index 
                    ? 'border-blue-300 bg-white/5' 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02, x: 10 }}
                onClick={() => setActiveProject(index)}
              >
                <h3 className="text-2xl font-studio-pro-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 font-studio-pro mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-studio-pro-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Display */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].color} opacity-20`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <motion.div
                  className="text-8xl"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  🚀
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonials with Floating Cards
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      content: "ETHAN transformed our vision into reality. Their attention to detail and innovative approach exceeded all expectations.",
      avatar: "/images/avatar1.jpg",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateCorp",
      content: "Working with ETHAN was a game-changer. They delivered a solution that not only met our needs but anticipated future requirements.",
      avatar: "/images/avatar2.jpg",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Founder, DesignStudio",
      content: "The team's creativity and technical expertise are unmatched. They brought our complex ideas to life beautifully.",
      avatar: "/images/avatar3.jpg",
      rating: 5
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-studio-pro-bold text-black mb-6">
            What Clients Say
          </h2>
          <div className="w-32 h-1 bg-blue-300 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring"
              }}
              whileHover={{ 
                y: -20,
                rotateY: 10,
                scale: 1.05
              }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <motion.div
                className="absolute top-6 right-6 text-4xl text-blue-300/20"
                variants={floatVariants}
                animate="animate"
              >
                <FaQuoteLeft />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-yellow-400 text-xl"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <FaStar />
                  </motion.span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 font-studio-pro leading-relaxed mb-8 text-lg">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-white font-studio-pro-bold text-xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  {testimonial.name[0]}
                </motion.div>
                <div>
                  <div className="font-studio-pro-bold text-black">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm font-studio-pro">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20"
                  style={{
                    left: `${20 + i * 30}%`,
                    bottom: `${20 + i * 10}%`
                  }}
                  animate={{
                    y: [-5, 5, -5],
                    opacity: [0.2, 0.8, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA with Spectacular Effects
const FinalCTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  return (
    <section 
      className="py-32 bg-black text-white relative overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"
            style={{
              width: `${50 + i * 20}px`,
              height: `${50 + i * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(${mousePosition.x * (i + 1) * 5}px, ${mousePosition.y * (i + 1) * 3}px)`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-7xl md:text-8xl font-studio-pro-bold mb-8"
            animate={{
              backgroundImage: [
                "linear-gradient(45deg, #ffffff, #3b82f6, #8b5cf6, #ec4899)",
                "linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ffffff)",
                "linear-gradient(135deg, #3b82f6, #ffffff, #ec4899, #8b5cf6)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Ready to Build?
          </motion.h2>

          <motion.p 
            className="text-2xl text-gray-300 font-studio-pro mb-12 leading-relaxed"
            style={{
              transform: `translateY(${mousePosition.y * 20}px)`
            }}
          >
            Let's create something extraordinary together. Your vision, our expertise.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/contact-alt">
              <motion.button
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 100px rgba(59, 130, 246, 0.8)"
                }}
                whileTap={{ scale: 0.95 }}
                className="group bg-blue-500 hover:bg-blue-400 text-white font-studio-pro-bold py-6 px-12 rounded-full text-xl shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project
                  <motion.span
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FaRocket />
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </Link>

            <Link href="/careers-alt">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white hover:bg-white hover:text-black font-studio-pro-bold py-6 px-12 rounded-full text-xl transition-all duration-300 backdrop-blur-sm bg-white/10 flex items-center justify-center gap-3"
              >
                <FaUsers />
                Join Our Team
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Main Home Component
export default function NewHomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <div className="bg-white text-black overflow-x-hidden">
      <InteractiveHero />
      <ServicesSection />
      <PortfolioShowcase />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  )
}
