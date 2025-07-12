// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
})

// Direct API functions
export const strapiApi = {
  async fetchHeroSlides() {
    const response = await fetch(`${API_BASE_URL}/api/hero-slides?populate=backgroundImage`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error(`Failed to fetch hero slides: ${response.status}`)
    return response.json()
  },

  async fetchJobPositions() {
    const response = await fetch(`${API_BASE_URL}/api/job-positions`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error(`Failed to fetch job positions: ${response.status}`)
    return response.json()
  },

  async fetchMoments() {
    const response = await fetch(`${API_BASE_URL}/api/moments?populate=image`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error(`Failed to fetch moments: ${response.status}`)
    return response.json()
  },

  async fetchTestimonials() {
    const response = await fetch(`${API_BASE_URL}/api/testimonials?populate=avatar`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error(`Failed to fetch testimonials: ${response.status}`)
    return response.json()
  },

  async fetchJobDetails() {
    const response = await fetch(`${API_BASE_URL}/api/job-details?populate=*`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error(`Failed to fetch job details: ${response.status}`)
    return response.json()
  },

  async fetchJobDetailById(jobId: string) {
    const response = await fetch(`${API_BASE_URL}/api/job-details?filters[job][id][$eq]=${jobId}&populate=*`, {
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch job detail: ${response.status}`)
    }

    return response.json()
  },

  async fetchJobs() {
    const response = await fetch(`${API_BASE_URL}/api/jobs?populate=*`, {
      headers: getHeaders()
    })
    if (!response.ok) throw new Error(`Failed to fetch jobs: ${response.status}`)
    return response.json()
  }
}
