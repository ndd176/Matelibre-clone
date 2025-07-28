// components/ui/CloudinaryImage.tsx
'use client'

import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface CloudinaryImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  crop?: 'fill' | 'scale' | 'fit' | 'pad'
  gravity?: 'center' | 'face' | 'faces' | 'auto'
  quality?: number | 'auto'
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png'
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  crop = 'fill',
  gravity = 'auto',
  quality = 'auto',
  format = 'auto',
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    console.error('❌ Cloudinary image failed:', src)
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    )
  }

  return (
    <>
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          className={`bg-gray-200 animate-pulse ${className}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <CldImage
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        crop={crop}
        gravity={gravity}
        quality={quality}
        format={format}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        // Optimize for performance
        removeBackground={false}
        enhance={false}
        sharpen={false}
        // Auto optimization
        flags={['progressive']}
      />
    </>
  )
}
