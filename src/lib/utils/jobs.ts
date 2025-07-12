/**
 * Job-related utility functions
 */

import { JOB_COLORS, type JobColor } from '../constants/index'
import { Job, JobDetail, CareersNewPosition } from '../../types/api/strapi'
import { ProductCard } from '../../types/index'
import { getImageUrl } from './image'

/**
 * Transform Job to ProductCard data format
 * @param job - Job object from API
 * @param index - Index for color assignment
 * @returns ProductCard compatible data
 */
export const transformJobToProductCard = (job: Job, index: number) => {
  const colorIndex = index % JOB_COLORS.length
  const color = JOB_COLORS[colorIndex]
  
  return {
    id: job.id,
    title: job.job_title,
    description: job.short_description.trim(),
    canImage: job.sub_avatar || '/images/product-1.webp',
    bgImage: job.avatar_image || '/images/tree-background-1.jpg',
    color: color as JobColor
  }
}

/**
 * Get random job color
 * @returns Random job color
 */
export const getRandomJobColor = (): JobColor => {
  const randomIndex = Math.floor(Math.random() * JOB_COLORS.length)
  return JOB_COLORS[randomIndex]
}

/**
 * Transform Job from Strapi to CareersNewPosition format
 */
export function transformJobToCareersNewPosition(job: Job): CareersNewPosition {
  return {
    id: job.id.toString(),
    title: job.job_title || 'Untitled Position',
    description: job.short_description || 'No description available',
    department: 'General', // Not available in Job interface
    location: 'Remote', // Not available in Job interface  
    type: 'Full-time', // Not available in Job interface
    canImage: job.avatar_image ? getImageUrl(job.avatar_image) : '/images/duydinh-bg-2.png',
    bgImage: job.sub_avatar ? getImageUrl(job.sub_avatar) : '/images/anh-hiep.png',
    color: 'white', // Not available in Job interface
    companyName: 'Your Company',
    companyDescription: 'Description of your company',
    benefits: [], // Not available in Job interface
    requirements: [], // Not available in Job interface
    hoverText: job.job_title || 'Position Available',
    salaryRange: '$1000 - $2000' // Default range
  }
}
