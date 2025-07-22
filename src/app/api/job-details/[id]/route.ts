import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, props: Props) {
  try {
    const params = await props.params;
    const { id } = params;
    
    const response = await fetch(`${STRAPI_URL}/api/job-details/${id}?populate=*`, {
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
    
    if (!data.data) {
      return NextResponse.json(
        { error: 'Job detail not found' },
        { status: 404 }
      );
    }

    const jobDetail = data.data;
    
    // Transform single job detail data
    const transformedJobDetail = {
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
    };

    return NextResponse.json({
      data: transformedJobDetail
    });

  } catch (error) {
    console.error('Error fetching job detail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job detail' },
      { status: 500 }
    );
  }
}
