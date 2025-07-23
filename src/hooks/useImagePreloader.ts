import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { getOptimizedImageUrl } from '../lib/image-optimizer'

interface UseImagePreloaderOptions {
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function useImagePreloader(src: string, options: UseImagePreloaderOptions = {}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const preloadImage = useCallback(() => {
    if (!src) return

    const img = new Image()
    
    img.onload = () => {
      setIsLoading(false)
      setIsLoaded(true)
      options.onLoad?.()
    }
    
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
      options.onError?.()
    }
    
    img.src = src
  }, [src, options])

  useEffect(() => {
    if (options.priority) {
      // Preload immediately for priority images
      preloadImage()
    } else {
      // Delay preload for non-priority images
      const timer = setTimeout(preloadImage, 100)
      return () => clearTimeout(timer)
    }
  }, [preloadImage, options.priority])

  return { isLoading, hasError, isLoaded }
}

// Hook for preloading multiple images
export function useImagesPreloader(srcs: string[], priority = false) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({})
  const [errorImages, setErrorImages] = useState<Record<string, boolean>>({})
  const processedSrcs = useRef<Set<string>>(new Set())

  // Memoize srcs array để tránh infinite re-render
  const memoizedSrcs = useMemo(() => srcs, [srcs.join(',')])

  useEffect(() => {
    if (!memoizedSrcs.length) return

    const preloadImages = () => {
      memoizedSrcs.forEach(src => {
        if (!src || processedSrcs.current.has(src)) return

        // Optimize heavy local images to external CDN
        const optimizedSrc = getOptimizedImageUrl(src)
        const cacheKey = src // Use original src as cache key
        
        processedSrcs.current.add(src)
        setLoadingImages(prev => ({ ...prev, [cacheKey]: true }))

        const img = new Image()
        
        img.onload = () => {
          setLoadingImages(prev => ({ ...prev, [cacheKey]: false }))
          setLoadedImages(prev => ({ ...prev, [cacheKey]: true }))
          console.log('✅ Image preloaded successfully:', optimizedSrc)
        }
        
        img.onerror = () => {
          setLoadingImages(prev => ({ ...prev, [cacheKey]: false }))
          setErrorImages(prev => ({ ...prev, [cacheKey]: true }))
          console.error('❌ Image preload failed:', optimizedSrc)
        }
        
        img.src = optimizedSrc // Use optimized URL for actual loading
      })
    }

    if (priority) {
      preloadImages()
    } else {
      const timer = setTimeout(preloadImages, 200)
      return () => clearTimeout(timer)
    }
  }, [memoizedSrcs, priority]) // Use memoized version

  const allLoaded = useMemo(() => 
    memoizedSrcs.every(src => loadedImages[src]), 
    [memoizedSrcs, loadedImages]
  )
  
  const anyLoading = useMemo(() => 
    memoizedSrcs.some(src => loadingImages[src]), 
    [memoizedSrcs, loadingImages]
  )

  return { loadedImages, loadingImages, errorImages, allLoaded, anyLoading }
}
