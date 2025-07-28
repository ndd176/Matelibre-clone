// app/api/sitemap/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const pages = [
    '', 'about', 'careers', 'community', 'contact'
  ]

  const baseUrl = 'https://ethanecom.com'
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`
      )
      .join('')}
  </urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
