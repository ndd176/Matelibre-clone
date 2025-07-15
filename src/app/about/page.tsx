'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Refined Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Extended team data with more members
const teamMembers = [
  {
    name: "Duy Đinh",
    role: "Founder & CEO",
    image: "/images/anh-hiep.png",
    bio: "Visionary leader with 10+ years in sustainable fashion. Passionate about creating meaningful designs that tell stories.",
    skills: ["Leadership", "Strategy", "Sustainability", "Vision"],
    quote: "Fashion should speak authenticity, not follow trends blindly.",
    experience: "10+ years",
    education: "Fashion Design, RMIT University"
  },
  {
    name: "Creative Team",
    role: "Design Director",
    image: "/images/duydinh-bg-2.png",
    bio: "Innovative designers who blend traditional craftsmanship with modern aesthetics. Masters of embroidery artistry.",
    skills: ["Embroidery", "Illustration", "Pattern Design", "Color Theory"],
    quote: "Every thread tells a story, every pattern holds meaning.",
    experience: "8+ years",
    education: "Fine Arts & Textile Design"
  },
  {
    name: "Production Team",
    role: "Operations Manager",
    image: "/images/position.jpg",
    bio: "Quality-focused professionals ensuring excellence in every piece. Committed to sustainable manufacturing practices.",
    skills: ["Quality Control", "Logistics", "Efficiency", "Precision"],
    quote: "Excellence is not an accident, it's a habit.",
    experience: "12+ years",
    education: "Industrial Engineering"
  },
  {
    name: "Tech Division",
    role: "Digital Innovation Lead",
    image: "/images/work.png",
    bio: "Technology enthusiasts bridging the gap between traditional craft and digital innovation. Building the future of fashion tech.",
    skills: ["Development", "AI Design", "Automation", "Digital Art"],
    quote: "Technology amplifies creativity, not replaces it.",
    experience: "6+ years",
    education: "Computer Science & Digital Arts"
  },
  {
    name: "Marketing Squad",
    role: "Brand Storyteller",
    image: "/images/congty.jpg",
    bio: "Creative communicators who bring our brand story to life. Masters of authentic storytelling and community building.",
    skills: ["Storytelling", "Social Media", "Content Creation", "Brand Strategy"],
    quote: "Great brands don't sell products, they tell stories.",
    experience: "7+ years",
    education: "Marketing & Communications"
  },
  {
    name: "Sustainability Team",
    role: "Environmental Guardian",
    image: "/images/office-01.jpg",
    bio: "Environmental advocates ensuring every decision considers our planet's future. Leading the sustainable fashion revolution.",
    skills: ["Eco-Design", "Material Research", "Life Cycle Assessment", "Green Innovation"],
    quote: "The Earth is not inherited from ancestors, but borrowed from children.",
    experience: "5+ years",
    education: "Environmental Science & Sustainable Design"
  }
]

