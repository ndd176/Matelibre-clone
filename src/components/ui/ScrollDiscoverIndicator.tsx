'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollDiscoverIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  // Hide indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 50 
      }}
      transition={{ 
        delay: 1.8, 
        duration: 0.6,
        opacity: { duration: 0.3 }
      }}
      className="flex flex-col items-center cursor-pointer group"
      onClick={scrollToNextSection}
    >
      {/* Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
        className="text-white/90 font-studio-pro-regular text-sm md:text-base mb-6 text-center group-hover:text-white transition-colors duration-300"
      >
        Cuộn xuống để xem thêm
      </motion.p>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3, duration: 0.4 }}
        className="relative"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-white/20 blur-sm"
        />
        
        {/* Main indicator container */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-20 border-2 border-white/60 rounded-full bg-white/10 backdrop-blur-sm group-hover:border-white/80 transition-colors duration-300"
        >
          {/* Scrolling dot */}
          <motion.div
            animate={{
              y: [8, 28, 8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Chevron arrows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.4 }}
        className="flex flex-col items-center mt-4 space-y-1"
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            animate={{
              y: [0, 4, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            className="w-4 h-4 border-r-2 border-b-2 border-white/60 transform rotate-45 group-hover:border-white/80 transition-colors duration-300"
          />
        ))}
      </motion.div>

      {/* Pulsing background effect */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0, 0.1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-gradient-radial from-white/20 to-transparent -z-10"
        style={{
          width: '200px',
          height: '200px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </motion.div>
  )
}
