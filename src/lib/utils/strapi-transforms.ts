// Utility functions to transform Strapi data into frontend-friendly formats

// Get image URL from Strapi media
export function getStrapiImageUrl(image: any): string {
  if (!image) return ''
  
  // Handle different Strapi media formats
  let imageData
  
  if (Array.isArray(image)) {
    // New format: array of media objects
    imageData = image[0]
  } else if (image.data) {
    // Old format: { data: { attributes: { url: ... } } }
    imageData = Array.isArray(image.data) ? image.data[0] : image.data
  } else if (image.url) {
    // Direct image object with url
    imageData = image
  } else {
    // Direct Strapi v5 format
    imageData = image
  }
  
  if (!imageData) return ''
  
  const imageUrl = imageData.attributes?.url || imageData.url
  
  if (!imageUrl) return ''
  
  // If URL is absolute, return as is, otherwise prepend Strapi base URL
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  const strapiUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_STRAPI_URL_PROD || 'https://api.nekonui.site'
      : process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
  return `${strapiUrl}${imageUrl}`
}

// Transform job position from Strapi to frontend format
export function transformJobPosition(strapiData: any) {
  if (!strapiData) return null
  
  // Strapi v5 uses direct fields (no attributes wrapper)
  const data = strapiData
  const id = strapiData.id || strapiData.documentId
  
  return {
    id: id.toString(),
    title: data.title || '',
    description: data.description || '',
    department: data.department || '',
    location: data.location || '',
    type: data.type || 'full-time',
    color: data.card_color || 'white',
    salaryRange: data.salaryRange || '',
    isActive: data.isActive !== false,
    requirements: data.requirements || [],
    benefits: data.benefits || [],
    canImage: getStrapiImageUrl(data.can_image) || '/images/duydinh-bg-2.png',
    bgImage: getStrapiImageUrl(data.background_image) || '/images/anh-hiep.png',
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

// Transform hero slide from Strapi to frontend format
export function transformHeroSlide(strapiData: any) {
  if (!strapiData) return null


  // Strapi v5 uses direct fields (no attributes wrapper)
  const data = strapiData
  const id = strapiData.id || strapiData.documentId
  
  // Handle rich text description format
  const description = Array.isArray(data.description) 
    ? data.description.map((block: any) => 
        block.children?.map((child: any) => child.text).join('') || ''
      ).join(' ')
    : data.description || ''
  
  return {
    id: id.toString(),
    title: data.title || '',
    subtitle: data.subtitle || '',
    description,
    image: getStrapiImageUrl(data.backgroundImage) || '/images/banner-1.webp', // fallback image
    ctaText: data.buttonText || '',
    ctaLink: data.buttonLink || '',
    order: data.order || 1,
    isActive: data.isActive !== false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

// Transform moment from Strapi to frontend format
export function transformMoment(strapiData: any) {
  if (!strapiData) return null


  // Strapi v5 uses direct fields (no attributes wrapper)
  const data = strapiData
  const id = strapiData.id || strapiData.documentId
  
  return {
    id: id.toString(),
    title: data.title || '',
    description: data.description || '',
    image: getStrapiImageUrl(data.image) || '/images/congty.jpg',
    date: data.date || data.createdAt,
    category: data.category || 'General',
    topPosition: data.topPosition || 100,
    leftPosition: data.leftPosition || 50,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

// Transform testimonial from Strapi to frontend format
export function transformTestimonial(strapiData: any) {
  if (!strapiData) return null


  // Strapi v5 uses direct fields (no attributes wrapper)
  const data = strapiData
  const id = strapiData.id || strapiData.documentId
  
  return {
    id: id.toString(),
    name: data.name || '',
    position: data.position || '',
    company: data.company || '',
    content: data.content || '',
    avatar: getStrapiImageUrl(data.avatar) || '/images/anh-hiep.png',
    rating: data.rating || 5,
    isActive: data.isActive !== false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

// Transform product from Strapi to frontend format
export function transformProduct(strapiData: any) {
  if (!strapiData) return null
  
  const { id, attributes } = strapiData
  
  return {
    id: id.toString(),
    name: attributes.name || '',
    description: attributes.description || '',
    shortDescription: attributes.short_description || '',
    price: attributes.price || 0,
    originalPrice: attributes.original_price || null,
    sku: attributes.sku || '',
    stock: attributes.stock || 0,
    isActive: attributes.is_active !== false,
    isFeatured: attributes.is_featured || false,
    images: attributes.images?.data?.map((img: any) => getStrapiImageUrl({ data: img })) || [],
    primaryImage: getStrapiImageUrl(attributes.primary_image) || '/images/product-1.webp',
    category: attributes.category?.data ? {
      id: attributes.category.data.id,
      name: attributes.category.data.attributes.name,
      slug: attributes.category.data.attributes.slug
    } : null,
    tags: attributes.tags?.data?.map((tag: any) => ({
      id: tag.id,
      name: tag.attributes.name,
      slug: tag.attributes.slug
    })) || [],
    specifications: attributes.specifications || [],
    features: attributes.features || [],
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt
  }
}

// Transform FAQ from Strapi to frontend format
export function transformFAQ(strapiData: any) {
  if (!strapiData) return null
  
  const { id, attributes } = strapiData
  
  return {
    id: id.toString(),
    question: attributes.question || '',
    answer: attributes.answer || '',
    category: attributes.category || 'General',
    order: attributes.order || 0,
    isActive: attributes.is_active !== false,
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt
  }
}

// Transform team member from Strapi to frontend format
export function transformTeamMember(strapiData: any) {
  if (!strapiData) return null
  
  const { id, attributes } = strapiData
  
  return {
    id: id.toString(),
    name: attributes.name || '',
    position: attributes.position || '',
    bio: attributes.bio || '',
    email: attributes.email || '',
    phone: attributes.phone || '',
    avatar: getStrapiImageUrl(attributes.avatar) || '/images/anh-hiep.png',
    socialLinks: {
      linkedin: attributes.linkedin_url || '',
      twitter: attributes.twitter_url || '',
      facebook: attributes.facebook_url || '',
      instagram: attributes.instagram_url || ''
    },
    department: attributes.department || '',
    isActive: attributes.is_active !== false,
    order: attributes.order || 0,
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt
  }
}

// Transform site settings from Strapi to frontend format
export function transformSiteSettings(strapiData: any) {
  if (!strapiData) return null
  
  const { attributes } = strapiData
  
  return {
    siteName: attributes.site_name || 'Matelibre',
    siteDescription: attributes.site_description || '',
    logo: getStrapiImageUrl(attributes.logo) || '/logo.svg',
    favicon: getStrapiImageUrl(attributes.favicon) || '/favicon.ico',
    contactInfo: {
      email: attributes.contact_email || '',
      phone: attributes.contact_phone || '',
      address: attributes.contact_address || '',
      workingHours: attributes.working_hours || ''
    },
    socialMedia: {
      facebook: attributes.facebook_url || '',
      instagram: attributes.instagram_url || '',
      twitter: attributes.twitter_url || '',
      linkedin: attributes.linkedin_url || '',
      youtube: attributes.youtube_url || ''
    },
    seo: {
      metaTitle: attributes.meta_title || '',
      metaDescription: attributes.meta_description || '',
      keywords: attributes.keywords || [],
      ogImage: getStrapiImageUrl(attributes.og_image) || ''
    },
    features: {
      enableNewsletter: attributes.enable_newsletter !== false,
      enableContactForm: attributes.enable_contact_form !== false,
      enableTestimonials: attributes.enable_testimonials !== false,
      enableBlog: attributes.enable_blog !== false
    },
    updatedAt: attributes.updatedAt
  }
}

// Generic transformer for collections
export function transformCollection<T>(
  strapiResponse: any,
  transformer: (item: any) => T
): {
  data: T[]
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
} {
  if (!strapiResponse) {
    return { data: [] }
  }

  const data = Array.isArray(strapiResponse.data) 
    ? strapiResponse.data.map(transformer).filter(Boolean)
    : [transformer(strapiResponse.data)].filter(Boolean)

  return {
    data,
    pagination: strapiResponse.meta?.pagination
  }
}

// Generic transformer for single items
export function transformSingle<T>(
  strapiResponse: any,
  transformer: (item: any) => T
): T | null {
  if (!strapiResponse?.data) {
    return null
  }

  return transformer(strapiResponse.data)
}

// Helper to extract error messages from Strapi errors
export function extractStrapiError(error: any): string {
  if (typeof error === 'string') {
    return error
  }

  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message
  }

  if (error?.message) {
    return error.message
  }

  return 'An unexpected error occurred'
}

// Helper to format dates
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Helper to format currency
export function formatCurrency(amount: number, currency = 'USD'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount)
  } catch {
    return `$${amount}`
  }
}

// Helper to truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Helper to generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Helper to validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper to get file extension
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

// Helper to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Export all transformers
export const transformers = {
  jobPosition: transformJobPosition,
  heroSlide: transformHeroSlide,
  moment: transformMoment,
  testimonial: transformTestimonial,
  product: transformProduct,
  faq: transformFAQ,
  teamMember: transformTeamMember,
  siteSettings: transformSiteSettings
}

export default transformers