// Enhanced values with deeper insights
const coreValues = [
  {
    icon: "🌱",
    title: "Sustainability First",
    description: "Environmental responsibility isn't just a goal—it's woven into every decision we make, from material sourcing to packaging.",
    details: "We use 100% organic cotton, recycled threads, and biodegradable packaging. Our carbon-neutral shipping and zero-waste production processes set industry standards.",
    metrics: ["100% Organic Materials", "Carbon Neutral Shipping", "Zero Waste Production"]
  },
  {
    icon: "🎨",
    title: "Authentic Creativity",
    description: "We believe in creative freedom and authentic expression. Every design reflects genuine artistry, not mass-market trends.",
    details: "Our designs are created in-house by skilled artisans who bring years of traditional craftsmanship knowledge combined with contemporary vision.",
    metrics: ["100+ Original Designs", "Traditional Techniques", "Modern Innovation"]
  },
  {
    icon: "🤝",
    title: "Community Connection",
    description: "Building meaningful relationships with customers, partners, and local communities through transparent communication and shared values.",
    details: "We work directly with local artisans, support community workshops, and maintain open dialogue with our customers for continuous improvement.",
    metrics: ["50+ Local Artisans", "Community Workshops", "Direct Trade"]
  },
  {
    icon: "⚡",
    title: "Quality Excellence",
    description: "Uncompromising quality standards ensure every product meets our high expectations and exceeds customer satisfaction.",
    details: "Each piece undergoes rigorous quality checks, durability testing, and careful inspection before reaching our customers.",
    metrics: ["99.5% Quality Rating", "Lifetime Warranty", "Rigorous Testing"]
  },
  {
    icon: "🔍",
    title: "Transparency",
    description: "Complete transparency in our processes, pricing, and practices. What you see is exactly what you get.",
    details: "From supply chain visibility to open-book pricing, we believe customers deserve to know the full story behind their purchases.",
    metrics: ["Open Supply Chain", "Fair Pricing", "Process Documentation"]
  },
  {
    icon: "�",
    title: "Innovation Drive",
    description: "Constantly pushing boundaries through research, experimentation, and embracing new technologies while respecting tradition.",
    details: "Our R&D team explores new sustainable materials, improves traditional techniques, and develops innovative design tools.",
    metrics: ["Monthly Innovations", "Patent Applications", "Research Partnerships"]
  }
]

// Detailed company journey
const milestones = [
  {
    year: "2020",
    title: "The Foundation",
    description: "Started with a simple dream: creating meaningful fashion that tells authentic stories",
    impact: "First embroidery design sold to local customer",
    details: "Founded in a small home studio with just basic embroidery equipment and big dreams. Our first sale proved that authentic, handcrafted fashion still has a place in the modern world.",
    achievement: "Established brand identity and core values"
  },
  {
    year: "2021",
    title: "Community Growth",
    description: "Our first viral design brought global attention and proved our concept",
    impact: "Reached 100K+ social media followers, 500% revenue growth",
    details: "A custom embroidery piece featuring Vietnamese cultural motifs went viral on social media, bringing international attention to our brand and traditional craftsmanship.",
    achievement: "Built strong social media presence and global recognition"
  },
  {
    year: "2022",
    title: "Team Expansion",
    description: "Opened our first dedicated studio and brought talented artisans into the family",
    impact: "Team grew from 2 to 15 skilled professionals",
    details: "Moved to a professional studio space and hired skilled embroidery artisans, designers, and support staff to meet growing demand while maintaining quality.",
    achievement: "Established professional operations and quality systems"
  },
  {
    year: "2023",
    title: "Global Reach",
    description: "Expanded international shipping and partnerships with retailers worldwide",
    impact: "Serving customers in 25+ countries",
    details: "Developed international shipping capabilities and formed partnerships with select retailers who share our values of sustainable, authentic fashion.",
    achievement: "Global distribution network and international brand recognition"
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Launched AI-assisted design tools while preserving traditional craftsmanship",
    impact: "Design efficiency increased 300%, maintained 100% handcrafted quality",
    details: "Developed proprietary AI tools to assist in pattern creation and color matching while ensuring all final work remains handcrafted by skilled artisans.",
    achievement: "Perfect blend of technology and traditional craftsmanship"
  },
  {
    year: "2025",
    title: "Industry Leadership",
    description: "Recognized as a pioneer in sustainable fashion and authentic design",
    impact: "Industry benchmark for quality and sustainability",
    details: "Received multiple awards for sustainable practices and design innovation. Our methodologies are now studied and adopted by other fashion brands.",
    achievement: "Thought leadership in sustainable fashion industry"
  }
]

