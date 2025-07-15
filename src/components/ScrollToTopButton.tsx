'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowScrollTop(scrollPosition > 300)
    }

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    try {
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      })
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0)
    }
  }

  // Don't render if not needed
  if (!showScrollTop) return null

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1 
      }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{ 
        scale: 1.1,
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
      // Prevent event bubbling
      onPointerDown={(e) => e.stopPropagation()}
      role="button"
      aria-label="Scroll to top"
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 15l7-7 7 7" 
        />
      </svg>
    </motion.button>
  )
}
