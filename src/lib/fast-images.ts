// lib/fast-images.ts

export const FAST_IMAGE_SOURCES = {
  cloudinary: (publicId: string, width?: number, height?: number) =>
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto${width ? `,w_${width}` : ''}${height ? `,h_${height}` : ''}/${publicId}`,
  unsplash: (id: string, width?: number, height?: number) => 
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}&q=80`,
    pexels: (id: string, width?: number, height?: number) =>
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`,
}

export const WEBSITE_IMAGES = {
  hero: {
    main: FAST_IMAGE_SOURCES.cloudinary('IMG_1011_wokgym'), // Cloudinary optimized
    // https://res.cloudinary.com/dbtvr8qyd/image/upload/v1753426246/IMG_1011_wokgym.webp
    office: FAST_IMAGE_SOURCES.cloudinary('tree-background2', 1920, 1080), // Cloudinary optimized  
    team: FAST_IMAGE_SOURCES.cloudinary('team-building-02', 1920, 1080), // Cloudinary optimized
  },
  company: {
    building: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&h=600&q=80',
    meeting: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&h=600&q=80',
    workspace: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&h=600&q=80',
  },
  positions: {
    developer: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&h=300&q=80',
    designer: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=400&h=300&q=80',
    marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&h=300&q=80',
    sales: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=400&h=300&q=80',
  },
  
  // Moments/Table images - Cloudinary optimized
  moments: {
    table1: FAST_IMAGE_SOURCES.cloudinary('moment-05_v2jzsc'),
    table3: FAST_IMAGE_SOURCES.cloudinary('moment-01_nxjuii'),
    table2: FAST_IMAGE_SOURCES.cloudinary('moment-02_koivr2'), 
    table5: FAST_IMAGE_SOURCES.cloudinary('moment-04_kyqaia'),
    table4: FAST_IMAGE_SOURCES.cloudinary('moment-03_ydmion'),
   },
  team: {
    person1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7a76ef1?auto=format&fit=crop&w=300&h=300&q=80',
    person2: 'https://images.unsplash.com/photo-1494790108755-2616c769e3b1?auto=format&fit=crop&w=300&h=300&q=80',
    person3: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80',
    person4: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&h=300&q=80',
  },
  
  backgrounds: {
    abstract: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&h=1080&q=80',
    geometric: 'https://images.unsplash.com/photo-1557683304-673a23048d34?auto=format&fit=crop&w=1920&h=1080&q=80',
    gradient: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1920&h=1080&q=80',
    // https://res.cloudinary.com/dbtvr8qyd/image/upload/v1753417680/moment-bg-02_itxsc3.webp
  }

}

export function getOptimizedUrl(originalUrl: string, width?: number, height?: number) {
  // Nếu là local image, chuyển sang external
  if (originalUrl.startsWith('/images/')) {
    const filename = originalUrl.split('/').pop()?.split('.')[0]
    
    // Map local images sang external equivalents
    const imageMap: Record<string, string> = {
      // Hero và banner images
      'hero-image': WEBSITE_IMAGES.hero.main,
      'hero-background': WEBSITE_IMAGES.hero.office,
      'banner-1': WEBSITE_IMAGES.hero.team,
      'main-banner': WEBSITE_IMAGES.hero.main,
      'join-with-us-02': WEBSITE_IMAGES.hero.office,
      
      // Company images
      'company-logo': WEBSITE_IMAGES.company.building,
      'company-building': WEBSITE_IMAGES.company.building,
      'congty': WEBSITE_IMAGES.company.meeting,
      'office-space': WEBSITE_IMAGES.company.workspace,
      
      // Job position images
      'position': WEBSITE_IMAGES.positions.developer,
      'duydinh-bg-2': WEBSITE_IMAGES.positions.designer,
      'product-1': WEBSITE_IMAGES.positions.marketing,
      'tree-background-1': WEBSITE_IMAGES.backgrounds.abstract,
      
      // Table/moments images
      'table-01': WEBSITE_IMAGES.moments.table1,
      'table-02': WEBSITE_IMAGES.moments.table2,
      'table-03': WEBSITE_IMAGES.moments.table3,
      'table-04': WEBSITE_IMAGES.moments.table4,
      'table-05': WEBSITE_IMAGES.moments.table5,
      
      // Team member images
      'anh-hiep': WEBSITE_IMAGES.team.person1,
      'default-avatar': WEBSITE_IMAGES.team.person2,
      'team-photo': WEBSITE_IMAGES.company.meeting,
      
      // Background images
      'background-1': WEBSITE_IMAGES.backgrounds.geometric,
      'abstract-bg': WEBSITE_IMAGES.backgrounds.gradient,
    }
    
    const mappedUrl = imageMap[filename || '']
    if (mappedUrl) {
      // Add size parameters if provided
      if (width || height) {
        const separator = mappedUrl.includes('?') ? '&' : '?'
        let sizeParams = ''
        if (width) sizeParams += `w=${width}`
        if (height) sizeParams += `${sizeParams ? '&' : ''}h=${height}`
        return `${mappedUrl}${separator}${sizeParams}`
      }
      return mappedUrl
    }
  }
  
  return originalUrl
}

// Preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    WEBSITE_IMAGES.hero.main,
    WEBSITE_IMAGES.company.building,
    WEBSITE_IMAGES.company.meeting,
  ]
  
  criticalImages.forEach(url => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = url
    document.head.appendChild(link)
  })
}
