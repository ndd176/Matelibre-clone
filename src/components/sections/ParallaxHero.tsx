// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

// const slides = [
//   {
//     word: 'of energy',
//     image:
//       'https://images.unsplash.com/photo-1633528068279-a4bd0abab4a4?q=80&w=1528&auto=format&fit=crop',
//   },
//   {
//     word: 'of nature',
//     image:
//       'https://images.unsplash.com/photo-1627491760163-19e53d53568b?q=80&w=1170&auto=format&fit=crop',
//   },
//   {
//     word: 'of creativity',
//     image:
//       'https://images.unsplash.com/photo-1551970634-747846a548cb?q=80&w=1170&auto=format&fit=crop',
//   },
// ]

// export default function ParallaxHero() {
//   const ref = useRef(null)
//   const { scrollY } = useScroll()
//   const y = useTransform(scrollY, [0, 1000], [0, -1400])
//   const radius = useTransform(scrollY, [0, 300], ['0px', '40px'])
 
//   const [index, setIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slides.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section ref={ref} className="relative w-full h-screen overflow-hidden font-studio-pro">
//       {/* Background Parallax Image */}
// {/* Background Parallax Image */}
// <motion.div
//   key={index}
//   initial={{ opacity: 0, scale: 1.2 }}
//   animate={{ opacity: 1, scale: 1 }}
//   transition={{ duration: 1.5, ease: 'easeOut' }}
//   className="fixed inset-0 z-20 overflow-hidden"
//   style={{
//     y: y,
//     borderBottomLeftRadius: radius,
//     borderBottomRightRadius: radius,
//   }}
// >
//   {/* Ảnh nền */}
//   <motion.div
//     className="absolute inset-0 w-full h-full z-0"
//     style={{
//       backgroundImage: `url(${slides[index].image})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//     }}
//   />

//   {/* Overlay đen fade out */}
//   <motion.div
//     className="absolute inset-0 pointer-events-none z-10"
//     initial={{ opacity: 2 }}
//     animate={{ opacity: 0 }}
//     transition={{ duration: 5, ease: 'easeOut' }}
//     style={{
//       backgroundColor: 'rgba(0, 0, 0, 1)',
//       borderBottomLeftRadius: radius.get(),
//       borderBottomRightRadius: radius.get(),
//       transition: 'border-radius 0.3s',
//     }}
//   />
// </motion.div>




//       {/* Foreground Content */}
//       <motion.div
//         style={{ y: y }}
//         className="absolute top-1/3 left-8 md:left-16 z-30 text-white max-w-[700px] space-y-4"
//       >
// {['The ideal', 'dose'].map((line, i) => (
//   <motion.div
//     key={line}
//     initial={{ opacity: 0, y: 80, scale: 0.95 }}
//     animate={{
//       opacity: 1,
//       y: 0,
//       scale: 1,
//     }}
//     transition={{
//       delay: 0.3 + i * 0.1,
//       type: 'spring',
//       stiffness: 150, // mềm hơn
//       damping: 15,     // giảm dao động
//     }}
//     className="text-6xl md:text-7xl font-studio-pro-bold tracking-tight"
//       style={{ 
//     fontSize: '115px',
//     color: 'rgb(214, 214, 214)',
//     fontFamily: '"StudioProBold", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "segoe ui", "helvetica neue", helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif',
//     fontWeight: 400,
 
//   }}
//   >
//     {line}
//   </motion.div>
// ))}


// <motion.div
//   key={slides[index].word}
//   initial={{ opacity: 0, y: 80, scale: 0.95 }}
//   animate={{ opacity: 1, y: 0, scale: 1 }}
//   transition={{
//     delay: 0.5, // delay nhẹ sau 2 dòng đầu
//     type: 'spring',
//     stiffness: 150,
//     damping: 15,
//   }}
//   className="text-[110px] leading-none font-studio-pro-bold text-accent tracking-tight"
//   style={{
//     fontFamily: '"StudioProBold", sans-serif',
//     fontWeight: 400,
//   }}
// >
//   {slides[index].word}
// </motion.div>

