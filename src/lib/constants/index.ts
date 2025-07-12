/**
 * Application Constants
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  TOKEN: process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  TIMEOUT: 10000, // 10 seconds
} as const

/**
 * Image Configuration
 */
export const IMAGE_CONFIG = {
  STRAPI_BASE_URL: API_CONFIG.BASE_URL,
  FALLBACK_JOB_IMAGE: '/images/position.jpg',
  FALLBACK_AVATAR: '/images/default-avatar.png',
} as const

/**
 * Route Paths
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CAREERS: '/careers',
  COMMUNITY: '/community',
  JOB_DETAIL: (id: string) => `/careers/${id}`,
} as const

/**
 * Job Card Colors
 */
export const JOB_COLORS = [
  'black',
  'milk', 
  'matcha',
  'dark_green',
  'white'
] as const

export type JobColor = typeof JOB_COLORS[number]
