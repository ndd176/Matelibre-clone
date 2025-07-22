'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
export default function StickyHeader() {
    const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const [isExiting, setIsExiting] = useState(false)
const handleToggleMenu = () => {
  if (isMenuOpen) {
    // bắt đầu hiệu ứng exit
    setIsExiting(true)

    // đợi 500ms rồi tắt menu (sau khi hiệu ứng overlay chạy xong)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsExiting(false)
    }, )
  } else {
    setIsMenuOpen(true)
  }
}
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsAtTop(currentY <= 0)
      const scrollingUp = currentY < lastScrollY
      
      // Hiển thị header ngay lập tức khi scroll up hoặc ở đầu trang
      if (scrollingUp || currentY <= 0) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
      
      setLastScrollY(currentY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <>
       
<motion.header
  initial={{ y: -100 }}
  animate={{
    y: isMenuOpen ? -100 : showHeader ? 0 : -100,
    borderBottomLeftRadius: showHeader ? 0 : 30,
    borderBottomRightRadius: showHeader ? 0 : 30,
  }}
  transition={{
    duration: 0.5,
    ease: 'easeInOut',
    borderBottomLeftRadius: { duration: 0.3, ease: 'easeInOut' },
    borderBottomRightRadius: { duration: 0.3, ease: 'easeInOut' },
  }}
  className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ease-in-out
    hidden md:flex
    ${isAtTop ? 'hidden' : 'bg-white text-black shadow-md flex'}
  `}
>
  <div className={`w-full flex items-center gap-6 px-8 py-3 ${isAtTop ? 'hidden' : 'flex'}`}>
    <Link href="/" className="text-[42px] font-studio-pro-bold">©ethan</Link>
    <Link href="/about" className="hover:opacity-80 text-[20px] font-studio-pro-bold">Về chúng tôi</Link>
    <Link href="/careers" className="hover:opacity-80 text-[18px] font-studio-pro">Tuyển dụng</Link>
    {/* <Link href="/community" className="hover:opacity-80 text-[18px] font-studio-pro">Cộng đồng</Link> */}
    <Link href="/contact" className="hover:opacity-80 text-[18px] font-studio-pro">Liên hệ</Link>

    {/* <Link href="/community" className="hover:opacity-80 text-[18px] font-studio-pro">Community</Link> */}
  </div>
</motion.header>



      {/* TOGGLE BUTTON */}
 
<motion.button
  onClick={handleToggleMenu}
  className="fixed top-4 right-6 text-2xl font-bold z-5001 bg-white/80 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center shadow"
  initial={false}
  animate={{ rotate: isMenuOpen ? 180 : 0 }}
  whileHover={{ scale: 1.1 }} // 💥 hover scale nhẹ
  transition={{ duration: 0.6, ease: [0.38, 0.005, 0.215, 1] }}
>
  <div className="relative w-6 h-6">
    {/* Icon Open */}
    <motion.span
      initial={false}
      animate={{
        opacity: isMenuOpen ? 0 : 1,
        rotate: isMenuOpen ? -90 : 0,
        scale: isMenuOpen ? 0.8 : 1
      }}
      transition={{
        duration: 0.4,
        ease: [0.38, 0.005, 0.215, 1],
        delay: isMenuOpen ? 0 : 0.2 // ✕ hiện ngay, ☰ có delay khi hiện lại
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      ☰
    </motion.span>

    {/* Icon Close */}
    <motion.span
      initial={false}
      animate={{
        opacity: isMenuOpen ? 1 : 0,
        rotate: isMenuOpen ? 0 : 90,
        scale: isMenuOpen ? 1 : 0.8
      }}
      transition={{
        duration: 0.4,
        ease: [0.38, 0.005, 0.215, 1],
        delay: isMenuOpen ? 0 : 0 // ✕ hiện ngay khi mở, ẩn ngay khi đóng
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      ✕
    </motion.span>
  </div>
</motion.button>
      {/* FULLSCREEN OVERLAY */}
<AnimatePresence>
  {isMenuOpen && (
    <motion.div className="fixed inset-0 z-5000 flex flex-col md:flex-row">

      {/* Khối trắng bên trái */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-full md:w-[70%] bg-white z-40 rounded-b-[30px] md:rounded-b-none md:rounded-tr-[30px] md:rounded-br-[30px] p-6 md:p-12 flex flex-col justify-between relative -mr-40"
      >
        {/* Logo Ethan */}
        <a href="/" className="text-[36px] font-studio-pro-bold mb-6 block">
          ©ethan
        </a>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
          className="space-y-6 text-4xl md:text-5xl font-studio-pro-bold text-black"
        >
                    {['Về chúng tôi', 'Tuyển dụng','Liên hệ'].map((item, i) => {
            // Xác định đúng href cho từng item
            const getHref = (itemName: string) => {
              switch(itemName) {
                case 'Về chúng tôi':
                  return '/about';
                case 'Tuyển dụng':
                  return '/careers';
                // case 'Cộng đồng':
                //   return '/community';
                case 'Liên hệ':
                  return '/contact';
                default:
                  return '/';
              }
            };
          
            return (
              <motion.div
                key={item}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.4 }}
              >
                <Link 
                  href={getHref(item)}
                  className="block hover:opacity-80 transition-opacity"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-2 gap-2 mt-10 text-sm text-black font-studio-pro">
           <a href="/careers/67">Video creator</a>
          <a href="/careers/61">Kỹ thuật viên thêu</a>
          <a href="/careers/71">Seller</a>
          <a href="/careers/73">Internet Marketing</a>
          <a href="/careers/75">Quản lý nhân sự</a>
          <a href="/careers/69">Graphic Designer</a>
          <a href="/careers/59">Quản lý xưởng thêu</a>
        </div>
      </motion.div>

      {/* Overlay mờ giữa */}
        <motion.div
        key="overlay"
        initial={{ opacity: 0.8 }}
        animate={isMenuOpen
            ? { opacity: 0, transition: { duration: 0.6, delay: 0.2, ease: 'easeInOut' } }
            : { opacity: 0.5, transition: { duration: 0.5, ease: 'easeInOut' } }
        }
        className="absolute inset-0 bg-black z-30 hidden md:block"
        />

      {/* Ảnh nền (desktop only) */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-0 md:w-[46%] hidden md:block relative overflow-hidden z-20"
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1750343360238-b6861fc1f95b?q=80&w=718&auto=format&fit=crop"
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover md:rounded-tl-[30px] md:rounded-bl-[30px]"
        />
        <div className="absolute bottom-6 right-6 bg-white/90 px-4 py-2 rounded-xl shadow">
          <div className="bg-[#f4f4f4] p-6 mt-12 rounded-[30px]">
            <p className="mb-4 font-studio-pro">Đăng ký để không bỏ lỡ<br />tin tức mới từ Mate Libre</p>
            <button className="bg-black text-white rounded-full px-6 py-2 text-sm font-studio-pro-bold">
              Xây dựng hộp của bạn
            </button>
          </div>
        </div>
      </motion.div>

    </motion.div>
  )}
</AnimatePresence>


    </>
  )
}
