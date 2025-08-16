'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function EventsPage() {
  // Danh sách ảnh sự kiện Over Limitation (sẽ thay bằng ảnh thật)
  const eventImages = [
    {
      id: 1,
      src: '/images/community/0U0A0024.jpg',
      alt: 'Over Limitation Event - Team Building',
      title: 'Môi trường làm việc',
      category: 'Check in'
    },
    {
      id: 2,
      src: '/images/community/0U0A0812.JPG',
      alt: 'Over Limitation Event - Workshop',
      title: 'Chia ngọt sẻ bùi',
      category: 'Behind the scence'
    },
    {
      id: 3,
      src: '/images/community/0U0A0960.JPG',
      alt: 'Over Limitation Event - Presentation',
      title: 'Hân hoan',
      category: 'Behind the scence'
    },
    {
      id: 4,
      src: '/images/community/0U0A0965.JPG',
      alt: 'Over Limitation Event - Networking',
      title: 'Phỏng vấn',
      category: 'Behind the scence'
    },
    {
      id: 5,
      src: '/images/community/0U0A1084.JPG',
      alt: 'Over Limitation Event - Awards',
      title: 'Khán giả phấn khích',
      category: 'Party'
    },
    {
      id: 6,
      src: '/images/community/0U0A1126.JPG',
      alt: 'Over Limitation Event - Group Photo',
      title: 'Tiệc nhảy sối động',
      category: 'Party'
    },
    {
      id: 7,
      src: '/images/community/0U0A1163.JPG',
      alt: 'Over Limitation Event - Activities',
      title: 'Hồi hộp đón chờ kết quả',
      category: 'Party'
    },
    {
      id: 8,
      src: '/images/community/0U0A1339.JPG',
      alt: 'Over Limitation Event - Celebration',
      title: 'Vui mừng phấn khởi',
      category: 'Party'
    },
    {
      id: 9,
      src: '/images/community/0U0A1424.JPG', // Placeholder
      alt: 'Over Limitation Event - Behind the scenes',
      title: 'Nâng ly ăn mừng',
      category: 'Party'
    },
    {
      id: 10,
      src: '/images/community/0U0A1646.JPG', // Placeholder
      alt: 'Over Limitation Event - Memories',
      title: 'Cất cao tiếng hát',
      category: 'Party'
    },
    {
      id: 11,
      src: '/images/community/BQ5A8341.JPG', // Placeholder
      alt: 'Over Limitation Event - Innovation',
      title: 'Kiểm tra danh sách thí sinh',
      category: 'Check in'
    },
    {
      id: 12,
      src: '/images/community/BQ5A8423.JPG', // Placeholder
      alt: 'Over Limitation Event - Together',
      title: 'Kiểm tra danh sách thí sinh',
      category: 'Check in'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả', count: eventImages.length },
    { id: 'team', name: 'Team Building', count: 1 },
    { id: 'workshop', name: 'Workshop', count: 1 },
    { id: 'presentation', name: 'Thuyết trình', count: 1 },
    { id: 'networking', name: 'Networking', count: 1 },
    { id: 'awards', name: 'Trao giải', count: 1 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/overview.jpg"
            alt="Over Limitation Event"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-6 max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-studio-pro-bold mb-6 tracking-tight"
          >
            Over
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Limitation
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-studio-pro mb-8 opacity-90"
          >
            Vượt qua giới hạn, kết nối đam mê, tạo nên khác biệt
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 text-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse " />
              <span>📅 Ngày 10 Tháng 8, 2025</span>
            </div>
            <div className="w-1 h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse font-plus-jakarta-sans" />
              <span>📍 Võ Dõng</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm font-studio-pro">Khám phá thêm</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Event Story Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-studio-pro-bold text-gray-900 mb-6">
            Câu chuyện của chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-plus-jakarta-sans" >
            Over Limitation không chỉ là một sự kiện, mà là hành trình khám phá tiềm năng, vượt qua giới hạn bản thân và tạo nên những kết nối đáng nhớ. Cùng nhìn lại những khoảnh khắc tuyệt vời.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: '200+', label: 'Thành viên tham gia' },
            { number: '15', label: 'Hoạt động đa dạng' },
            { number: '8', label: 'Giờ trải nghiệm' },
            { number: '∞', label: 'Kỷ niệm đáng nhớ' }
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-studio-pro-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-studio-pro">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-studio-pro-bold text-gray-900 mb-6">
              Khoảnh khắc đáng nhớ
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto font-plus-jakarta-sans">
              Những hình ảnh sinh động ghi lại tinh thần nhiệt huyết và sự sáng tạo của team Ethan
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {eventImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-studio-pro-bold text-lg mb-1">
                      {image.title}
                    </h3>
                    <p className="text-sm opacity-90 capitalize">
                      {image.category.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r bg-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl md:text-4xl font-studio-pro-bold mb-6">
            OVER LIMITATION 2025 - ETHAN ECOM
          </h2>
          <p className="text-xl mb-8 opacity-90">
            
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">


          </div>
        </motion.div>
      </section>
    </div>
  )
}
