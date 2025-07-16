



'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Elegant Animation variants for minimalist style
const elegantFadeIn = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
}

const smoothStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Refined team data with minimalist presentation
const teamMembers = [
  {
    name: "Duy Đinh",
    role: "Founder & CEO",
    image: "/images/anh-hiep.png",
    bio: "Visionary leader with 10+ years experience in sustainable fashion innovation",
    skills: ["Leadership", "Strategy", "Sustainability", "Innovation"],
    quote: "Creating beautiful products that respect our planet",
    experience: "10+ Years",
    education: "Fashion Design, RMIT University",
    achievement: "Built company from startup to 50M+ revenue"
  },
  {
    name: "Creative Team",
    role: "Design Director",
    image: "/images/duydinh-bg-2.png",
    bio: "Passionate designers pushing creative boundaries in traditional embroidery",
    skills: ["Embroidery", "Illustration", "Pattern Design", "Color Theory"],
    quote: "Every design tells a story of culture and craftsmanship",
    experience: "8+ Years",
    education: "Fine Arts & Textile Design",
    achievement: "500+ award-winning designs created"
  },
  {
    name: "Operations Team",
    role: "Operations Director",
    image: "/images/position.jpg",
    bio: "Quality-focused professionals ensuring excellence at every step",
    skills: ["Quality Control", "Logistics", "Process Optimization", "Excellence"],
    quote: "Excellence is not an act but a habit",
    experience: "12+ Years",
    education: "Industrial Engineering",
    achievement: "99.8% quality rating maintained"
  },
  {
    name: "Technology Team",
    role: "Digital Innovation Lead",
    image: "/images/work.png",
    bio: "Building the future of fashion technology with AI and automation",
    skills: ["Development", "AI Design", "Automation", "Digital Innovation"],
    quote: "Technology enhances creativity, never replaces it",
    experience: "6+ Years",
    education: "Computer Science & Digital Arts",
    achievement: "3x production efficiency increase"
  },
  {
    name: "Marketing Team",
    role: "Brand & Marketing",
    image: "/images/congty.jpg",
    bio: "Storytellers building authentic connections with our community",
    skills: ["Brand Strategy", "Content Creation", "Community Building", "Storytelling"],
    quote: "Authentic brands create lasting relationships",
    experience: "7+ Years",
    education: "Marketing & Communications",
    achievement: "10M+ social media reach"
  },
  {
    name: "Sustainability Team",
    role: "Environmental Impact",
    image: "/images/office-01.jpg",
    bio: "Environmental champions ensuring every decision is eco-conscious",
    skills: ["Eco-Design", "Material Research", "Sustainability", "Innovation"],
    quote: "Small choices today create a better tomorrow",
    experience: "5+ Years",
    education: "Environmental Science",
    achievement: "Carbon neutral certification achieved"
  }
]

// Clean values for minimalist presentation
const coreValues = [
  {
    icon: "🌱",
    title: "Sustainable Innovation",
    description: "We pioneer eco-friendly solutions that don't compromise on quality or beauty.",
    details: "Our R&D team develops sustainable techniques that set new industry standards.",
    metrics: ["15+ Patents", "Monthly Innovations", "Industry Recognition"],
    impact: "Leading sustainable fashion transformation"
  },
  {
    icon: "✨",
    title: "Exceptional Quality",
    description: "Every product reflects our commitment to craftsmanship and attention to detail.",
    details: "47-point quality process ensures excellence from concept to delivery.",
    metrics: ["99.8% Success Rate", "Zero Defects", "Quality Awards"],
    impact: "Industry-leading quality standards"
  },
  {
    icon: "🌍",
    title: "Planet-First Approach",
    description: "Environmental responsibility is woven into every aspect of our business.",
    details: "100% organic materials, carbon-neutral operations, and circular processes.",
    metrics: ["100% Organic", "Carbon Neutral", "Zero Waste"],
    impact: "50% carbon footprint reduction"
  },
  {
    icon: "⚡",
    title: "Agile Excellence",
    description: "Quick adaptation and rapid innovation keep us ahead of market trends.",
    details: "From concept to market in 30 days while maintaining quality standards.",
    metrics: ["30-Day Turnaround", "4x Faster", "Rapid Innovation"],
    impact: "First-to-market advantage"
  },
  {
    icon: "🤝",
    title: "Customer Focus",
    description: "Deep understanding of customer needs drives everything we create.",
    details: "98% satisfaction rate through direct feedback and continuous improvement.",
    metrics: ["98% Satisfaction", "Direct Feedback", "24/7 Support"],
    impact: "95% customer retention rate"
  },
  {
    icon: " ",
    title: "Passionate Purpose",
    description: "Our team's dedication to the mission creates extraordinary results.",
    details: "Mission-driven culture where every team member contributes to our vision.",
    metrics: ["High Engagement", "Low Turnover", "Mission-Driven"],
    impact: "Award-winning workplace culture"
  }
]

