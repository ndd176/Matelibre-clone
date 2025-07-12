// Types for API data
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

// New Job Detail interface
export interface JobDetail {
  id: string
  job_title: string
  icon?: string
  text_icon: TextIcon[]
  salary_range: string
  description: string | any[] // Rich text blocks array
  job_image: any // Media object with formats
  job?: Job // Relation field to Job
  createdAt?: string
  updatedAt?: string
}

// Text Icon component interface
export interface TextIcon {
  id?: string
  text: string
  icon: string
}

// New Job interface
export interface Job {
  id: string
  job_title: string
  short_description: string
  avatar_image: string
  sub_avatar: string
  createdAt?: string
  updatedAt?: string
}
