// 'use client'

// import { useState, useRef, useLayoutEffect, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// // Import API và types từ lib structure
// import { strapiApi } from '../../lib/api/strapi'
// import { JobDetail } from '../../types/api/strapi'
// import { getImageUrl } from '../../lib/utils/image'
// import { IMAGE_CONFIG } from '../../lib/constants/index'

// // Fallback data nếu API không có dữ liệu
// const fallbackAccordionData = [
//   {
//     title: 'What you’ll be doing',
//     content: [
//       'Designing embroidery mockups and product visuals for e-commerce listings',
//       'Creating branding materials and social media assets for campaigns',
//       'Collaborating with marketing and production teams to ensure brand consistency',
//       'Optimizing design workflows for scalable product customization',
//     ],
//   },
//   {
//     title: 'What we’re looking for',
//     content: [
//       'Proficiency in Adobe Illustrator, Photoshop or equivalent design tools',
//       'Experience in embroidery or print-ready artwork is a big plus',
//       'Creative thinking, attention to detail, and an eye for clean aesthetics',
//       'Basic knowledge of layout for online stores (Shopify, Etsy, etc.)',
//     ],
//   },
//   {
//     title: 'Perks & vibes',
//     content: [
//       'Flexible schedule and hybrid work options',
//       'Friendly, fast-paced creative team environment',
//       'Room to grow in a scaling DTC brand',
//       'Employee discounts on custom apparel & patches',
//     ],
//   },
// ]

// function AccordionItem({ title, content, isOpen, onClick }: any) {
//   const ref = useRef<HTMLDivElement>(null)
//   const [height, setHeight] = useState(0)

//   useLayoutEffect(() => {
//     if (ref.current) {
//       setHeight(ref.current.scrollHeight)
//     }
//   }, [isOpen])

//   return (
//     <div className="border-2 border-green-800 rounded-[24px] overflow-hidden transition-all">
//       <button
//         className="w-full text-left px-6 py-4 text-green-900 font-bold text-lg flex justify-between items-center"
//         onClick={onClick}
//       >
//         {title}
//         <span className="text-xl">{isOpen ? '−' : '+'}</span>
//       </button>

//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height, opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.35, ease: 'easeInOut' }}
//             className="overflow-hidden"
//           >
//             <div ref={ref} className="px-8 pb-5 pt-2 text-green-800 text-sm">
//               <ul className="list-disc list-inside space-y-1">
//                 {content.map((point: string, i: number) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// export default function ProductDetailWithAccordion({ 
//   jobId, 
//   onApplyClick 
// }: { 
//   jobId?: string,
//   onApplyClick?: (position: string) => void 
// }) {
//   const [openIndex, setOpenIndex] = useState(-1)
//   const [accordionData, setAccordionData] = useState(fallbackAccordionData)
//   const [jobData, setJobData] = useState<JobDetail | null>(null)
//   const [loading, setLoading] = useState(true)

//   const toggleIndex = (index: number) => {
//     setOpenIndex(prev => (prev === index ? -1 : index))
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response
        
//         if (jobId) {
//           // Fetch specific job detail by job ID
//           response = await strapiApi.fetchJobDetailById(jobId)
//         } else {
//           // Fetch all job details (fallback to first one)
//           response = await strapiApi.fetchJobDetails()
//         }
        
//         if (response.data && response.data.length > 0) {
//           // Lấy job detail (specific one hoặc đầu tiên)
//           const jobDetail = response.data[0]
          
          
//           setJobData(jobDetail)
          
//           // Xử lý 3 trường question_1, question_2, question_3
//           const apiAccordionData = [
//             {
//               title: "Question 1",
//               content: jobDetail.question_1
//                 ? jobDetail.question_1.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
//                 : ["No data"],
//             },
//             {
//               title: "Question 2",
//               content: jobDetail.question_2
//                 ? jobDetail.question_2.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
//                 : ["No data"],
//             },
//             {
//               title: "Question 3",
//               content: jobDetail.question_3
//                 ? jobDetail.question_3.split('\n').map((item: string) => item.trim()).filter((item: string) => item.length > 0)
//                 : ["No data"],
//             },
//           ]
//           setAccordionData(apiAccordionData)
//         } else {
//           setAccordionData(fallbackAccordionData)
//         }
//       } catch (error) {
//         console.error('Error fetching job details:', error)
        
//         setAccordionData(fallbackAccordionData)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [jobId])

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setOpenIndex(0)
//     }, 1100)
//     return () => clearTimeout(timer)
//   }, [])

