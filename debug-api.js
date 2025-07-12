// Simple script to test Strapi API endpoints
async function testEndpoints() {
  const baseUrl = 'http://localhost:1337/api'

  const endpoints = ['/hero-slides', '/hero-slide', '/slide', '/slides']

  for (const endpoint of endpoints) {
    try {
      console.log(`\n=== Testing ${baseUrl}${endpoint} ===`)
      const response = await fetch(`${baseUrl}${endpoint}`)
      console.log(`Status: ${response.status} ${response.statusText}`)

      if (response.ok) {
        const data = await response.json()
        console.log('Success! Data:', JSON.stringify(data, null, 2))
      } else {
        console.log('Failed!')
      }
    } catch (error) {
      console.log('Error:', error.message)
    }
  }
}

testEndpoints()
