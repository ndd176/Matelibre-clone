import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const url = `${STRAPI_URL}/api/jobs?populate=*`;


    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });


    if (!response.ok) {
      const errorText = await response.text();
      
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    
    // Transform data to only include fields needed for homepage
    const transformedJobs = data.data.map((job: any) => ({
      id: job.id,
      documentId: job.documentId,
      job_title: job.job_title,
      short_description: job.short_description,
      avatar_image: job.avatar_image,
      sub_avatar: job.sub_avatar,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      publishedAt: job.publishedAt
    }));

    return NextResponse.json({
      data: transformedJobs,
      meta: data.meta
    });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

