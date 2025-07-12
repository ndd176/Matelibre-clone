// app/careers/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import ProductDetailWithAccordion from '../../../components/features/careers/ProductAccordionSection'
import ProductCarouselHover from '../../../components/features/careers/ProductCarouselHover'
 
export default function CareersDetailPage() {
  const params = useParams()
  const jobId = params.id as string

  return (
    <>
       <ProductDetailWithAccordion jobId={jobId} />
       <ProductCarouselHover/>
    </>
  )
}
