'use client'

import { useParams } from 'next/navigation'
import { useState, useLayoutEffect } from 'react' // Thay useEffect bằng useLayoutEffect
import ProductDetailWithAccordion from '../../../components/features/careers/ProductAccordionSection'
import ProductCarouselHover from '../../../components/features/careers/ProductCarouselHover'
import CVSubmissionForm from '../../../components/CVSubmissionForm'
 
export default function CareersDetailPage() {
  const params = useParams()
  const jobId = params.id as string
  const [isCVFormOpen, setIsCVFormOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState('')

  // Sử dụng useLayoutEffect để scroll to top ngay khi component được render
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, []) // Chỉ chạy một lần khi component mount

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
       
       <CVSubmissionForm
         isOpen={isCVFormOpen}
         position={selectedPosition}
         onClose={() => setIsCVFormOpen(false)}
       />
       {/* <FindYourDream/> */}
    </>
  )
}