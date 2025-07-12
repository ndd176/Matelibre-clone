'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

// Neo Brutalism Animation variants
const brutalistFadeIn = {
  initial: { opacity: 0, y: 100, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.3, ease: "easeOut" }
}

const brutalistStagger = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

// Extended team data
const teamMembers = [
  {
    name: "DUY ĐINH",
    role: "FOUNDER & CEO",
    image: "/images/anh-hiep.png",
    bio: "VISIONARY LEADER WITH 10+ YEARS IN SUSTAINABLE FASHION. BELIEVES IN BRUTAL HONESTY AND AUTHENTIC CREATIVITY.",
    skills: ["LEADERSHIP", "STRATEGY", "SUSTAINABILITY", "VISION"],
    quote: "FASHION SHOULD SCREAM PERSONALITY, NOT WHISPER CONFORMITY."
  },
  {
    name: "CREATIVE TEAM",
    role: "DESIGN DIRECTOR",
    image: "/images/duydinh-bg-2.png",
    bio: "RADICAL DESIGNERS WHO REJECT MAINSTREAM TRENDS. PUSHING BOUNDARIES WITH EVERY STITCH.",
    skills: ["EMBROIDERY", "ILLUSTRATION", "PATTERN DESIGN", "COLOR THEORY"],
    quote: "WE DON'T FOLLOW TRENDS. WE DESTROY THEM."
  },
  {
    name: "PRODUCTION TEAM",
    role: "OPERATIONS MANAGER",
    image: "/images/position.jpg",
    bio: "PRECISION-FOCUSED TEAM ENSURING QUALITY WITHOUT COMPROMISE. NO SHORTCUTS, NO EXCUSES.",
    skills: ["QUALITY CONTROL", "LOGISTICS", "EFFICIENCY", "PRECISION"],
    quote: "PERFECTION IS NOT AN ACCIDENT. IT'S A DEMAND."
  },
  {
    name: "TECH DIVISION",
    role: "DIGITAL INNOVATOR",
    image: "/images/work.png",
    bio: "CODING THE FUTURE OF FASHION TECHNOLOGY. MERGING DIGITAL INNOVATION WITH TRADITIONAL CRAFT.",
    skills: ["DEVELOPMENT", "AI DESIGN", "AUTOMATION", "DIGITAL ART"],
    quote: "CODE IS ART. ART IS CODE. EVERYTHING ELSE IS NOISE."
  }
]

// Expanded values with brutalist approach
const coreValues = [
  {
    icon: "💀",
    title: "NO BULLSH*T",
    description: "WE SAY WHAT WE MEAN. WE DO WHAT WE SAY. NO CORPORATE SPEAK, NO EMPTY PROMISES. JUST RAW, HONEST BUSINESS.",
    details: "Our communication is direct, our products are exactly what we advertise, and our promises are kept. Period."
  },
  {
    icon: "🔥",
    title: "RADICAL CREATIVITY",
    description: "CONVENTIONAL IS THE ENEMY. WE BREAK RULES, CHALLENGE NORMS, AND CREATE WHAT OTHERS WON'T DARE.",
    details: "Every design pushes boundaries. Every product tells a story that hasn't been told before."
  },
  {
    icon: "⚡",
    title: "BRUTAL QUALITY",
    description: "GOOD ENOUGH IS NOT ENOUGH. EVERY PRODUCT MUST SURVIVE THE APOCALYPSE AND STILL LOOK AMAZING.",
    details: "Our quality standards are unreasonably high. We test everything to destruction, then make it stronger."
  },
  {
    icon: "🌍",
    title: "PLANET FIRST",
    description: "SUSTAINABILITY ISN'T A MARKETING BUZZWORD. IT'S A NON-NEGOTIABLE REQUIREMENT FOR EXISTENCE.",
    details: "Every material choice, every process decision, every business move considers environmental impact first."
  },
  {
    icon: "🤝",
    title: "COMMUNITY POWER",
    description: "WE BUILD WITH PEOPLE, NOT FOR PROFIT. OUR COMMUNITY SHAPES EVERYTHING WE CREATE.",
    details: "Customer feedback directly influences product development. Community needs drive business decisions."
  },
  {
    icon: "💪",
    title: "RELENTLESS HUSTLE",
    description: "COMFORT ZONES ARE FOR THE WEAK. WE PUSH HARDER, WORK SMARTER, AND NEVER SETTLE.",
    details: "Continuous improvement isn't just a goal, it's an obsession. Every day we're better than yesterday."
  }
]