// Clean milestones for minimalist presentation
const milestones = [
  {
    year: "2020",
    title: "Foundation",
    description: "Launched with a vision to transform the fashion industry through sustainable practices",
    impact: "First sustainable embroidery design launched",
    details: "Started with a passion for combining traditional craftsmanship with modern sustainability.",
    achievement: "Business model validation",
    metrics: "1 Product → 100 Customers"
  },
  {
    year: "2021",
    title: "Recognition",
    description: "Breakthrough design reaches global audience and gains international recognition",
    impact: "500% revenue growth in 3 months",
    details: "Vietnamese cultural motif design gained international acclaim across 50+ countries.",
    achievement: "Global brand recognition",
    metrics: "1M+ Views → 25 Countries"
  },
  {
    year: "2022",
    title: "Expansion",
    description: "Opened production facility and assembled expert team",
    impact: "Team grew from 2 to 15 specialists",
    details: "Established professional studio with automated processes and skilled artisan network.",
    achievement: "Operational excellence",
    metrics: "15 Team Members → 10x Capacity"
  },
  {
    year: "2023",
    title: "Global Reach",
    description: "International expansion with strategic partnerships worldwide",
    impact: "Serving 25+ countries globally",
    details: "Built international supply chain and multilingual customer support.",
    achievement: "International market presence",
    metrics: "25 Countries → 50k+ Customers"
  },
  {
    year: "2024",
    title: "Innovation",
    description: "AI-powered design platform revolutionizes creative workflow",
    impact: "300% design efficiency increase",
    details: "Proprietary AI tools enhance designers while preserving human creativity.",
    achievement: "Technology leadership",
    metrics: "AI Integration → 3x Productivity"
  },
  {
    year: "2025",
    title: "Leadership",
    description: "Recognized as industry leader in sustainable fashion innovation",
    impact: "Industry benchmark status achieved",
    details: "Our methodologies adopted by industry. Setting new standards globally.",
    achievement: "Thought leadership",
    metrics: "Industry Standard → Global Influence"
  }
]

// Refined process steps for minimalist style
const designProcess = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep research into market insights, customer needs, and cultural influences",
    details: "We analyze market trends, conduct customer interviews, and study cultural heritage.",
    duration: "2 Days",
    tools: "Market Research, Customer Insights, Cultural Analysis"
  },
  {
    step: "02", 
    title: "Ideation",
    description: "Creative brainstorming sessions where the best ideas come to life",
    details: "Multiple concepts generated, refined, and tested through collaborative design thinking.",
    duration: "1 Week",
    tools: "Design Thinking, Collaborative Workshops, Concept Development"
  },
  {
    step: "03",
    title: "Creation",
    description: "Precision craftsmanship meets innovative technology",
    details: "Combining traditional hand embroidery with modern design tools and quality systems.",
    duration: "2-3 Weeks",
    tools: "Hand Craftsmanship, Design Software, Quality Assurance"
  },
  {
    step: "04",
    title: "Refinement",
    description: "Thorough testing and refinement until excellence is achieved",
    details: "Comprehensive quality testing, durability assessment, and customer validation.",
    duration: "1 Week",
    tools: "Quality Testing, Customer Feedback, Performance Analysis"
  },
  {
    step: "05",
    title: "Launch",
    description: "Strategic market introduction with continuous improvement",
    details: "Thoughtful rollout with real-time feedback integration and optimization.",
    duration: "Ongoing",
    tools: "Launch Strategy, Analytics, Continuous Improvement"
  }
]

