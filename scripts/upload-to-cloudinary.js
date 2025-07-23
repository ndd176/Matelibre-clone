// scripts/upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Heavy images to upload (>2MB)
const heavyImages = [
  'office-01.jpg',
  'team-building-02.webp',
  'team-building-03.webp',
  'table-05.webp',
  'table-02.webp',
  'sky-bg-01.webp',
  'sky-bg-02.webp',
  'sky-bg-03.webp',
  'tree-background-1.jpg',
  'tree-background-2.jpg',
  'tree-background-3.jpg',
  'tree-background-4.jpg',
  'congty.jpg',
  'congty-2.jpg',
  'ethan-background.jpg',
]

async function uploadImages() {
  console.log('🚀 Starting Cloudinary upload...')

  for (const imageName of heavyImages) {
    const imagePath = path.join(__dirname, '../public/images', imageName)

    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️ File not found: ${imageName}`)
      continue
    }

    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        public_id: imageName.split('.')[0], // Remove extension
        folder: 'matelibre', // Organize in folder
        quality: 'auto:good', // Auto quality optimization
        format: 'auto', // Auto format (WebP, AVIF)
        crop: 'limit',
        width: 1920,
        height: 1080,
        flags: ['progressive'],
      })

      console.log(`✅ Uploaded: ${imageName} -> ${result.public_id}`)
      console.log(
        `📏 Size: ${Math.round(result.bytes / 1024)}KB (was ${Math.round(fs.statSync(imagePath).size / 1024)}KB)`
      )
    } catch (error) {
      console.error(`❌ Failed to upload ${imageName}:`, error.message)
    }
  }

  console.log('🎉 Upload completed!')
}

// Run upload
uploadImages().catch(console.error)
