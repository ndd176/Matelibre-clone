// Simple test for API
const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:1337/api/hero-slides?populate=*')
    const data = await response.json()
    console.log('✅ API Test Success:', data)

    // Test transform
    const transformHeroSlide = strapiData => {
      if (!strapiData) return null

      const data = strapiData.attributes || strapiData
      const id = strapiData.id || strapiData.documentId

      const description = Array.isArray(data.description)
        ? data.description
            .map(block => block.children?.map(child => child.text).join('') || '')
            .join(' ')
        : data.description || ''

      return {
        id: id.toString(),
        title: data.title || '',
        subtitle: data.subtitle || '',
        description,
        image: '/images/banner-1.webp', // fallback
        ctaText: data.buttonText || '',
        ctaLink: data.buttonLink || '',
        order: data.order || 1,
        isActive: data.isActivate !== false,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      }
    }

    if (data.data && Array.isArray(data.data)) {
      const transformed = data.data.map(transformHeroSlide)
      console.log('✅ Transformed Data:', transformed)
    }
  } catch (error) {
    console.error('❌ API Test Failed:', error)
  }
}

testAPI()
