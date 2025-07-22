/**
 * API Services for Jobs and Job Details
 * Separated APIs for different use cases
 */

import { Job, JobDetail, JobResponseType, JobDetailResponseType, SingleJobDetailResponseType } from '@/types/api/strapi'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

/**
 * Jobs API - For homepage display
 * Returns basic job information only
 */
export const jobsApi = {
  /**
   * Fetch all jobs for homepage
   */
  async fetchJobs(): Promise<JobResponseType> {
    try {
      const response = await fetch(`/api/jobs`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching jobs:', error)
      throw error
    }
  }
}

/**
 * Job Details API - For careers page
 * Returns complete job detail information
 */
export const jobDetailsApi = {
  /**
   * Fetch all job details for careers page
   */
  async fetchJobDetails(): Promise<JobDetailResponseType> {
    try {
      const response = await fetch(`/api/job-details`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching job details:', error)
      throw error
    }
  },

  /**
   * Fetch single job detail by ID
   */
  async fetchJobDetail(id: string): Promise<SingleJobDetailResponseType> {
    try {
      const response = await fetch(`/api/job-details/${id}`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching job detail:', error)
      throw error
    }
  }
}

/**
 * Direct Strapi API calls (if needed for testing)
 */
export const strapiDirectApi = {
  /**
   * Direct call to Strapi jobs endpoint
   */
  async fetchJobsFromStrapi(): Promise<JobResponseType> {
    try {
      const response = await fetch(`${STRAPI_URL}/api/jobs?populate[avatar_image]=*&populate[sub_avatar]=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching jobs from Strapi:', error)
      throw error
    }
  },

  /**
   * Direct call to Strapi job-details endpoint
   */
  async fetchJobDetailsFromStrapi(): Promise<JobDetailResponseType> {
    try {
      const response = await fetch(`${STRAPI_URL}/api/job-details?populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching job details from Strapi:', error)
      throw error
    }
  }
}

/**
 * Helper functions
 */
export const apiHelpers = {
  /**
   * Get image URL from Strapi media object
   */
  getImageUrl(media?: any): string {
    if (!media) return '/images/default-avatar.jpg'
    
    if (typeof media === 'string') return media
    
    if (media.url) return `${STRAPI_URL}${media.url}`
    
    return '/images/default-avatar.jpg'
  },

  /**
   * Format salary with Vietnamese currency
   */
  formatSalary(salary?: string): string {
    if (!salary) return 'Thỏa thuận'
    return `${salary} triệu đồng`
  },

  /**
   * Format years of experience
   */
  formatExperience(years?: number): string {
    if (!years || years === 0) return 'Không yêu cầu kinh nghiệm'
    if (years === 1) return '1 năm kinh nghiệm'
    return `${years} năm kinh nghiệm`
  },

  /**
   * Format job level in Vietnamese
   */
  formatLevel(level?: string): string {
    if (!level) return 'Nhân viên'
    
    const levelMap: { [key: string]: string } = {
      'staff': 'Nhân viên',
      'senior': 'Nhân viên cao cấp',
      'lead': 'Trưởng nhóm',
      'manager': 'Quản lý',
      'director': 'Giám đốc'
    }
    
    return levelMap[level.toLowerCase()] || level
  }
}

