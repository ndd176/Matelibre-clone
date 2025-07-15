// app/careers/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import ProductDetailWithAccordion from '../../../components/features/careers/ProductAccordionSection'
import ProductCarouselHover from '../../../components/features/careers/ProductCarouselHover'
import CVSubmissionForm from '../../../components/CVSubmissionForm'
 
export default function CareersDetailPage() {
  const params = useParams()
  const jobId = params.id as string
  const [isCVFormOpen, setIsCVFormOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState('')

  const handleApplyClick = (position: string) => {
    setSelectedPosition(position)
    setIsCVFormOpen(true)
  }

  return (
    <>
       <ProductDetailWithAccordion 
         jobId={jobId} 
         onApplyClick={handleApplyClick}
       />
       <ProductCarouselHover/>
       
       {/* CV Submission Form */}
       <CVSubmissionForm
         isOpen={isCVFormOpen}
         position={selectedPosition}
         onClose={() => setIsCVFormOpen(false)}
       />
    </>
  )
}
