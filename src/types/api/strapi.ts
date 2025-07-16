/**
 * API Response Types
 * Type definitions for Strapi API responses
 */

/**
 * Job Position (Legacy)
 */
export interface JobPosition {
  id: string
  title: string
  description: string
  canImage: string
  bgImage: string
  color: 'white' | 'milk' | 'matcha' | 'dark_green' | 'black'
  department?: string
  requirements?: string[]
  benefits?: string[]
  location?: string
  type?: string
  salaryRange?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Hero Slide for homepage carousel
 */
export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText?: string
  ctaLink?: string
  order: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Company Moment/Milestone
 */
export interface Moment {
  id: string
  title: string
  description: string
  image: string
  date: string
  category: string
  topPosition?: number
  leftPosition?: number
  createdAt?: string
  updatedAt?: string
}

/**
 * Customer Testimonial
 */
export interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  content: string
  avatar: string
  rating: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Job Detail with rich content
 */
export interface JobDetail {
  id: string
  job_title: string
  icon?: string
  text_icon: TextIcon[]
  salary_range: string
  description: string | unknown[]; // Rich text blocks array
  job_image: unknown; // Media object with formats
  job?: Job // Relation field to Job
  createdAt?: string
  updatedAt?: string
}

/**
 * Text Icon component for job details
 */
export interface TextIcon {
  id?: string
  text: string
  icon: string
}

/**
 * Job listing
 */
export interface Job {
  id: string
  job_title: string
  short_description: string
  avatar_image: StrapiImage | string
  sub_avatar: StrapiImage | string
  createdAt?: string
  updatedAt?: string
}

/**
 * CareersNewPosition interface for careers-new page display
 */
export interface CareersNewPosition {
  id: string
  title: string
  description: string
  department: string
  location: string
  type: string
  canImage: string
  bgImage: string
  color: string
  companyName: string
  companyDescription: string
  benefits: string[]
  requirements: string[]
  hoverText: string
  salaryRange: string
  isActive?: boolean
}

/**
 * Generic Strapi API Response
 */
export interface StrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/**
 * Strapi Image object structure
 */
export interface StrapiImage {
  id?: number
  url: string
  width?: number
  height?: number
  alternativeText?: string
  caption?: string
}