// Enhanced design process with more detail
const designProcess = [
  {
    step: "01",
    title: "Research & Inspiration",
    description: "Deep dive into cultural heritage, contemporary trends, and customer needs to find authentic inspiration.",
    details: "We spend weeks researching traditional motifs, cultural significance, and modern applications. Every design starts with a story worth telling.",
    duration: "2-3 weeks"
  },
  {
    step: "02", 
    title: "Concept Development",
    description: "Transform inspiration into concrete design concepts through sketching, digital mockups, and material exploration.",
    details: "Our design team creates multiple concepts, exploring different interpretations and technical approaches for each idea.",
    duration: "1-2 weeks"
  },
  {
    step: "03",
    title: "Prototyping & Testing",
    description: "Create physical prototypes to test design feasibility, durability, and aesthetic appeal.",
    details: "Every design goes through multiple prototype iterations, testing different materials, thread types, and embroidery techniques.",
    duration: "3-4 weeks"
  },
  {
    step: "04",
    title: "Quality Refinement",
    description: "Rigorous testing and refinement to ensure each piece meets our excellence standards.",
    details: "Durability testing, wash testing, color fastness testing, and detailed quality inspections at every stage.",
    duration: "2 weeks"
  },
  {
    step: "05",
    title: "Production & Launch",
    description: "Careful production with skilled artisans followed by strategic launch and customer feedback integration.",
    details: "Small batch production allows for quality control and quick adjustments based on early customer feedback.",
    duration: "4-6 weeks"
  }
]

// New additional content sections
const achievements = [
  {
    title: "Sustainability Awards",
    items: [
      "Green Fashion Award 2024 - Best Sustainable Practices",
      "Eco-Innovation Prize 2023 - Traditional Craft Revival",
      "Carbon Neutral Certification - Climate Action Network"
    ]
  },
  {
    title: "Design Recognition",
    items: [
      "Best Embroidery Design - International Craft Council",
      "Cultural Heritage Preservation Award",
      "Innovation in Traditional Arts Recognition"
    ]
  },
  {
    title: "Business Excellence",
    items: [
      "Small Business of the Year 2024",
      "Customer Choice Award - Fashion Category",
      "Ethical Business Certification"
    ]
  }
]

const partnerships = [
  {
    name: "Local Artisan Cooperatives",
    description: "Supporting traditional craftspeople and preserving cultural heritage",
    impact: "50+ artisans employed, traditional skills preserved"
  },
  {
    name: "Environmental Organizations",
    description: "Collaborating on sustainable fashion initiatives and environmental education",
    impact: "3 major conservation projects supported"
  },
  {
    name: "Educational Institutions",
    description: "Workshops and mentorship programs for emerging designers",
    impact: "200+ students trained in sustainable design"
  }
]

