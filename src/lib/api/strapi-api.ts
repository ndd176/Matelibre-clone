// API Base Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

// API Headers
const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
})

// Generic API fetch function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint}`
  
  const config: RequestInit = {
    headers: getHeaders(),
    ...options
  }

  try {
    console.log('🔗 Making API request to:', url) // Debug log
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ API Error ${response.status} for ${url}:`, errorText) // Debug log
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    console.log(`✅ API Success for ${url}:`, data) // Debug log
    return data
  } catch (error) {
    console.error('API Request failed:', error)
    throw error
  }
}

// Types for Strapi responses
interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiEntity {
  id: number
  documentId?: string
  attributes?: Record<string, any>
  createdAt: string
  updatedAt: string
  publishedAt?: string
  [key: string]: any // Allow direct field access like in your response
}

// Job Positions API
export const jobPositionsApi = {
  // Get all job positions
  getAll: async (params?: {
    page?: number
    pageSize?: number
    sort?: string
    filters?: Record<string, any>
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    
    // Add filters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value)
      })
    }

    // Populate relations
    searchParams.append('populate', '*')

    const query = searchParams.toString()
    return apiRequest(`/job-positions${query ? `?${query}` : ''}`)
  },

  // Get single job position
  getById: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/job-positions/${id}?populate=*`)
  },

  // Create job position
  create: async (data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/job-positions', {
      method: 'POST',
      body: JSON.stringify({ data })
    })
  },

  // Update job position
  update: async (id: number, data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/job-positions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data })
    })
  },

  // Delete job position
  delete: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/job-positions/${id}`, {
      method: 'DELETE'
    })
  }
}

// Hero Slides API
export const heroSlidesApi = {
  getAll: async (params?: {
    sort?: string
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    // Try different populate syntax for Strapi v5
    searchParams.append('populate', 'backgroundImage')
    
    if (params?.sort) searchParams.append('sort', params.sort)
    
    const query = searchParams.toString()
    return apiRequest(`/hero-slides${query ? `?${query}` : ''}`)
  },

  getById: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/hero-slides/${id}?populate=*`)
  },

  create: async (data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/hero-slides', {
      method: 'POST',
      body: JSON.stringify({ data })
    })
  },

  update: async (id: number, data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/hero-slides/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data })
    })
  },

  delete: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/hero-slides/${id}`, {
      method: 'DELETE'
    })
  }
}

// Moments API
export const momentsApi = {
  getAll: async (params?: {
    page?: number
    pageSize?: number
    sort?: string
    filters?: Record<string, any>
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value)
      })
    }

    searchParams.append('populate', '*')
    return apiRequest(`/moments?${searchParams.toString()}`)
  },

  getById: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/moments/${id}?populate=*`)
  },

  create: async (data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/moments', {
      method: 'POST',
      body: JSON.stringify({ data })
    })
  },

  update: async (id: number, data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/moments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data })
    })
  },

  delete: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/moments/${id}`, {
      method: 'DELETE'
    })
  }
}

// Testimonials API
export const testimonialsApi = {
  getAll: async (params?: {
    page?: number
    pageSize?: number
    sort?: string
    filters?: Record<string, any>
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value)
      })
    }

    searchParams.append('populate', '*')
    return apiRequest(`/testimonials?${searchParams.toString()}`)
  },

  getById: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/testimonials/${id}?populate=*`)
  },

  create: async (data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/testimonials', {
      method: 'POST',
      body: JSON.stringify({ data })
    })
  },

  update: async (id: number, data: Record<string, any>): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ data })
    })
  },

  delete: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/testimonials/${id}`, {
      method: 'DELETE'
    })
  }
}

// Products API
export const productsApi = {
  getAll: async (params?: {
    page?: number
    pageSize?: number
    sort?: string
    filters?: Record<string, any>
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('pagination[page]', params.page.toString())
    if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString())
    if (params?.sort) searchParams.append('sort', params.sort)
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value)
      })
    }

    searchParams.append('populate', '*')
    return apiRequest(`/products?${searchParams.toString()}`)
  },

  getById: async (id: number): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest(`/products/${id}?populate=*`)
  },

  getByCategorySlug: async (slug: string): Promise<StrapiResponse<StrapiEntity[]>> => {
    return apiRequest(`/products?filters[category][slug][$eq]=${slug}&populate=*`)
  }
}

// FAQ API
export const faqApi = {
  getAll: async (params?: {
    sort?: string
    filters?: Record<string, any>
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    if (params?.sort) searchParams.append('sort', params.sort)
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value)
      })
    }

    searchParams.append('populate', '*')
    return apiRequest(`/faqs?${searchParams.toString()}`)
  }
}

// Team Members API
export const teamApi = {
  getAll: async (params?: {
    sort?: string
    filters?: Record<string, any>
  }): Promise<StrapiResponse<StrapiEntity[]>> => {
    const searchParams = new URLSearchParams()
    
    if (params?.sort) searchParams.append('sort', params.sort)
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}][$eq]`, value)
      })
    }

    searchParams.append('populate', '*')
    return apiRequest(`/team-members?${searchParams.toString()}`)
  }
}

// Site Settings API
export const settingsApi = {
  get: async (): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/site-setting?populate=*')
  }
}

// Contact API
export const contactApi = {
  submit: async (data: {
    name: string
    email: string
    subject?: string
    message: string
  }): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/contact-submissions', {
      method: 'POST',
      body: JSON.stringify({ data })
    })
  }
}

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string): Promise<StrapiResponse<StrapiEntity>> => {
    return apiRequest('/newsletter-subscribers', {
      method: 'POST',
      body: JSON.stringify({ 
        data: { 
          email,
          subscribedAt: new Date().toISOString()
        }
      })
    })
  }
}

// File Upload API
export const uploadApi = {
  uploadFile: async (file: File): Promise<any> => {
    const formData = new FormData()
    formData.append('files', file)

    return fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
      },
      body: formData
    }).then(res => res.json())
  }
}

// Export all APIs
export default {
  jobPositions: jobPositionsApi,
  heroSlides: heroSlidesApi,
  moments: momentsApi,
  testimonials: testimonialsApi,
  products: productsApi,
  faq: faqApi,
  team: teamApi,
  settings: settingsApi,
  contact: contactApi,
  newsletter: newsletterApi,
  upload: uploadApi
}
