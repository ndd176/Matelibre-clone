// 'use client'

// import Image from 'next/image'
// import { FaQuoteLeft } from 'react-icons/fa'
// import { motion, useScroll, useTransform } from 'framer-motion'
// import { useRef } from 'react'

// export default function TestimonialFloating() {
//   const containerRef = useRef(null)
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start end', 'end start'],
//   })

//   // Parallax transforms
//   const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])
//   const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
// // Bay lên, mờ dần
// const floatUp = useTransform(scrollYProgress, [0.1, 0.6], ['0%', '-120%'])
// const floatOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0])
// const floatScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 0.9])

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden bg-white"
//     >
//       {/* Wrapper để căn giữa 2 khối */}
//       <div className="relative w-full max-w-screen-xl h-[600px]">
//         {/* Image block */}
//         <motion.div
//         style={{ y: floatUp, opacity: floatOpacity, scale: floatScale }}
//           className="absolute top-0 left-0 w-[55%] h-full rounded-[40px] overflow-hidden shadow-xl"
//         >
//           <Image
//             src="/images/banner-1.webp"
//             alt="Floating Testimonial"
//             fill
//             className="object-cover"
//           />
//         </motion.div>

//         {/* Text block */}
//         <motion.div
//           style={{ y: textY }}
//           className="absolute top-0 right-0 w-[60%] md:w-[55%] h-full bg-[#f6f6f6] rounded-[40px] shadow-xl p-8 md:p-14 flex flex-col justify-center"
//         >
//           <FaQuoteLeft className="text-3xl text-black mb-4" />
//           <p className="text-black text-xl md:text-2xl font-studio-pro-bold leading-snug">
//             Our vision extends beyond mere “mate” sales. We aspire to give
//             individuals the energy to feel free. Through our mission, to support
//             artists, athletes, communities, and all who embody the essence of
//             Canada’s DNA.
//           </p>
//           <p className="text-black font-studio-pro mt-4">Edouard</p>
//         </motion.div>
//       </div>
//     </section>
//   )
// }
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function FloatingCards() {
  const containerRef = useRef(null)
  const { scrollXProgress } = useScroll({
    container: containerRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  })

  // Chỉ cần 5 transforms cho 5 cards
  const transforms = Array.from({ length: 5 }, (_, i) => ({
    y: useTransform(scrollXProgress, [0, 1], ['0%', `${-40 - i * 15}px`]),
    rotate: useTransform(scrollXProgress, [0, 1], ['0deg', `${i % 2 === 0 ? '-' : ''}${3 + i}deg`]),
    scale: useTransform(scrollXProgress, [0, 1], [1, 1 + i * 0.01 + 0.03]),
  }))

  return (
    <section className="w-full overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide px-20 py-40 relative">
      <div
        ref={containerRef}
        className="flex gap-20 w-max relative h-[500px]"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {transforms.map((t, index) => (
          <motion.div
            key={index}
            style={{
              y: t.y,
              rotate: t.rotate,
              scale: t.scale,
            }}
            className="w-[350px] h-[500px] shrink-0 rounded-[40px] overflow-hidden relative scrollSnap-align-start shadow-xl"
          >
            <Image
              src={`/images/banner-${(index % 3) + 1}.webp`}
              alt={`Card ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
//'use client'
// import { useEffect, useRef, useState } from 'react'
// import Lenis from '@studio-freight/lenis'
// import { motion, useInView } from 'framer-motion'
// import Image from 'next/image'

// // Hook tự định nghĩa
// function useWindowSize() {
//   const [size, setSize] = useState({ width: 0, height: 0 })
//   useEffect(() => {
//     const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight })
//     updateSize()
//     window.addEventListener('resize', updateSize)
//     return () => window.removeEventListener('resize', updateSize)
//   }, [])
//   return size
// }

// // Dữ liệu
// const items = [
//   { src: '/images/banner-1.webp', top: 899, left: 134, w: 575, h: 781, speed: 0.08 },
//   { src: '/images/banner-1.webp', top: 1461, left: 1348, w: 642, h: 859, speed: 0.1 },
//   { src: '/images/banner-1.webp', top: 2100, left: 630, w: 584, h: 782, speed: 0.07 },
//   { src: '/images/banner-1.webp', top: 3101, left: 1062, w: 642, h: 863, speed: 0.12 },
//   { src: '/images/banner-1.webp', top: 3665, left: 129, w: 585, h: 779, speed: 0.09 },
//   { src: '/images/banner-1.webp', top: 4390, left: 1370, w: 583, h: 774, speed: 0.2 },
//   {
//     text: 'We are a design company that helps brands define and thrive in culture. Creating influential strategy, brand identity, packaging design and communications.',
//     top: 200,
//     left: 1000,
//     speed: 0.15,
//     type: 'text',
//   },
// ]

// export default function FloatingImageLayout() {
//   const { width } = useWindowSize()
//   const isMobile = width < 768
//   const imageRefs = useRef<(HTMLDivElement | null)[]>([])

//   // Lenis
//   useEffect(() => {
//     const lenis = new Lenis({ lerp: 0.1 })
//     const raf = (time: number) => {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }
//     requestAnimationFrame(raf)
//     return () => lenis.destroy()
//   }, [])

//   // Scroll parallax logic
//   useEffect(() => {
//     const onScroll = () => {
//       imageRefs.current.forEach((el, idx) => {
//         if (!el || !items[idx] || 'text' in items[idx]) return
//         const rect = el.getBoundingClientRect()
//         const windowHeight = window.innerHeight
//         const clamped = Math.max(0, Math.min(1, 1 - rect.top / windowHeight))
//         const inner = el.querySelector('.inner-scroll') as HTMLElement | null
//         if (inner) {
//           const speed = items[idx].speed || 0.1
//           inner.style.transform = `translateY(-${clamped * speed * 600}px)` // điều chỉnh tốc độ rõ hơn
//         }
//       })
//     }
//     window.addEventListener('scroll', onScroll)
//     window.addEventListener('resize', onScroll)
//     onScroll()
//     return () => {
//       window.removeEventListener('scroll', onScroll)
//       window.removeEventListener('resize', onScroll)
//     }
//   }, [])

//   // Tính chiều cao thực tế
//   const maxHeight = Math.max(...items.map(i => ('text' in i ? i.top + 300 : i.top + i.h)))

//   return (
//     <section className="relative overflow-hidden bg-white" style={{ height: maxHeight + 800 }}>
//       <div className="sticky top-0 h-screen w-full">
//         {items.map((item, index) => {
//           if ('text' in item) {
//             const ref = useRef(null)
//             const inView = useInView(ref, { amount: 0.5, once: false })
//             const lines = typeof item.text === 'string' ? item.text.split('. ') : []
//             if (isMobile) {
//               return (
//                 <div key={index} className="px-4 py-8">
//                   <p className="text-lg text-black leading-relaxed">{item.text}</p>
//                 </div>
//               )
//             }
//             return (
//               <div
//                 key={index}
//                 ref={ref}
//                 style={{ position: 'absolute', top: `${item.top}px`, left: `${item.left}px` }}
//               >
//                 <motion.div
//                   className="space-y-4 w-[500px]"
//                   initial="hidden"
//                   animate={inView ? 'visible' : 'hidden'}
//                   variants={{ hidden: {}, visible: {} }}
//                 >
//                   {lines.map((line, i) => (
//                     <motion.p
//                       key={i}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={inView ? { opacity: 1, y: 0 } : {}}
//                       transition={{ delay: i * 0.3, duration: 0.6, ease: 'easeOut' }}
//                       className="text-black text-[32px] leading-tight font-semibold"
//                     >
//                       {line.trim()}.
//                     </motion.p>
//                   ))}
//                 </motion.div>
//               </div>
//             )
//           }

//           if (isMobile) {
//             return (
//               <div key={index} className="p-4">
//                 <Image
//                   src={item.src}
//                   alt={`Floating ${index}`}
//                   width={item.w / 2}
//                   height={item.h / 2}
//                   className="rounded-xl shadow-md object-cover w-full h-auto"
//                 />
//               </div>
//             )
//           }

//           return (
//             <div
//               key={index}
//               className="absolute overflow-hidden rounded-[30px] shadow-xl"
//               style={{
//                 top: `${item.top}px`,
//                 left: `${item.left}px`,
//                 width: `${item.w}px`,
//                 height: `${Math.min(800, item.h)}px`,
//               }}
//               ref={el => { imageRefs.current[index] = el }}
//             >
//             <div
//               className="relative w-full inner-scroll"
//               style={{
//                 height: '800px',
//                 transition: 'transform 0.1s linear',
//               }}
//             >
//               <div
//                 className="relative w-full h-full" // h-full để chiều cao = 800px
//                 style={{ 
//                   width: '100%',
//                   height: '100%' // Đảm bảo div con cũng có chiều cao full
//                 }}
//               >
//                 <Image
//                   src={item.src}
//                   alt={`Floating ${index}`}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>

//             </div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }
