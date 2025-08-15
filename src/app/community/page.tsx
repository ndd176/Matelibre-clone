'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Clean community data
const communityStats = [
  { label: 'Thành viên', value: '200+', description: 'Những tâm hồn sáng tạo' },
  { label: 'Dự án', value: '50+', description: 'Hợp tác đang diễn ra' },
  { label: 'Sự kiện', value: '15+', description: 'Hoạt động thường niên' },
  { label: 'Năm phát triển', value: '5+', description: 'Tăng trưởng liên tục' }
]

const communityValues = [
  {
    title: 'Tinh thần hợp tác',
    description: 'Chúng tôi tin vào sức mạnh của sự sáng tạo tập thể và kiến thức chia sẻ.',
    icon: '🤝'
  },
  {
    title: 'Đổi mới sáng tạo',
    description: 'Vượt qua ranh giới và khám phá những khả năng mới cùng nhau.',
    icon: '💡'
  },
  {
    title: 'Phát triển bền vững',
    description: 'Mọi tiếng nói đều quan trọng trong việc xây dựng cộng đồng đa dạng.',
    icon: '🌱'
  },
  {
    title: 'Tác động tích cực',
    description: 'Tạo ra những thay đổi có ý nghĩa kéo dài qua nhiều thế hệ.',
    icon: '🌍'
  }
]

// Community images from the uploaded folder
const communityImages = [
  '0U0A0024.jpg',
  '0U0A0812.JPG',
  '0U0A0960.JPG',
  '0U0A0965.JPG',
  '0U0A1084.JPG',
  '0U0A1126.JPG',
  '0U0A1163.JPG',
  '0U0A1339.JPG',
  '0U0A1424.JPG',
  '0U0A1646.JPG',
  'BQ5A8341.JPG',
  'BQ5A8423.JPG',
  'BQ5A8740.JPG',
  'BQ5A8949.JPG',
  'BQ5A9369.JPG',
  'BQ5A9449.JPG'
]

export default function CommunityPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % communityImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-studio-pro">
      
      {/* HERO SECTION WITH COMMUNITY IMAGES */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          <Image
            src={`/images/community/${communityImages[currentImageIndex]}`}
            alt="Community"
            fill
            className="object-cover transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-studio-pro-bold mb-6 leading-tight">
              Cộng đồng
              <br />
              <span className="text-blue-200">Ethan</span>
            </h1>
            <p className="text-xl md:text-2xl font-studio-pro max-w-3xl mx-auto leading-relaxed opacity-90">
              Nơi những tâm hồn sáng tạo hội tụ, kết nối và cùng nhau xây dựng tương lai bền vững
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/careers"
              className="bg-blue-200 text-black px-8 py-4 rounded-full font-studio-pro-bold hover:bg-blue-300 transition-colors duration-300"
            >
              Tham gia cộng đồng
            </Link>
            <Link 
              href="/events"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-studio-pro-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              Xem sự kiện
            </Link>
          </motion.div>
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {communityImages.slice(0, 8).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-blue-200 w-6' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-8">
                Xây dựng tương lai,
                <br />
                <span className="text-blue-600">cùng nhau</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Cộng đồng Ethan là nơi hội tụ của những cá nhân đam mê sáng tạo, những người đổi mới và những nhà hoạt động được kết nối bởi tầm nhìn chung về sự phát triển bền vững.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Chúng tôi tin rằng sự thay đổi có ý nghĩa xảy ra khi những cá nhân đầy đam mê hợp tác, chia sẻ kiến thức và hỗ trợ lẫn nhau phát triển.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8"
            >
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="text-3xl font-studio-pro-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-studio-pro-bold text-black mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
              Giá trị cốt lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những nguyên tắc này định hướng mọi việc chúng tôi làm và hình thành văn hóa cộng đồng của chúng ta.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {communityValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-studio-pro-bold text-black mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY GALLERY SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
              Khoảnh khắc cộng đồng
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Những hình ảnh đẹp ghi lại tinh thần đoàn kết và sự sáng tạo của cộng đồng Ethan
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {communityImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={`/images/community/${image}`}
                    alt={`Community moment ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-8">
              Tạo ra tác động <span className="text-blue-600">tích cực</span>
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Cùng nhau, chúng tôi không chỉ xây dựng sản phẩm mà còn nuôi dưỡng một phong trào hướng tới sự đổi mới bền vững và thay đổi tích cực.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-studio-pro-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 font-studio-pro">Dự án bền vững</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-studio-pro-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600 font-studio-pro">Cuộc sống được cải thiện</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-4xl font-studio-pro-bold text-blue-600 mb-2">25+</div>
                <div className="text-gray-600 font-studio-pro">Đối tác toàn cầu</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-studio-pro-bold mb-8">
              Sẵn sàng tham gia cùng chúng tôi?
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              Trở thành một phần của cộng đồng đang định hình tương lai thông qua sự hợp tác, đổi mới và thực hành bền vững.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/careers"
                className="bg-blue-200 text-black px-8 py-4 rounded-full font-studio-pro-bold hover:bg-blue-300 transition-colors duration-300"
              >
                Khám phá cơ hội
              </Link>
              <Link 
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-studio-pro-bold hover:bg-white hover:text-black transition-all duration-300"
              >
                Liên hệ với chúng tôi
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