// Refined achievements for minimalist presentation
const achievements = [
  {
    title: "Industry Recognition",
    items: [
      "Sustainable Fashion Pioneer Award 2024",
      "Innovation Excellence Recognition",
      "Global Impact Sustainability Prize"
    ],
    metrics: "15+ Major Awards"
  },
  {
    title: "Business Excellence",
    items: [
      "Fastest Growing Fashion Startup",
      "Customer Choice Award - 3 Years Running",
      "Employer of the Year - Creative Industries"
    ],
    metrics: "500% Growth Rate"
  },
  {
    title: "Global Impact",
    items: [
      "1M+ Lives Touched Through Products",
      "500+ Artisans Empowered Globally",
      "50% Industry Carbon Reduction Influenced"
    ],
    metrics: "Worldwide Influence"
  }
]

// Elegant partnerships for minimalist presentation
const partnerships = [
  {
    name: "Global Artisan Network",
    description: "Empowering 500+ traditional craftspeople across 15 countries",
    impact: "500+ Artisans Supported • $2M+ Direct Payments",
    category: "Community Impact"
  },
  {
    name: "Innovation Labs",
    description: "Collaboration with leading universities on sustainable technology",
    impact: "5 Patents Pending • 3 Breakthrough Innovations",
    category: "Research & Development"
  },
  {
    name: "Environmental Coalition",
    description: "Leading fashion industry's sustainable transformation",
    impact: "10M+ Carbon Credits • 50% Industry Impact",
    category: "Sustainability Leadership"
  }
]