//         {/* Discover Button */}
//         <motion.button
//           initial={{
//             width: 50,
//             height: 50,
//             borderRadius: '50%',
//             opacity: 0,
//             backgroundColor: '#ffffff',
//           }}
//           animate={{
//             width: 160,
//             height: 54,
//             borderRadius: '9999px',
//             opacity: 1,
//             transition: {
//               delay: 1.4,
//               duration: 0.6,
//               ease: 'easeInOut',
//             },
//           }}
//           className="text-black font-studio-pro-bold overflow-hidden relative px-6 mt-8 shadow"
//         >
//           <motion.span
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{
//               opacity: 1,
//               scale: 1,
//               transition: {
//                 delay: 1.7,
//                 duration: 0.4,
//                 ease: 'easeOut',
//               },
//             }}
//           >
//             discover
//           </motion.span>
//         </motion.button>
//       </motion.div>
      
//     </section>
    
//   )
// }
        {/* Final word */}
        {/* <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.5,
            type: 'spring',
            stiffness: 150,
            damping: 15,
          }}
          className="text-[110px] leading-none font-studio-pro-bold text-accent tracking-tight"
          style={{
            fontFamily: '"StudioProBold", sans-serif',
            fontWeight: 400,
          }}
        >
          of energy
        </motion.div> */}


//tạm thời chỉ dùng 1 ảnh
// 'use client'


import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { WEBSITE_IMAGES } from '../../lib/fast-images'
import ScrollDiscoverIndicator from '../ui/ScrollDiscoverIndicator'

export default function ParallaxHero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onResize = () => setIsMobile(window.innerWidth < 768);
      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);
  const y = useTransform(scrollY, [0, 1000], isMobile ? [0, -700] : [0, -1400]);
  const radius = useTransform(scrollY, [0, 300], ['0px', '40px']);

  // Use background image from WEBSITE_IMAGES (Cloudinary optimized)
  // const backgroundImageUrl = WEBSITE_IMAGES.hero.main
    const backgroundImageUrl = "https://res.cloudinary.com/dbtvr8qyd/image/upload/v1753426246/IMG_1011_wokgym.webp"


  return (
    <section
      ref={ref}
      className="absolute top-0 left-0 w-full h-screen overflow-hidden font-studio-pro z-30"
    >
      {/* Background Parallax Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 z-20 overflow-hidden"
        style={{
          y: y,
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
          willChange: 'transform',
        }}
      >
        {/* Background image - Responsive optimization */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src={backgroundImageUrl}
            alt="Hero Background"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            className="object-cover object-center sm:object-center md:object-center"
            style={{
              objectPosition: 'center 30%', // Tối ưu vị trí ảnh cho mobile
            }}
          />
        </div>
        {/* Dark overlay - Responsive opacity */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          initial={{ opacity: 1.5 }}
          animate={{ opacity: 0.4 }} // Giảm opacity cho mobile để ảnh sáng hơn
          transition={{ duration: 3, ease: 'easeOut' }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 1)',
            borderBottomLeftRadius: radius.get(),
            borderBottomRightRadius: radius.get(),
            transition: 'border-radius 0.3s',
          }}
        />
      </motion.div>

      {/* Foreground Content - Mobile optimized */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 sm:top-1/3 left-0 w-full px-4 sm:px-6 md:px-12 lg:px-24 z-30 text-white"
      >
        <div className="max-w-screen-xl mx-auto space-y-3 sm:space-y-6">
          {/* Text lines - Responsive sizing and positioning */}
          {['NỘP CV', 'CHẦN CHỜ CHI!'].map((line, i) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.3 + i * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 10,
              }}
              className="font-studio-pro-bold text-[30px] tracking-tight text-left"
              style={{
                fontSize: 'clamp(28px, 6vw, 96px)',
                fontWeight: 400,
                fontFamily: '"StudioProBold"',
                lineHeight: '0.9',
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Down Indicator - Đặt dưới khung ảnh */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-40">
        <ScrollDiscoverIndicator />
      </div>
    </section>
  )
}