//   return (
// <section className="bg-[#e6f3e6] px-4 md:px-20 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
//           {loading ? (
//             <div className="w-full text-center py-20">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//               <p className="text-green-800 font-medium">Loading job details...</p>
//             </div>
//           ) : (
//             <>
//               {/* LEFT: Content */}
//               <div className="w-full md:w-1/2 font-bold max-w-2xl mx-auto min-h-[2000px]">
//             <div className="flex flex-col gap-0">
//               {jobData?.job_title ? 
//                 jobData.job_title.toLowerCase().split(' ').map((word: string, i: number) => (
//                   <motion.h1
//                     key={i}
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.15, duration: 0.5 }}
//                     viewport={{ once: true }}
//                     className="font-bold text-[48px] sm:text-[64px] md:text-[96px] lg:text-[110px] leading-[1] text-green-800"
//                   >
//                     {word}
//                   </motion.h1>
//                 )) :
//                 ['creative', 'design', 'role'].map((line, i) => (
//                   <motion.h1
//                     key={i}
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: i * 0.15, duration: 0.5 }}
//                     viewport={{ once: true }}
//                     className="font-bold text-[48px] sm:text-[64px] md:text-[96px] lg:text-[110px] leading-[1] text-green-800"
//                   >
//                     {line}
//                   </motion.h1>
//                 ))
//               }
//             </div>

//             <motion.div
//               className="flex justify-between text-sm sm:text-base pt-8 pb-10 gap-4 flex-wrap"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               {/* {jobData?.text_icon && jobData.text_icon.length > 0 ? 
//                 jobData.text_icon.map((item: any, index: number) => (
//                   <Feature key={index} icon={item.icon} label={item.text} />
//                 )) :
//                 <>
//                   <Feature icon="🎨" label="Creative freedom" />
//                   <Feature icon="🧵" label="Embroidery design" />
//                   <Feature icon="🚀" label="Fast-paced team" />
//                 </>
//               } */}
//             </motion.div>

//             <motion.div
//               className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pb-8"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               {/* Apply Now Button */}
//               <button
//                 onClick={() => onApplyClick?.(jobData?.job_title || 'Unknown Position')}
//                 className="group relative bg-[#2c5530] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-[#1e3b22] hover:scale-105 hover:shadow-lg active:scale-95"
//               >
//                 <span className="flex items-center gap-3">
//                   Ứng tuyển
//                   <motion.div
//                     className="inline-block"
//                     whileHover={{ x: 5 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 10 }}
//                   >
//                     →
//                   </motion.div>
//                 </span>
                
//                 {/* Hover effect overlay */}
//                 <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>

//               <div className="text-green-900 text-base leading-snug">
//                 <p className="text-lg sm:text-xl font-semibold">
//                   {jobData?.salary_range ? `💰 ${jobData.salary_range}` : 'Full-time or freelance'}
//                 </p>
//                 <p className="opacity-70 text-sm">📍 Based in Vietnam or remote</p>
//                 {jobData?.job_title && (
//                   <p className="opacity-70 text-sm mt-1">🎯 {jobData.job_title} Position</p>
//                 )}
//               </div>
//             </motion.div>

//             <div className="space-y-4">
//               {accordionData.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.6, duration: 0.5 }}
//                   viewport={{ once: true }}
//                 >
//                   <AccordionItem
//                     title={item.title}
//                     content={item.content}
//                     isOpen={openIndex === index}
//                     onClick={() => toggleIndex(index)}
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT: Image - Sticky */}
//  <div className="w-full max-w-4xl gap-6 mx-auto">
//   <div className="h-[2000px] bg-red-100">Filler content</div>

//     <div className="sticky top-24">
//       <motion.div
//         initial={{ y: 200, scale: 0.2, borderRadius: '50%', backgroundColor: '#14532d' }}
//         animate={{ y: 0, scale: 1, borderRadius: '32px', backgroundColor: 'transparent' }}
//         transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
//         viewport={{ once: true }}
//         className="w-full mx-auto relative"
//       >
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.7 }}
//           className="w-full h-auto"
//         >
//           <div className="w-full h-auto">
//             <img
//               src={getImageUrl(jobData?.job_image)}
//               alt={jobData?.job_title || "job position"}
//               className="w-full h-auto object-cover rounded-[32px]"
//               onError={(e) => {
//                 console.error('Image failed to load:', getImageUrl(jobData?.job_image))
//                 e.currentTarget.src = "/images/position.jpg"
//               }}
//             />
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   </div>
//             </>
//           )}
//     </section>
//   )
// }

// function Feature({ icon, label }: { icon: string; label: string }) {
//   return (
//     <div className="flex flex-col items-center text-green-800 text-sm min-w-[100px]">
//       <div className="text-[50px]">{icon}</div>
//       <p className="mt-1 text-center text-[16px] whitespace-nowrap">{label}</p>
//     </div>
//   )
// }
