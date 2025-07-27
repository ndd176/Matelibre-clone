// Performance optimization utilities

export const PERFORMANCE_CONFIG = {
  // Reduced animation durations for better performance
  FAST_ANIMATION: 0.2,
  NORMAL_ANIMATION: 0.4,
  SLOW_ANIMATION: 0.6,
  
  // Intersection observer options for better performance
  INTERSECTION_OPTIONS: {
    rootMargin: '50px',
    threshold: 0.1
  },
  
  // Image optimization settings
  IMAGE_SIZES: {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw', 
    desktop: '33vw'
  }
} as const

// Reduce motion for accessibility and performance
export const getReducedMotionConfig = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return false
}

// Optimized animation variants
export const optimizedVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: PERFORMANCE_CONFIG.FAST_ANIMATION }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: PERFORMANCE_CONFIG.NORMAL_ANIMATION }
  },
  
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1 // Reduced from 0.15-0.2
      }
    }
  }
} as const
