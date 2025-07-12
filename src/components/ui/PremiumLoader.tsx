'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PremiumLoaderProps {
  isVisible: boolean
  onComplete?: () => void
}

export default function PremiumLoader({ isVisible, onComplete }: PremiumLoaderProps) {
  const [loadingStage, setLoadingStage] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Generate particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [])

  // Loading progression
  useEffect(() => {
    if (!isVisible) return

    const stages = [
      { delay: 500, stage: 1 },
      { delay: 1000, stage: 2 },
      { delay: 1500, stage: 3 },
      { delay: 2000, stage: 4 },
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setLoadingStage(stage), delay)
    })

    // Complete loading
    setTimeout(() => {
      onComplete?.()
    }, 2500)
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, #06d6a0 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, #059669 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b  50%, #334155 100%)
          `
        }}
      >
        {/* Animated Background Mesh */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, #06d6a0 0%, transparent 50%)',
                'radial-gradient(circle at 40% 80%, #059669 0%, transparent 50%)',
                'radial-gradient(circle at 60% 30%, #10b981 0%, transparent 50%)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 opacity-30"
          />
        </div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [`${particle.x}%`, `${particle.x + 10}%`, `${particle.x - 5}%`],
              y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y + 10}%`]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: '0 0 6px rgba(16, 185, 129, 0.8)'
            }}
          />
        ))}

        {/* Central Loading Animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            
            {/* Main Logo/Brand Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: loadingStage >= 1 ? 1 : 0,
                rotate: loadingStage >= 1 ? 0 : -180
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.68, -0.55, 0.265, 1.55]
              }}
              className="relative mb-8"
            >
              {/* Glassmorphism Container */}
              <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-16 h-16 mx-auto"
                >
                  {/* Modern Geometric Logo */}
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <motion.path
                      d="M32 8 L56 24 L56 40 L32 56 L8 40 L8 24 Z"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="8"
                      fill="url(#gradient)"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#06d6a0" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Brand Text Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: loadingStage >= 2 ? 1 : 0,
                y: loadingStage >= 2 ? 0 : 30
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-6"
            >
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                mate<span className="text-emerald-400">libre</span>
              </h1>
              <p className="text-emerald-200/80 text-sm font-medium">
                Crafting Your Future
              </p>
            </motion.div>

            {/* Progressive Loading Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: loadingStage >= 3 ? 1 : 0,
                scale: loadingStage >= 3 ? 1 : 0.8
              }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${loadingStage * 25}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                style={{
                  boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)'
                }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                animate={{ x: [-100, 300] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </motion.div>

            {/* Loading Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loadingStage >= 3 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-4"
            >
              <motion.p
                key={loadingStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-200/80 text-sm font-medium"
              >
                {loadingStage === 1 && "Initializing experience..."}
                {loadingStage === 2 && "Loading opportunities..."}
                {loadingStage === 3 && "Preparing your journey..."}
                {loadingStage >= 4 && "Almost ready!"}
              </motion.p>
            </motion.div>

          </div>
        </div>

        {/* Corner Accents */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-br-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-400/20 to-transparent rounded-tl-3xl"
        />

        {/* Final Exit Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ 
            scale: loadingStage >= 4 ? [0, 1.2, 1] : 0,
            opacity: loadingStage >= 4 ? [0, 1, 0] : 0
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0"
        />
      </motion.div>
    </AnimatePresence>
  )
}