export default function AboutUsAltPage() {
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  
  // Track scroll position for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'story', 'values', 'team', 'process', 'timeline', 'achievements', 'partnerships']
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
      {/* MINIMALIST HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Beautiful Monstera Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1564510714597-3a775f297ef5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <motion.div 
            className="absolute inset-0 opacity-5"
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 70%)',
                'radial-gradient(circle at 80% 20%, #16a34a 0%, transparent 70%)',
                'radial-gradient(circle at 40% 80%, #15803d 0%, transparent 70%)',
                'radial-gradient(circle at 60% 30%, #22c55e 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating Plant Elements */}
        <motion.div 
          className="absolute top-16 left-16 w-16 h-16 opacity-10"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 C30 20, 20 40, 30 60 C40 80, 60 80, 70 60 C80 40, 70 20, 50 10 Z" />
            <circle cx="50" cy="50" r="3" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-20 w-12 h-12 opacity-10"
          animate={{ 
            rotate: [0, -15, 15, 0],
            y: [0, -10, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 5 L65 30 L90 25 L70 50 L85 75 L60 70 L50 95 L40 70 L15 75 L30 50 L10 25 L35 30 Z" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-1/3 right-16 w-8 h-8 opacity-10"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="20" fill="white" fillOpacity="0.3" />
          </svg>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-studio-pro-bold text-black leading-none tracking-tight mb-8">
              About
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black leading-tight mb-8">
              Matelibre
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-studio-pro">
              We don&apos;t just create fashion.<br/>
              We craft sustainable futures.<br/>
              <span className="text-black font-studio-pro-bold">Beautiful. Responsible. Innovative.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16"
          >
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
        </motion.div>

        {/* Minimal decorative elements */}
        <motion.div 
          className="absolute top-20 left-20 w-2 h-2 bg-green-600 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-2 h-2 bg-green-500 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-1 h-1 bg-green-700 rounded-full"
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 2, 1] }}
          transition={{ duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* CLEAN STICKY NAVIGATION */}
      <motion.nav 
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-center">
            <div className="flex gap-8 flex-wrap">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'values', label: 'Values' },
                { id: 'team', label: 'Team' },
                { id: 'process', label: 'Process' },
                { id: 'timeline', label: 'Journey' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'partnerships', label: 'Partners' }
              ].map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-3 text-sm font-studio-pro-bold transition-all duration-300 relative ${
                    activeSection === section.id
                      ? 'text-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                      layoutId="activeSection"
                      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* CLEAN STORY SECTION */}
      <section id="story" className="py-24 bg-white relative overflow-hidden">
        {/* Beautiful Plant Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 right-0 w-1/3 h-full opacity-50"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1582797488257-ae666b239ac8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Floating Leaf Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 opacity-5"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 Q20 30, 20 50 Q20 80, 50 90 Q80 80, 80 50 Q80 30, 50 10 Z" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-16 right-16 w-14 h-14 opacity-5"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, 10, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <ellipse cx="50" cy="30" rx="30" ry="20" />
            <ellipse cx="50" cy="70" rx="25" ry="15" />
            <line x1="50" y1="10" x2="50" y2="85" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={smoothStagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={elegantFadeIn}>
              <div className="mb-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black leading-tight">
                  Our Story
                </h2>
              </div>
              
              <div className="space-y-8">
                <motion.div 
                  className="bg-gray-50 p-8 rounded-3xl"
                  variants={elegantFadeIn}
                >
                  <p className="text-xl text-gray-800 leading-relaxed font-studio-pro">
                    Born from a passion for sustainable fashion, we launched a movement that combines 
                    traditional craftsmanship with modern innovation.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-black text-white p-8 rounded-3xl"
                  variants={elegantFadeIn}
                >
                  <p className="text-lg leading-relaxed font-studio-pro">
                    From a small studio to global impact. From zero budget to industry leadership.
                    From dream to reality in just 5 years.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={elegantFadeIn}
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="bg-black text-white p-8 rounded-3xl text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">50M+</h3>
                  <p className="text-lg font-studio-pro">Revenue Generated</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-100 text-black p-8 rounded-3xl text-center mt-8"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">25+</h3>
                  <p className="text-lg font-studio-pro">Countries Served</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-800 text-white p-8 rounded-3xl text-center -mt-4"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">500+</h3>
                  <p className="text-lg font-studio-pro">Artisans Empowered</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 text-black p-8 rounded-3xl text-center mt-4 border-2 border-black"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">100%</h3>
                  <p className="text-lg font-studio-pro">Sustainable Materials</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CLEAN VALUES SECTION */}
      <section id="values" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Monstera Pattern Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-2/3 opacity-8"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1545152840-c05b2ec3dee7?w=800&q=80)',
              backgroundSize: 'contain',
              backgroundPosition: 'bottom left',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Decorative Plant Elements */}
        <motion.div 
          className="absolute top-32 right-20 w-16 h-16 opacity-8"
          animate={{ 
            rotate: [0, 15, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 5 C30 15, 15 35, 25 55 C35 75, 65 75, 75 55 C85 35, 70 15, 50 5 Z" />
            <path d="M50 25 C45 30, 45 40, 50 45 C55 40, 55 30, 50 25 Z" fill="white" fillOpacity="0.2" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-32 w-12 h-12 opacity-6"
          animate={{ 
            y: [0, -10, 5, 0],
            rotate: [0, -20, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M20 80 Q50 20, 80 80 Q50 60, 20 80 Z" />
            <circle cx="50" cy="50" r="5" fill="white" fillOpacity="0.3" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Our Values
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 h-full rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                  <div className="text-5xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-studio-pro-bold mb-4 text-black">{value.title}</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-studio-pro">{value.description}</p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-sm text-gray-600 font-studio-pro">{value.details}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {value.metrics.map((metric, idx) => (
                        <span key={idx} className="bg-black text-white px-3 py-1 text-xs font-studio-pro-bold rounded-full">
                          {metric}
                        </span>
                      ))}
                    </div>
                    <div className="border-l-4 border-black pl-4">
                      <p className="text-sm font-studio-pro-bold text-black">{value.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ELEGANT TEAM SECTION */}
      <section id="team" className="py-24 bg-white relative overflow-hidden">
        {/* Tropical Plants Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-1/4 h-full opacity-6"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-1/3 h-2/3 opacity-5"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Animated Plant Elements */}
        <motion.div 
          className="absolute top-40 right-10 w-18 h-18 opacity-8"
          animate={{ 
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 L35 25 L20 15 L30 35 L15 45 L35 40 L45 55 L50 35 L55 55 L65 40 L85 45 L70 35 L80 15 L65 25 Z" />
            <circle cx="50" cy="35" r="8" fill="white" fillOpacity="0.2" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-16 w-14 h-14 opacity-6"
          animate={{ 
            y: [0, -12, 6, 0],
            rotate: [0, 12, -6, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <ellipse cx="50" cy="40" rx="35" ry="25" />
            <ellipse cx="50" cy="70" rx="20" ry="15" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="3" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Meet Our Team
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs font-studio-pro-bold rounded-full">
                      {member.experience}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-studio-pro-bold mb-2 text-black">{member.name}</h3>
                    <div className="bg-gray-100 text-black p-3 mb-4 rounded-2xl">
                      <p className="text-lg font-studio-pro-bold">{member.role}</p>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed font-studio-pro">{member.bio}</p>
                    
                    <div className="space-y-3">
                      <div className="bg-black text-white p-3 rounded-2xl">
                        <p className="text-xs font-studio-pro italic">"{member.quote}"</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {member.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="bg-gray-50 text-black px-2 py-1 text-xs font-studio-pro text-center rounded-full border">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="border-l-4 border-black pl-3">
                        <p className="text-xs font-studio-pro-bold text-black">{member.achievement}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLEAN PROCESS SECTION */}
      <section id="process" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Elegant Plant Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 right-0 w-2/5 h-full opacity-60"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1711039131661-b1e336cdda75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Scattered Leaf Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-10 h-10 opacity-8"
          animate={{ 
            rotate: [0, 10, -5, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 Q25 30, 30 60 Q50 80, 70 60 Q75 30, 50 10 Z" />
            <line x1="50" y1="10" x2="50" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-40 left-32 w-8 h-8 opacity-6"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-1/2 left-10 w-6 h-6 opacity-7"
          animate={{ 
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Our Process
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="space-y-16">
            {designProcess.map((step, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="bg-black text-white p-6 rounded-2xl">
                          <span className="text-3xl font-studio-pro-bold">{step.step}</span>
                        </div>
                        <div className="bg-gray-100 text-black px-4 py-2 rounded-full">
                          <span className="text-sm font-studio-pro-bold">{step.duration}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-studio-pro-bold mb-4 text-black">{step.title}</h3>
                      <p className="text-xl text-gray-700 mb-6 leading-relaxed font-studio-pro">{step.description}</p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl">
                          <p className="text-sm text-gray-600 font-studio-pro">{step.details}</p>
                        </div>
                        <div className="border-l-4 border-black pl-4">
                          <p className="text-sm font-studio-pro-bold text-black">Tools: {step.tools}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-center ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <motion.div 
                      className="inline-flex items-center justify-center w-32 h-32 bg-black text-white rounded-full text-6xl font-studio-pro-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.step}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLEAN TIMELINE SECTION */}
      <section id="timeline" className="py-24 bg-white relative overflow-hidden">
        {/* Background Plant Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Floating Branch Pattern */}
        <motion.div 
          className="absolute top-16 right-16 w-20 h-20 opacity-7"
          animate={{ 
            rotate: [0, 15, -10, 0],
            x: [0, 8, -5, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-600 fill-none">
            <path d="M20 50 Q35 30, 50 50 Q65 70, 80 50" strokeWidth="2" />
            <path d="M30 40 Q40 35, 45 45" strokeWidth="1" />
            <path d="M55 55 Q65 50, 70 60" strokeWidth="1" />
            <circle cx="25" cy="45" r="2" fill="currentColor" />
            <circle cx="75" cy="55" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-32 w-12 h-12 opacity-8"
          animate={{ 
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, -20, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 10 Q70 30, 60 50 Q50 70, 40 50 Q30 30, 50 10 Z" />
            <path d="M50 20 Q60 35, 55 50 Q50 60, 45 50 Q40 35, 50 20 Z" fill="white" fillOpacity="0.2" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Our Journey
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-2xl text-3xl font-studio-pro-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="bg-gray-50 p-8 rounded-3xl group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                      <h3 className="text-3xl font-studio-pro-bold mb-4 text-black">{milestone.title}</h3>
                      <p className="text-xl text-gray-700 mb-6 leading-relaxed font-studio-pro">{milestone.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black text-white p-4 rounded-2xl">
                          <p className="text-sm font-studio-pro-bold">Impact: {milestone.impact}</p>
                        </div>
                        <div className="bg-gray-200 text-black p-4 rounded-2xl">
                          <p className="text-sm font-studio-pro-bold">Achievement: {milestone.achievement}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-2xl mb-4 border border-gray-200">
                        <p className="text-sm text-gray-600 font-studio-pro">{milestone.details}</p>
                      </div>
                      
                      <div className="border-l-4 border-black pl-4">
                        <p className="text-sm font-studio-pro-bold text-black">{milestone.metrics}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLEAN ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Monstera Background */}
        <div 
          className="absolute top-0 right-0 w-1/3 h-full opacity-6"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Decorative Plant Elements */}
        <motion.div 
          className="absolute top-20 left-16 w-16 h-16 opacity-8"
          animate={{ 
            rotate: [0, 8, -5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 15 Q30 35, 35 55 Q50 75, 65 55 Q70 35, 50 15 Z" />
            <path d="M50 25 Q40 40, 42 55 Q50 65, 58 55 Q60 40, 50 25 Z" fill="white" fillOpacity="0.25" />
            <line x1="50" y1="15" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-8 w-10 h-10 opacity-7"
          animate={{ 
            y: [0, -6, 3, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="18" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <circle cx="40" cy="40" r="3" fill="white" fillOpacity="0.6" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Our Achievements
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {achievements.map((category, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 h-full rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                  <div className="bg-black text-white p-4 mb-6 rounded-2xl">
                    <h3 className="text-2xl font-studio-pro-bold">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-2xl border-l-4 border-black">
                        <p className="text-sm font-studio-pro">🏆 {item}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-black text-white p-4 rounded-2xl text-center">
                    <p className="text-lg font-studio-pro-bold">{category.metrics}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Clean stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[
              { number: "15+", label: "Major Awards" },
              { number: "500%", label: "Growth Rate" },
              { number: "1M+", label: "Lives Impacted" },
              { number: "50%", label: "Industry Influence" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-4xl font-studio-pro-bold mb-2 text-black">{stat.number}</h3>
                <p className="text-sm font-studio-pro text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CLEAN PARTNERSHIPS SECTION */}
      <section id="partnerships" className="py-24 bg-white relative overflow-hidden">
        {/* Tropical Plant Background */}
        <div 
          className="absolute top-0 left-0 w-2/5 h-full opacity-5"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1545152840-c05b2ec3dee7?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Elegant Leaf Elements */}
        <motion.div 
          className="absolute top-24 right-20 w-14 h-14 opacity-8"
          animate={{ 
            rotate: [0, 12, -8, 0],
            y: [0, -4, 2, 0]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-600 fill-green-100">
            <path d="M50 10 Q70 25, 75 50 Q70 75, 50 85 Q30 75, 25 50 Q30 25, 50 10 Z" strokeWidth="1" />
            <path d="M50 20 Q65 30, 68 50 Q65 70, 50 75 Q35 70, 32 50 Q35 30, 50 20 Z" fill="white" fillOpacity="0.4" />
            <line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-12 w-8 h-8 opacity-7"
          animate={{ 
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 20 L55 35 L70 35 L60 45 L65 60 L50 52 L35 60 L40 45 L30 35 L45 35 Z" />
            <circle cx="50" cy="45" r="8" fill="white" fillOpacity="0.3" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Our Partners
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {partnerships.map((partnership, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-gray-50 p-8 h-full rounded-3xl group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                  <div className="bg-black text-white p-3 mb-6 rounded-2xl">
                    <p className="text-xs font-studio-pro-bold">{partnership.category}</p>
                  </div>
                  
                  <h3 className="text-2xl font-studio-pro-bold mb-4 text-black">{partnership.name}</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-studio-pro">{partnership.description}</p>
                  
                  <div className="border-l-4 border-black pl-4">
                    <p className="text-sm font-studio-pro-bold text-black">{partnership.impact}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Community impact stats */}
          <motion.div 
            className="bg-black text-white p-12 rounded-3xl"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3 className="text-4xl font-studio-pro-bold mb-8 text-center">Collective Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-6xl font-studio-pro-bold mb-2">500+</h4>
                <p className="text-xl font-studio-pro">Artisans Empowered</p>
              </div>
              <div>
                <h4 className="text-6xl font-studio-pro-bold mb-2">15</h4>
                <p className="text-xl font-studio-pro">Countries Reached</p>
              </div>
              <div>
                <h4 className="text-6xl font-studio-pro-bold mb-2">50%</h4>
                <p className="text-xl font-studio-pro">Carbon Reduction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLEAN CTA SECTION */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Final Monstera Background */}
        <div 
          className="absolute inset-0 opacity-6"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Floating Final Elements */}
        <motion.div 
          className="absolute top-16 left-16 w-12 h-12 opacity-8"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 15 Q30 30, 35 50 Q50 70, 65 50 Q70 30, 50 15 Z" />
            <path d="M50 25 Q40 35, 42 50 Q50 60, 58 50 Q60 35, 50 25 Z" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="45" r="3" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-16 right-16 w-12 h-12 opacity-8"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 15 Q70 30, 65 50 Q50 70, 35 50 Q30 30, 50 15 Z" />
            <path d="M50 25 Q60 35, 58 50 Q50 60, 42 50 Q40 35, 50 25 Z" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="45" r="3" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-16 left-20 w-10 h-10 opacity-7"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, 15, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-16 right-20 w-10 h-10 opacity-7"
          animate={{ 
            y: [0, 6, -4, 0],
            rotate: [0, -15, 10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mb-12">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-8 leading-tight">
                Ready to Join Our Mission?
              </h2>
              <p className="text-2xl text-gray-700 mb-8 font-studio-pro leading-relaxed">
                We&apos;re building more than a company.<br/>
                We&apos;re crafting a sustainable future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/careers">
                <motion.div 
                  className="bg-black text-white p-10 rounded-3xl cursor-pointer group hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-3xl font-studio-pro-bold mb-4">Join Our Team</h3>
                  <p className="text-lg font-studio-pro">Careers & Opportunities</p>
                </motion.div>
              </Link>
              
              <Link href="/community">
                <motion.div 
                  className="bg-white text-black p-10 rounded-3xl cursor-pointer group border-2 border-black hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-3xl font-studio-pro-bold mb-4">Join the Community</h3>
                  <p className="text-lg font-studio-pro">Partnerships & Collaboration</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
