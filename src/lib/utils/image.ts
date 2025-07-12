/**
 * Image Utilities
 */

import { IMAGE_CONFIG } from '../constants/index'

/**
 * Get full image URL from Strapi media object or fallback
 * @param imageData - Strapi media object or string
 * @param fallback - Fallback image path
 * @returns Full image URL
 */
export const getImageUrl = (imageData: any, fallback: string = IMAGE_CONFIG.FALLBACK_JOB_IMAGE): string => {
  if (!imageData) {
    console.log('No image data provided, using fallback')
    return fallback
  }
  
  // If imageData is already a string (fallback case)
  if (typeof imageData === 'string') {
    console.log('Image data is string:', imageData)
    return imageData
  }
  
  // If imageData is an object with url property
  if (imageData.url) {
    const fullUrl = `${IMAGE_CONFIG.STRAPI_BASE_URL}${imageData.url}`
    console.log('Image URL:', fullUrl)
    return fullUrl
  }
  
  console.log('Image object but no URL, using fallback:', imageData)
  return fallback
}

/**
 * Get responsive image URL (with format)
 * @param imageData - Strapi media object
 * @param format - Image format (thumbnail, small, medium, large)
 * @param fallback - Fallback image path
 * @returns Formatted image URL
 */
export const getResponsiveImageUrl = (
  imageData: any, 
  format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium',
  fallback: string = IMAGE_CONFIG.FALLBACK_JOB_IMAGE
): string => {
  if (!imageData?.formats?.[format]) {
    return getImageUrl(imageData, fallback)
  }
  
  return `${IMAGE_CONFIG.STRAPI_BASE_URL}${imageData.formats[format].url}`
}
