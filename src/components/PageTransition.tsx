'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Kiểm tra nếu không phải trang chủ thì mới hiện loading
    if (pathname !== '/') {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      setIsLoading(false)
    }
  }, [pathname])

  return (
    <AnimatePresence mode='wait'>
      {isLoading && pathname !== '/' && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-5000 flex items-center justify-center bg-[#ffffff]"
        >
          <div className="relative flex flex-col items-center">
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  className="mb-4 w-128 h-128"
>
  <img 
    src="/images/app-logo.png" 
    alt="Logo" 
    className="w-full h-full object-contain"
  />
</motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-1 bg-white rounded-full"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-white text-lg font-medium"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
