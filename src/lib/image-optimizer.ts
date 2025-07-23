// lib/image-optimizer.ts
import { WEBSITE_IMAGES } from './fast-images'

// Map local heavy images to optimized external alternatives
export const LOCAL_TO_OPTIMIZED_MAP: Record<string, string> = {
  // Hero và background images (thay thế images nặng)
  '/images/office-01.jpg': WEBSITE_IMAGES.hero.office,
  '/images/ethan-background.jpg': WEBSITE_IMAGES.hero.main,
  '/images/sky-bg-01.webp': WEBSITE_IMAGES.backgrounds.abstract,
  '/images/sky-bg-02.webp': WEBSITE_IMAGES.backgrounds.geometric,
  '/images/sky-bg-03.webp': WEBSITE_IMAGES.backgrounds.gradient,
  
  // Team building images (7MB -> optimized)
  '/images/team-building-02.webp': WEBSITE_IMAGES.company.meeting,
  '/images/team-building-03.webp': WEBSITE_IMAGES.company.workspace,
  
  // Table images (6MB -> optimized)
  '/images/table-05.webp': WEBSITE_IMAGES.positions.marketing,
  '/images/table-02.webp': WEBSITE_IMAGES.positions.developer,
  '/images/table-03.webp': WEBSITE_IMAGES.positions.designer,
  
  // Company images
  '/images/congty.jpg': WEBSITE_IMAGES.company.building,
  '/images/congty-2.jpg': WEBSITE_IMAGES.company.meeting,
  
  // Position images
  '/images/position.jpg': WEBSITE_IMAGES.positions.developer,
  '/images/work.png': WEBSITE_IMAGES.positions.marketing,
  
  // Team member images
  '/images/anh-hiep.png': WEBSITE_IMAGES.team.person1,
  '/images/duydinh-bg-2.png': WEBSITE_IMAGES.team.person2,
  
  // Tree backgrounds (3.5MB each -> optimized)
  '/images/tree-background-1.jpg': WEBSITE_IMAGES.backgrounds.abstract,
  '/images/tree-background-2.jpg': WEBSITE_IMAGES.backgrounds.geometric,
  '/images/tree-background-3.jpg': WEBSITE_IMAGES.backgrounds.gradient,
  '/images/tree-background-4.jpg': WEBSITE_IMAGES.hero.main,
}

/**
 * Get optimized image URL - replace heavy local images with fast external ones
 */
export function getOptimizedImageUrl(originalUrl: string): string {
  // If there's an optimized version, use it
  if (LOCAL_TO_OPTIMIZED_MAP[originalUrl]) {
    console.log(`🚀 Optimized: ${originalUrl} -> External CDN`)
    return LOCAL_TO_OPTIMIZED_MAP[originalUrl]
  }
  
  // Keep smaller local images as they are
  return originalUrl
}

/**
 * Get image size category for loading priority
 */
export function getImageLoadingPriority(url: string): 'high' | 'medium' | 'low' {
  const heavyImages = [
    '/images/team-building-02.webp', // 7MB
    '/images/table-05.webp',         // 6MB  
    '/images/office-01.jpg',         // 4.8MB
    '/images/table-02.webp',         // 4.7MB
    '/images/sky-bg-01.webp',        // 4MB
  ]
  
  const mediumImages = [
    '/images/tree-background-3.jpg',
    '/images/tree-background-2.jpg', 
    '/images/sky-bg-03.webp',
    '/images/table-03.webp',
  ]
  
  if (heavyImages.includes(url)) return 'high'
  if (mediumImages.includes(url)) return 'medium'
  return 'low'
}

/**
 * Preload critical optimized images only
 */
export function preloadCriticalOptimizedImages() {
  const criticalImages = [
    WEBSITE_IMAGES.hero.office,      // Hero background
    WEBSITE_IMAGES.company.building, // Company image
    WEBSITE_IMAGES.positions.developer, // Position image
  ]
  
  criticalImages.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    console.log('🔥 Preloading critical:', url)
  })
}
