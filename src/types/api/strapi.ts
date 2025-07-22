/**
 * API Response Types
 * Type definitions for Strapi API responses
 */

/**
 * Strapi Media Object
 */
export interface StrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats?: {
    thumbnail?: StrapiMediaFormat
    small?: StrapiMediaFormat
    medium?: StrapiMediaFormat
    large?: StrapiMediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiMediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path?: string
  size: number
  width: number
  height: number
  sizeInBytes: number
}

/**
 * Job - For homepage display (basic info only)
 */
export interface Job {
  id: number
  documentId: string
  job_title: string
  short_description: string
  avatar_image?: StrapiMedia
  sub_avatar?: StrapiMedia
  createdAt: string
  updatedAt: string
  publishedAt: string
}

/**
 * Job Detail - For careers page (complete info)
 */
export interface JobDetail {
  id: number
  documentId: string
  job_title: string
  salary_range?: string
  overview?: string
  requirements?: string
  benefits?: string
  job_image?: StrapiMedia
  years_experience?: number
  level?: string
  job?: Job // Relation to main job
  createdAt: string
  updatedAt: string
  publishedAt: string
}

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
 * API Response wrapper
 */
export interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/**
 * API Response for multiple items
 */
export interface StrapiListResponse<T> {
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
 * Error Response
 */
export interface StrapiError {
  error: {
    status: number
    name: string
    message: string
    details?: any
  }
}

/**
 * Helper function types
 */
export type JobResponseType = StrapiListResponse<Job>
export type JobDetailResponseType = StrapiListResponse<JobDetail>
export type SingleJobDetailResponseType = StrapiResponse<JobDetail>

