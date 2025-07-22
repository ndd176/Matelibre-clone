'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CursorTooltip() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    let idleTimer: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Reset idle state khi mouse di chuyển
      setIsIdle(false)
      clearTimeout(idleTimer)
      
      // Set timer 2 giây để hiện tooltip khi đứng im
      idleTimer = setTimeout(() => {
        setIsIdle(true)
      }, 2000)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => {
      setIsVisible(false)
      setIsIdle(false)
      clearTimeout(idleTimer)
    }

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(idleTimer)
    }
  }, [])

  // Chỉ hiện khi visible và idle
  const shouldShow = isVisible && isIdle

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className="fixed pointer-events-none z-[9999] select-none"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 35,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.8, 
            y: 10,
            transition: { duration: 0.2 }
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          <div className="bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-xs font-studio-pro shadow-lg border border-gray-200/50">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Cuộn xuống</span>
              <motion.div 
                className="w-2 h-2 border-r border-b border-gray-400 transform rotate-45"
                animate={{ 
                  y: [0, 1, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </div>
          </div>
          
          {/* Subtle shadow */}
          <div className="absolute inset-0 bg-gray-200/30 rounded-full blur-sm -z-10 scale-110"></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
