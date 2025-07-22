/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
}

/**
 * Type guard to check if error has status property
 */
export function hasErrorStatus(error: unknown): error is { status: number; data: any } {
  return typeof error === 'object' && error !== null && 'status' in error
}

/**
 * Parse API errors from Strapi (400) or Server errors (500)
 * Following Ethan's error handling pattern
 */
export function parseApiError(
  error: unknown
): { fieldErrors?: Record<string, string>; generalError?: string } | null {
  if (hasErrorStatus(error) && (error.status === 400 || error.status === 500)) {
    try {
      const parsedData =
        typeof error.data === 'string' ? JSON.parse(error.data) : error.data

      const formErrors: {
        fieldErrors?: Record<string, string>
        generalError?: string
      } = {
        fieldErrors: {},
      }

      // Handle Strapi validation errors
      if (parsedData?.error?.details?.errors) {
        parsedData.error.details.errors.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            formErrors.fieldErrors![err.path[0]] = err.message
          } else {
            formErrors.generalError = err.message
          }
        })
      }

      // Handle server errors
      if (parsedData?.error?.status === 500) {
        formErrors.generalError =
          parsedData.error.message || 'Internal Server Error'
      }

      return formErrors
    } catch {
      return { generalError: 'Unknown error occurred' }
    }
  }

  return null
}

/**
 * Format salary display
 */
export function formatSalary(salary?: string | number): string {
  if (!salary) return 'Thỏa thuận'
  
  if (typeof salary === 'string') {
    return salary
  }
  
  return `${salary.toLocaleString('vi-VN')} VNĐ`
}

/**
 * Format experience level
 */
export function formatExperience(experience?: string): string {
  if (!experience) return 'Tất cả cấp độ'
  
  const experienceMap: Record<string, string> = {
    'intern': 'Thực tập sinh',
    'fresher': 'Fresher (0-1 năm)',
    'junior': 'Junior (1-3 năm)',
    'middle': 'Middle (3-5 năm)',
    'senior': 'Senior (5+ năm)',
    'lead': 'Team Lead',
    'manager': 'Manager',
  }
  
  return experienceMap[experience.toLowerCase()] || experience
}

/**
 * Format job level for display
 */
export function formatJobLevel(level?: string): string {
  if (!level) return 'Tất cả cấp độ'
  
  const levelMap: Record<string, string> = {
    'intern': 'Thực tập sinh',
    'fresher': 'Nhân viên mới',
    'junior': 'Nhân viên',
    'middle': 'Nhân viên trung cấp',
    'senior': 'Nhân viên cao cấp',
    'lead': 'Trưởng nhóm',
    'manager': 'Quản lý',
    'director': 'Giám đốc',
  }
  
  return levelMap[level.toLowerCase()] || level
}

/**
 * Format date display in Vietnamese
 */
export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  if (!date) return ''
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (format === 'long') {
    return dateObj.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  
  return dateObj.toLocaleDateString('vi-VN')
}

/**
 * Get time ago string in Vietnamese
 */
export function getTimeAgo(date: string | Date): string {
  if (!date) return ''
  
  const now = new Date()
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Hôm nay'
  if (diffInDays === 1) return 'Hôm qua'
  if (diffInDays < 7) return `${diffInDays} ngày trước`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tuần trước`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} tháng trước`
  
  return `${Math.floor(diffInDays / 365)} năm trước`
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (Vietnamese format)
 */
export function isValidPhone(phone: string): boolean {
  // Vietnamese phone number regex
  const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('84')) {
    return `+${cleaned}`
  }
  
  if (cleaned.startsWith('0')) {
    return cleaned.replace(/^0/, '+84')
  }
  
  return phone
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Generate SEO-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: any }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj as T
  }
  return obj
}