export default function AboutUsPage() {
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
    <div className="min-h-screen bg-[#F2EFE6] text-[#000000] font-serif">
      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[#F2EFE6] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#09290E]/10 via-transparent to-[#8C8A6F]/10"></div>
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-8 h-full">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="border-r border-[#09290E]/20"></div>
            ))}
          </div>
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="border-4 border-[#09290E] bg-[#FFFFFF] text-[#09290E] p-12 shadow-[12px_12px_0px_#8C8A6F] mb-8"
            initial={{ y: 50, rotate: -1 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight">
              About
            </h1>
          </motion.div>
          
          <motion.div 
            className="border-4 border-[#8C8A6F] bg-[#09290E] text-[#F2EFE6] p-8 shadow-[8px_8px_0px_#000000] mb-8"
            initial={{ y: -50, rotate: 1 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold leading-none">
              Matelibre
            </h2>
          </motion.div>
          
          <motion.div 
            className="border-2 border-[#09290E] bg-[#8C8A6F] text-[#FFFFFF] p-6 max-w-4xl mx-auto shadow-[6px_6px_0px_#09290E]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-xl md:text-2xl font-medium leading-relaxed">
              Crafting sustainable, authentic embroidery designs that honor tradition while embracing innovation. Every stitch tells a story of craftsmanship, community, and conscious creation.
            </p>
          </motion.div>
        </motion.div>

        {/* Refined decorative elements */}
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 bg-[#8C8A6F] border-2 border-[#09290E] transform rotate-12"
          animate={{ rotate: [12, 15, 12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-16 w-12 h-12 bg-[#09290E] border-2 border-[#8C8A6F] rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* STICKY NAVIGATION */}
      <motion.nav 
        className="sticky top-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-sm border-b-2 border-[#09290E] shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'values', label: 'Values' },
                { id: 'team', label: 'Team' },
                { id: 'process', label: 'Process' },
                { id: 'timeline', label: 'Journey' },
                { id: 'achievements', label: 'Awards' },
                { id: 'partnerships', label: 'Partners' }
              ].map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-6 py-2 text-sm font-medium border-2 transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-[#09290E] text-[#F2EFE6] border-[#09290E] shadow-[4px_4px_0px_#8C8A6F]'
                      : 'bg-[#F2EFE6] text-[#09290E] border-[#8C8A6F] hover:bg-[#8C8A6F] hover:text-[#FFFFFF] hover:shadow-[2px_2px_0px_#09290E]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* STORY SECTION */}
      <section id="story" className="py-20 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div className="border-4 border-[#8C8A6F] bg-[#09290E] p-8 shadow-[8px_8px_0px_#8C8A6F]">
                <h3 className="text-5xl font-bold text-[#F2EFE6] mb-6 leading-tight">Our Story</h3>
                <div className="space-y-6 text-lg text-[#F2EFE6] leading-relaxed">
                  <p className="border-l-4 border-[#8C8A6F] pl-6">
                    Born in 2020 from a deep appreciation for traditional Vietnamese embroidery and a vision for sustainable fashion.
                  </p>
                  <p className="border-l-4 border-[#F2EFE6] pl-6">
                    We started with one belief: authentic craftsmanship should be preserved, celebrated, and made accessible to the modern world.
                  </p>
                  <p className="border-l-4 border-[#8C8A6F] pl-6">
                    Every stitch connects the past with the present, tradition with innovation, local artisans with global customers.
                  </p>
                  <p className="border-l-4 border-[#F2EFE6] pl-6">
                    Today, we're not just a brand—we're a bridge between cultures, a voice for sustainable fashion, and a home for authentic creativity.
                  </p>
                </div>
              </div>

              <div className="border-4 border-[#09290E] bg-[#8C8A6F] p-8 shadow-[8px_8px_0px_#09290E]">
                <h4 className="text-3xl font-bold text-[#FFFFFF] mb-4">Mission & Vision</h4>
                <p className="text-xl text-[#F2EFE6] leading-relaxed">
                  To preserve traditional craftsmanship while building a sustainable future for fashion. We envision a world where every garment tells a meaningful story and every purchase supports artisan communities.
                </p>
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="border-6 border-[#09290E] bg-[#F2EFE6] p-4 shadow-[16px_16px_0px_#8C8A6F]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/congty.jpg"
                  alt="Our Story"
                  width={600}
                  height={500}
                  className="border-2 border-[#8C8A6F] object-cover w-full h-96"
                />
              </motion.div>
              
              <div className="absolute -bottom-6 -right-6 border-4 border-[#09290E] bg-[#8C8A6F] p-4 shadow-[6px_6px_0px_#09290E]">
                <p className="text-[#FFFFFF] font-bold text-lg">Est. 2020</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section id="values" className="py-20 px-4 bg-[#F2EFE6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-6xl font-bold text-[#09290E] mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Core Values
            </motion.h3>
            <div className="border-4 border-[#8C8A6F] bg-[#FFFFFF] p-4 inline-block shadow-[6px_6px_0px_#09290E]">
              <p className="text-[#09290E] text-xl font-medium">Principles that guide everything we do</p>
            </div>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-4 border-[#09290E] bg-[#FFFFFF] p-8 shadow-[8px_8px_0px_#8C8A6F] hover:shadow-[12px_12px_0px_#8C8A6F] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-6 text-center">{value.icon}</div>
                <h4 className="text-2xl font-bold text-[#09290E] mb-4 text-center border-b-2 border-[#8C8A6F] pb-2">
                  {value.title}
                </h4>
                <p className="text-[#09290E] font-medium text-base leading-relaxed mb-4">
                  {value.description}
                </p>
                <div className="border-2 border-[#8C8A6F] bg-[#F2EFE6] p-3 mb-4">
                  <p className="text-[#09290E] text-sm">{value.details}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {value.metrics.map((metric, metricIndex) => (
                    <span 
                      key={metricIndex}
                      className="bg-[#8C8A6F] text-[#FFFFFF] px-3 py-1 text-xs font-medium border border-[#09290E]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="py-20 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-6xl font-bold text-[#09290E] mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h3>
            <div className="border-4 border-[#8C8A6F] bg-[#F2EFE6] p-4 inline-block shadow-[6px_6px_0px_#09290E]">
              <p className="text-[#09290E] text-xl font-medium">The passionate people behind every design</p>
            </div>
          </div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-6 border-[#09290E] bg-[#8C8A6F] p-8 shadow-[12px_12px_0px_#09290E] hover:shadow-[16px_16px_0px_#09290E] transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div className="relative">
                    <div className="border-4 border-[#F2EFE6] bg-[#FFFFFF] p-2">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-64 border-2 border-[#8C8A6F]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-4 border-[#09290E] bg-[#F2EFE6] p-4 shadow-[4px_4px_0px_#09290E]">
                      <h4 className="text-xl font-bold text-[#09290E]">{member.name}</h4>
                      <p className="text-base font-medium text-[#8C8A6F]">{member.role}</p>
                      <div className="flex gap-2 mt-2 text-xs">
                        <span className="bg-[#09290E] text-[#F2EFE6] px-2 py-1">{member.experience}</span>
                        <span className="bg-[#8C8A6F] text-[#FFFFFF] px-2 py-1">Expert</span>
                      </div>
                    </div>
                    
                    <div className="border-2 border-[#F2EFE6] bg-[#09290E] p-4">
                      <p className="text-[#F2EFE6] text-sm leading-relaxed mb-4">{member.bio}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="bg-[#F2EFE6] text-[#09290E] px-2 py-1 text-xs font-medium border border-[#8C8A6F]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="border-l-4 border-[#8C8A6F] pl-4">
                        <p className="text-[#F2EFE6] text-sm italic">"{member.quote}"</p>
                      </div>
                      
                      <div className="mt-3 text-xs text-[#8C8A6F]">
                        Education: {member.education}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="py-20 px-4 bg-[#F2EFE6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-6xl font-bold text-[#09290E] mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Process
            </motion.h3>
            <div className="border-4 border-[#8C8A6F] bg-[#FFFFFF] p-4 inline-block shadow-[6px_6px_0px_#09290E]">
              <p className="text-[#09290E] text-xl font-medium">From concept to creation</p>
            </div>
          </div>

          <div className="space-y-12">
            {designProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-3 gap-8 items-center ${index % 2 === 1 ? 'md:text-right' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'md:order-3' : ''}`}>
                  <div className="border-6 border-[#09290E] bg-[#8C8A6F] p-8 shadow-[8px_8px_0px_#09290E]">
                    <div className="text-6xl font-bold text-[#FFFFFF] mb-4">{step.step}</div>
                    <h4 className="text-2xl font-bold text-[#F2EFE6] mb-4">{step.title}</h4>
                    <p className="text-[#FFFFFF] font-medium text-base leading-relaxed mb-4">{step.description}</p>
                    <div className="border-2 border-[#F2EFE6] bg-[#09290E] p-3">
                      <p className="text-[#F2EFE6] text-sm">{step.details}</p>
                    </div>
                    <div className="mt-3 text-[#F2EFE6] text-sm font-medium">
                      Duration: {step.duration}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center items-center">
                  <div className="w-12 h-12 bg-[#8C8A6F] border-4 border-[#09290E] transform rotate-45"></div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="border-4 border-[#09290E] bg-[#FFFFFF] p-6 shadow-[6px_6px_0px_#8C8A6F]">
                    <div className="w-full h-32 bg-gradient-to-r from-[#8C8A6F] to-[#09290E] border-2 border-[#09290E]"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline" className="py-20 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-6xl font-bold text-[#09290E] mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Journey
            </motion.h3>
            <div className="border-4 border-[#8C8A6F] bg-[#F2EFE6] p-4 inline-block shadow-[6px_6px_0px_#09290E]">
              <p className="text-[#09290E] text-xl font-medium">Five years of growth and innovation</p>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#8C8A6F]"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:text-right' : ''}`}
                >
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative`}>
                    <div className="border-6 border-[#8C8A6F] bg-[#F2EFE6] p-8 shadow-[12px_12px_0px_#09290E]">
                      <div className="text-5xl font-bold text-[#09290E] mb-4">{milestone.year}</div>
                      <h4 className="text-2xl font-bold text-[#8C8A6F] mb-4">{milestone.title}</h4>
                      <p className="text-[#09290E] font-medium text-lg mb-4">{milestone.description}</p>
                      <div className="border-4 border-[#09290E] bg-[#FFFFFF] p-4 mb-4">
                        <p className="text-[#09290E] font-medium text-sm">{milestone.impact}</p>
                      </div>
                      <div className="border-2 border-[#8C8A6F] bg-[#09290E] p-3">
                        <p className="text-[#F2EFE6] text-sm">{milestone.details}</p>
                      </div>
                      <div className="mt-3 text-[#8C8A6F] text-sm font-medium">
                        Achievement: {milestone.achievement}
                      </div>
                    </div>
                    
                    {/* Timeline connector */}
                    <div className={`absolute top-1/2 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-16 h-1 bg-[#8C8A6F]`}></div>
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-8 h-8 bg-[#09290E] border-4 border-[#F2EFE6] rounded-full`}></div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="border-4 border-[#09290E] bg-[#8C8A6F] p-6 shadow-[6px_6px_0px_#09290E]">
                      <div className="w-full h-48 bg-gradient-to-br from-[#8C8A6F] via-[#F2EFE6] to-[#09290E] border-2 border-[#09290E]"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-20 px-4 bg-[#09290E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-6xl font-bold text-[#F2EFE6] mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Awards & Recognition
            </motion.h3>
            <div className="border-4 border-[#8C8A6F] bg-[#F2EFE6] p-4 inline-block shadow-[6px_6px_0px_#8C8A6F]">
              <p className="text-[#09290E] text-xl font-medium">Celebrating our milestones</p>
            </div>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-4 border-[#8C8A6F] bg-[#F2EFE6] p-8 shadow-[8px_8px_0px_#8C8A6F] hover:shadow-[12px_12px_0px_#8C8A6F] transition-all duration-300"
              >
                <h4 className="text-2xl font-bold text-[#09290E] mb-6 text-center border-b-2 border-[#8C8A6F] pb-2">
                  {category.title}
                </h4>
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="border-2 border-[#09290E] bg-[#FFFFFF] p-3"
                    >
                      <p className="text-[#09290E] text-sm font-medium">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid md:grid-cols-4 gap-8 mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: "50K+", label: "Designs Created", suffix: "Works of Art" },
              { number: "25", label: "Countries Served", suffix: "Global Reach" },
              { number: "98%", label: "Customer Satisfaction", suffix: "Happy Clients" },
              { number: "15+", label: "Awards Won", suffix: "Recognition" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-6 border-[#8C8A6F] bg-[#F2EFE6] p-6 shadow-[8px_8px_0px_#8C8A6F] text-center hover:shadow-[12px_12px_0px_#8C8A6F] transition-all duration-200 hover:-translate-y-1"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#09290E] mb-2 leading-none">{stat.number}</div>
                <div className="text-[#09290E] text-lg font-medium mb-1">{stat.label}</div>
                <div className="text-[#8C8A6F] text-sm font-medium">{stat.suffix}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARTNERSHIPS SECTION */}
      <section id="partnerships" className="py-20 px-4 bg-[#F2EFE6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h3 
              className="text-6xl font-bold text-[#09290E] mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Partners
            </motion.h3>
            <div className="border-4 border-[#8C8A6F] bg-[#FFFFFF] p-4 inline-block shadow-[6px_6px_0px_#09290E]">
              <p className="text-[#09290E] text-xl font-medium">Building meaningful relationships</p>
            </div>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {partnerships.map((partner, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="border-4 border-[#09290E] bg-[#FFFFFF] p-8 shadow-[8px_8px_0px_#8C8A6F] hover:shadow-[12px_12px_0px_#8C8A6F] transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-[#09290E] mb-4 border-b-2 border-[#8C8A6F] pb-2">
                  {partner.name}
                </h4>
                <p className="text-[#09290E] font-medium text-base leading-relaxed mb-4">
                  {partner.description}
                </p>
                <div className="border-2 border-[#8C8A6F] bg-[#F2EFE6] p-3">
                  <p className="text-[#09290E] text-sm font-medium">{partner.impact}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Community Impact */}
          <motion.div
            className="border-6 border-[#09290E] bg-[#8C8A6F] p-12 shadow-[12px_12px_0px_#09290E] text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-4xl font-bold text-[#F2EFE6] mb-6">Community Impact</h4>
            <p className="text-xl text-[#FFFFFF] leading-relaxed mb-8">
              Through our partnerships and initiatives, we've directly supported over 200 artisans, 
              trained 150+ students in sustainable design practices, and contributed to 5 major 
              environmental conservation projects.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-4 border-[#F2EFE6] bg-[#09290E] p-4">
                <div className="text-3xl font-bold text-[#F2EFE6] mb-2">200+</div>
                <div className="text-[#8C8A6F] text-sm">Artisans Supported</div>
              </div>
              <div className="border-4 border-[#F2EFE6] bg-[#09290E] p-4">
                <div className="text-3xl font-bold text-[#F2EFE6] mb-2">150+</div>
                <div className="text-[#8C8A6F] text-sm">Students Trained</div>
              </div>
              <div className="border-4 border-[#F2EFE6] bg-[#09290E] p-4">
                <div className="text-3xl font-bold text-[#F2EFE6] mb-2">5</div>
                <div className="text-[#8C8A6F] text-sm">Conservation Projects</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-[#09290E]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="border-6 border-[#8C8A6F] bg-[#F2EFE6] p-12 shadow-[16px_16px_0px_#8C8A6F] mb-12">
              <h3 className="text-4xl md:text-6xl font-bold text-[#09290E] mb-6 leading-tight">
                Join Our Story
              </h3>
              <p className="text-xl md:text-2xl text-[#8C8A6F] font-medium leading-relaxed">
                Be part of a movement that values authenticity, sustainability, and meaningful craftsmanship. 
                Together, we can create a more conscious future for fashion.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/careers">
                <motion.div
                  className="border-6 border-[#F2EFE6] bg-[#8C8A6F] text-[#FFFFFF] px-10 py-4 font-bold text-xl shadow-[8px_8px_0px_#F2EFE6] hover:shadow-[12px_12px_0px_#F2EFE6] transition-all duration-200 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Team
                </motion.div>
              </Link>
              
              <Link href="/community">
                <motion.div
                  className="border-6 border-[#8C8A6F] bg-[#F2EFE6] text-[#09290E] px-10 py-4 font-bold text-xl shadow-[8px_8px_0px_#8C8A6F] hover:shadow-[12px_12px_0px_#8C8A6F] transition-all duration-200 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Work
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
