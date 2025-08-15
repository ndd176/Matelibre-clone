'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
export default function StickyHeader() {
    const pathname = usePathname()
    const [showHeader, setShowHeader] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const handleToggleMenu = () => {
  setIsMenuOpen(!isMenuOpen)
}
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY 
      setIsAtTop(currentY <= 0)
      
      // Header luôn hiển thị khi scroll xuống
      setShowHeader(true)
      
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
    <Link 
      href="/about" 
      className={`hover:opacity-80 text-[20px] font-studio-pro-bold transition-colors ${
        pathname === '/about' ? 'text-blue-600' : 'text-black'
      }`}
    >
      Về chúng tôi
    </Link>
    <Link 
      href="/events" 
      className={`hover:opacity-80 text-[18px] font-studio-pro-bold transition-colors ${
        pathname === '/events' ? 'text-blue-600' : 'text-black'
      }`}
    >
      Sự kiện
    </Link>
    <Link 
      href="/careers" 
      className={`hover:opacity-80 text-[18px] font-studio-pro-bold transition-colors ${
        pathname === '/careers' || pathname.startsWith('/careers/') ? 'text-blue-600' : 'text-black'
      }`}
    >
      Tuyển dụng
    </Link>
    <Link 
      href="/contact" 
      className={`hover:opacity-80 text-[18px] font-studio-pro-bold transition-colors ${
        pathname === '/contact' ? 'text-blue-600' : 'text-black'
      }`}
    >
      Liên hệ
    </Link>
  </div>
</motion.header>



      {/* SIMPLE MOBILE MENU - Super lightweight */}
      <button
        onClick={handleToggleMenu}
        className="fixed top-4 right-6 z-5001 bg-white/90 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-gray-200 md:hidden"
      >
        <div className={`w-5 h-5 flex items-center justify-center transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}>
          {isMenuOpen ? '✕' : '☰'}
        </div>
      </button>

      {/* CLEAN DROPDOWN MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-5000 md:hidden">
          {/* Simple backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="absolute top-20 right-6 left-6 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
              <Link 
                href="/" 
                className="text-2xl font-studio-pro-bold text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                ©ethan
              </Link>
            </div>
            
            {/* Navigation */}
            <div className="py-2">
              {[
                { name: 'Về chúng tôi', href: '/about' },
                { name: 'Sự kiện', href: '/events' },
                { name: 'Tuyển dụng', href: '/careers' },
                { name: 'Liên hệ', href: '/contact' }
              ].map((item) => {
                const isActive = pathname === item.href || (item.href === '/careers' && pathname.startsWith('/careers/'));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-6 py-4 font-studio-pro-bold text-lg transition-colors ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}


    </>
  )
}
