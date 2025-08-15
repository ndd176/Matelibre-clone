'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function EventBanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-black-50 to-pink-50">
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-black"/>
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-200 to-purple-200 text-black rounded-full text-sm font-studio-pro-bold"
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Sự kiện mới nhất
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-studio-pro-bold text-gray-900 leading-tight"
            >
              Over
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Limitation
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-l text-gray-600 font-studio-pro-bold"
            >
              Sân chơi multimedia lớn nhất Gia Kiệm dành cho Media và Designer. Sự kiện lần đầu tiên được tổ chức nhằm mục đích công bố rộng rãi môi trường làm việc chuyên nghiệp của công ty.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-8"
            >
              <div className="text-center">
                <div className="text-3xl font-studio-pro-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-500 font-studio-pro">Thí sinh</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-studio-pro-bold text-blue-600">6</div>
                <div className="text-sm text-gray-500 font-studio-pro">Giải thưởng</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-studio-pro-bold text-blue-600">2</div>
                <div className="text-sm text-gray-500 font-studio-pro">Hạng mục</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/events"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-200 to-purple-200 text-white font-studio-pro-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <span>Khám phá sự kiện</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xl"
                >
                  →
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

              {/* Main Image */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image
                  src="/images/overview.jpg"
                  alt="Over Limitation Event"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay */}
                 
                {/* Floating Elements */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-studio-pro-bold text-gray-800">
                  Ngày 10 tháng 08 năm 2025
                </div>
 
              </motion.div>

 
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
