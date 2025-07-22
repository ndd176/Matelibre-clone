import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/job-details?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform data to include all detail fields
    const transformedJobDetails = data.data.map((jobDetail: any) => ({
      id: jobDetail.id,
      documentId: jobDetail.documentId,
      job_title: jobDetail.job_title,
      salary_range: jobDetail.salary_range,
      overview: jobDetail.overview,
      requirements: jobDetail.requirements,
      benefits: jobDetail.benefits,
      job_image: jobDetail.job_image,
      years_experience: jobDetail.years_experience,
      level: jobDetail.level,
      // Relation to main job
      job: jobDetail.job,
      createdAt: jobDetail.createdAt,
      updatedAt: jobDetail.updatedAt,
      publishedAt: jobDetail.publishedAt
    }));

    return NextResponse.json({
      data: transformedJobDetails,
      meta: data.meta
    });

  } catch (error) {
    console.error('Error fetching job details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job details' },
      { status: 500 }
    );
  }
}