// Company milestones
const milestones = [
  {
    year: "2020",
    title: "FOUNDATION",
    description: "STARTED IN A GARAGE WITH BIG DREAMS AND ZERO BUDGET",
    impact: "First embroidery design sold to local customer"
  },
  {
    year: "2021",
    title: "BREAKTHROUGH",
    description: "FIRST VIRAL DESIGN HITS 100K+ SHARES",
    impact: "Revenue increased 500% in 3 months"
  },
  {
    year: "2022",
    title: "EXPANSION",
    description: "OPENED FIRST DEDICATED STUDIO SPACE",
    impact: "Team grew from 2 to 15 people"
  },
  {
    year: "2023",
    title: "INTERNATIONAL",
    description: "FIRST INTERNATIONAL ORDERS FROM 25 COUNTRIES",
    impact: "Global shipping network established"
  },
  {
    year: "2024",
    title: "INNOVATION",
    description: "LAUNCHED AI-ASSISTED DESIGN PLATFORM",
    impact: "Design process 3x faster, 10x more creative"
  },
  {
    year: "2025",
    title: "DOMINATION",
    description: "LEADING SUSTAINABLE EMBROIDERY REVOLUTION",
    impact: "Industry benchmark for quality and innovation"
  }
]

// Process steps
const designProcess = [
  {
    step: "01",
    title: "BRUTAL RESEARCH",
    description: "WE DIG DEEP INTO TRENDS, CUSTOMER NEEDS, AND MARKET GAPS. NO SURFACE-LEVEL ANALYSIS."
  },
  {
    step: "02", 
    title: "CONCEPT WARFARE",
    description: "IDEAS BATTLE EACH OTHER. ONLY THE STRONGEST, MOST INNOVATIVE CONCEPTS SURVIVE."
  },
  {
    step: "03",
    title: "DESIGN EXECUTION",
    description: "PRECISION MEETS CREATIVITY. EVERY LINE, EVERY COLOR, EVERY STITCH HAS PURPOSE."
  },
  {
    step: "04",
    title: "QUALITY DESTRUCTION",
    description: "WE TORTURE-TEST EVERYTHING. IF IT BREAKS, WE MAKE IT STRONGER. IF IT SURVIVES, IT SHIPS."
  },
  {
    step: "05",
    title: "LAUNCH & ITERATE",
    description: "SHIP FAST, LEARN FASTER. CUSTOMER FEEDBACK DRIVES IMMEDIATE IMPROVEMENTS."
  }
]

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState('story')

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* BRUTAL HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-black border-b-8 border-yellow-400">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-yellow-900/20"></div>
        
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="border-r border-white/20"></div>
            ))}
          </div>
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div 
            className="border-8 border-white bg-yellow-400 text-black p-12 shadow-[20px_20px_0px_#ff0000] mb-8"
            initial={{ y: 100, rotate: -5 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter">
              ABOUT
            </h1>
          </motion.div>
          
          <motion.div 
            className="border-8 border-yellow-400 bg-red-600 text-white p-8 shadow-[15px_15px_0px_#ffffff] mb-8"
            initial={{ y: -100, rotate: 3 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-6xl md:text-8xl font-black leading-none">
              MATELIBRE
            </h2>
          </motion.div>
          
          <motion.div 
            className="border-4 border-red-600 bg-black text-yellow-400 p-6 max-w-4xl mx-auto shadow-[10px_10px_0px_#ffff00]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-2xl md:text-4xl font-bold leading-tight">
              WE DON&apos;T MAKE CLOTHES.<br/>
              WE FORGE WEAPONS OF SELF-EXPRESSION.<br/>
              BRUTAL. HONEST. UNFORGETTABLE.
            </p>
          </motion.div>
        </motion.div>

        {/* Brutal decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 border-4 border-white transform rotate-45"></div>
        <div className="absolute bottom-20 right-16 w-16 h-16 bg-red-600 border-4 border-yellow-400"></div>
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-white border-4 border-red-600 rounded-full"></div>
      </section>

      {/* BRUTAL NAVIGATION */}
      <section className="py-8 px-4 bg-yellow-400 border-b-8 border-red-600">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="flex gap-4 flex-wrap">
              {['story', 'values', 'team', 'process', 'timeline'].map((section) => (
                <motion.button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-8 py-4 font-black text-2xl border-4 transition-all duration-200 transform ${
                    activeSection === section
                      ? 'bg-red-600 text-white border-black shadow-[8px_8px_0px_#000000] translate-y-0'
                      : 'bg-black text-yellow-400 border-red-600 shadow-[4px_4px_0px_#ff0000] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_#ff0000]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section className="py-16 px-4 bg-black min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* STORY SECTION */}
            {activeSection === 'story' && (
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <div className="border-4 border-yellow-400 bg-red-600 p-8 shadow-[12px_12px_0px_#ffff00]">
                    <h3 className="text-6xl font-black text-white mb-6 leading-none">OUR STORY</h3>
                    <div className="space-y-6 text-xl text-white font-bold leading-relaxed">
                      <p className="border-l-8 border-yellow-400 pl-6">
                        BORN IN 2020 FROM PURE FRUSTRATION WITH BORING, SOULLESS FASHION.
                      </p>
                      <p className="border-l-8 border-white pl-6">
                        WE STARTED WITH ONE BELIEF: CLOTHES SHOULD TELL STORIES, NOT WHISPER LIES.
                      </p>
                      <p className="border-l-8 border-yellow-400 pl-6">
                        EVERY STITCH IS A REBELLION AGAINST CONFORMITY. EVERY DESIGN IS A MIDDLE FINGER TO MEDIOCRITY.
                      </p>
                      <p className="border-l-8 border-white pl-6">
                        TODAY, WE&apos;RE NOT JUST A COMPANY. WE&apos;RE A MOVEMENT. A REVOLUTION. A VOICE FOR THE VOICELESS.
                      </p>
                    </div>
                  </div>

                  <div className="border-4 border-white bg-yellow-400 p-8 shadow-[12px_12px_0px_#ff0000]">
                    <h4 className="text-4xl font-black text-black mb-4">MISSION STATEMENT</h4>
                    <p className="text-2xl font-bold text-black leading-tight">
                      TO OBLITERATE FASHION NORMS AND REBUILD THEM WITH CREATIVITY, SUSTAINABILITY, AND BRUTAL HONESTY.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    className="border-8 border-red-600 bg-black p-4 shadow-[20px_20px_0px_#ffff00]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/images/congty.jpg"
                      alt="Our Story"
                      width={600}
                      height={500}
                      className="border-4 border-yellow-400 object-cover w-full h-96"
                    />
                  </motion.div>
                  
                  <div className="absolute -bottom-8 -right-8 border-4 border-white bg-red-600 p-6 shadow-[8px_8px_0px_#000000]">
                    <p className="text-white font-black text-xl">EST. 2020</p>
                  </div>
                </div>
              </div>
            )}

            {/* VALUES SECTION */}
            {activeSection === 'values' && (
              <div>
                <div className="text-center mb-16">
                  <h3 className="text-8xl font-black text-yellow-400 mb-4 leading-none">CORE VALUES</h3>
                  <div className="border-4 border-red-600 bg-white p-4 inline-block shadow-[8px_8px_0px_#ffff00]">
                    <p className="text-black text-2xl font-black">NO COMPROMISE. NO EXCUSES. NO BULLSH*T.</p>
                  </div>
                </div>
                
                <motion.div 
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={brutalistStagger}
                  initial="initial"
                  animate="animate"
                >
                  {coreValues.map((value, index) => (
                    <motion.div
                      key={index}
                      variants={brutalistFadeIn}
                      className="border-4 border-yellow-400 bg-black p-8 shadow-[12px_12px_0px_#ff0000] hover:shadow-[20px_20px_0px_#ff0000] transition-all duration-200 hover:-translate-y-2"
                    >
                      <div className="text-6xl mb-6 text-center">{value.icon}</div>
                      <h4 className="text-3xl font-black text-red-600 mb-4 text-center border-b-4 border-yellow-400 pb-2">
                        {value.title}
                      </h4>
                      <p className="text-white font-bold text-lg leading-tight mb-4 text-center">
                        {value.description}
                      </p>
                      <div className="border-2 border-white bg-yellow-400 p-3">
                        <p className="text-black font-bold text-sm">{value.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* TEAM SECTION */}
            {activeSection === 'team' && (
              <div>
                <div className="text-center mb-16">
                  <h3 className="text-8xl font-black text-red-600 mb-4 leading-none">THE SQUAD</h3>
                  <div className="border-4 border-yellow-400 bg-black p-4 inline-block shadow-[8px_8px_0px_#ffffff]">
                    <p className="text-white text-2xl font-black">MEET THE MANIACS BEHIND THE MAGIC</p>
                  </div>
                </div>

                <motion.div 
                  className="grid lg:grid-cols-2 gap-12"
                  variants={brutalistStagger}
                  initial="initial"
                  animate="animate"
                >
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      variants={brutalistFadeIn}
                      className="border-8 border-white bg-red-600 p-8 shadow-[16px_16px_0px_#ffff00] hover:shadow-[24px_24px_0px_#ffff00] transition-all duration-200"
                    >
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="relative">
                          <div className="border-4 border-yellow-400 bg-black p-2">
                            <Image
                              src={member.image}
                              alt={member.name}
                              width={300}
                              height={300}
                              className="object-cover w-full h-64 border-2 border-white"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="border-4 border-black bg-yellow-400 p-4 shadow-[6px_6px_0px_#000000]">
                            <h4 className="text-2xl font-black text-black">{member.name}</h4>
                            <p className="text-lg font-bold text-red-600">{member.role}</p>
                          </div>
                          
                          <div className="border-2 border-yellow-400 bg-black p-4">
                            <p className="text-white font-bold text-sm leading-tight mb-4">{member.bio}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {member.skills.map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex}
                                  className="bg-yellow-400 text-black px-2 py-1 text-xs font-black border-2 border-white"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            <div className="border-l-4 border-red-600 pl-4">
                              <p className="text-yellow-400 font-black text-sm italic">"{member.quote}"</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* PROCESS SECTION */}
            {activeSection === 'process' && (
              <div>
                <div className="text-center mb-16">
                  <h3 className="text-8xl font-black text-yellow-400 mb-4 leading-none">THE PROCESS</h3>
                  <div className="border-4 border-red-600 bg-white p-4 inline-block shadow-[8px_8px_0px_#000000]">
                    <p className="text-black text-2xl font-black">HOW WE TURN IDEAS INTO WEAPONS</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {designProcess.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`grid md:grid-cols-3 gap-8 items-center ${index % 2 === 1 ? 'md:text-right' : ''}`}
                    >
                      <div className={`${index % 2 === 1 ? 'md:order-3' : ''}`}>
                        <div className="border-8 border-yellow-400 bg-red-600 p-8 shadow-[12px_12px_0px_#000000]">
                          <div className="text-8xl font-black text-white mb-4">{step.step}</div>
                          <h4 className="text-3xl font-black text-yellow-400 mb-4">{step.title}</h4>
                          <p className="text-white font-bold text-lg leading-tight">{step.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center items-center">
                        <div className="w-16 h-16 bg-yellow-400 border-4 border-white transform rotate-45"></div>
                      </div>
                      
                      <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                        <div className="border-4 border-white bg-black p-6 shadow-[8px_8px_0px_#ffff00]">
                          <div className="w-full h-32 bg-gradient-to-r from-red-600 to-yellow-400 border-2 border-white"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* TIMELINE SECTION */}
            {activeSection === 'timeline' && (
              <div>
                <div className="text-center mb-16">
                  <h3 className="text-8xl font-black text-red-600 mb-4 leading-none">TIMELINE</h3>
                  <div className="border-4 border-yellow-400 bg-black p-4 inline-block shadow-[8px_8px_0px_#ffffff]">
                    <p className="text-white text-2xl font-black">FROM ZERO TO HERO IN 5 BRUTAL YEARS</p>
                  </div>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400"></div>
                  
                  <div className="space-y-16">
                    {milestones.map((milestone, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:text-right' : ''}`}
                      >
                        <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative`}>
                          <div className="border-6 border-red-600 bg-yellow-400 p-8 shadow-[16px_16px_0px_#000000]">
                            <div className="text-6xl font-black text-black mb-4">{milestone.year}</div>
                            <h4 className="text-3xl font-black text-red-600 mb-4">{milestone.title}</h4>
                            <p className="text-black font-bold text-xl mb-4">{milestone.description}</p>
                            <div className="border-4 border-black bg-white p-3">
                              <p className="text-black font-bold text-sm">{milestone.impact}</p>
                            </div>
                          </div>
                          
                          {/* Timeline connector */}
                          <div className={`absolute top-1/2 ${index % 2 === 0 ? '-right-8' : '-left-8'} w-16 h-1 bg-yellow-400`}></div>
                          <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-8 h-8 bg-red-600 border-4 border-white rounded-full`}></div>
                        </div>
                        
                        <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                          <div className="border-4 border-white bg-black p-6 shadow-[8px_8px_0px_#ff0000]">
                            <div className="w-full h-48 bg-gradient-to-br from-red-600 via-yellow-400 to-white border-2 border-yellow-400"></div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* BRUTAL STATS */}
      <section className="py-20 bg-red-600 border-t-8 border-yellow-400">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-8xl font-black text-white mb-4 leading-none">BY THE NUMBERS</h3>
            <div className="border-4 border-black bg-yellow-400 p-4 inline-block shadow-[8px_8px_0px_#000000]">
              <p className="text-black text-2xl font-black">COLD HARD FACTS</p>
            </div>
          </div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: "50K+", label: "DESIGNS CREATED", suffix: "PIECES OF ART" },
              { number: "25", label: "COUNTRIES SERVED", suffix: "GLOBAL DOMINATION" },
              { number: "5", label: "YEARS OF CHAOS", suffix: "PURE EVOLUTION" },
              { number: "∞", label: "CREATIVE ENERGY", suffix: "UNLIMITED POWER" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-8 border-black bg-yellow-400 p-8 shadow-[12px_12px_0px_#000000] text-center hover:shadow-[20px_20px_0px_#000000] transition-all duration-200 hover:-translate-y-2"
              >
                <div className="text-6xl md:text-8xl font-black text-red-600 mb-2 leading-none">{stat.number}</div>
                <div className="text-black text-xl font-black mb-2">{stat.label}</div>
                <div className="text-black text-sm font-bold">{stat.suffix}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BRUTAL CTA */}
      <section className="py-20 bg-black border-t-8 border-red-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="border-8 border-yellow-400 bg-red-600 p-12 shadow-[20px_20px_0px_#ffff00] mb-12">
              <h3 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none">
                JOIN THE<br/>REVOLUTION
              </h3>
              <p className="text-2xl md:text-3xl text-yellow-400 font-bold leading-tight">
                STOP BEING BORING.<br/>
                START BEING LEGENDARY.<br/>
                THE WORLD NEEDS YOUR STORY.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Link href="/careers">
                <motion.div
                  className="border-8 border-white bg-yellow-400 text-black px-12 py-6 font-black text-2xl shadow-[12px_12px_0px_#ff0000] hover:shadow-[20px_20px_0px_#ff0000] transition-all duration-200 hover:-translate-y-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  WORK WITH US
                </motion.div>
              </Link>
              
              <Link href="/community">
                <motion.div
                  className="border-8 border-yellow-400 bg-black text-white px-12 py-6 font-black text-2xl shadow-[12px_12px_0px_#ffff00] hover:shadow-[20px_20px_0px_#ffff00] transition-all duration-200 hover:-translate-y-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SEE OUR WORK
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
