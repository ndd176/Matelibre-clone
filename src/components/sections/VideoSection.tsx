'use client'

import { motion } from 'framer-motion'

export default function VideoSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-studio-pro-bold text-black mb-6">
            Một ngày làm việc thường ngày tại Ethan
          </h2>
 
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              controls
              poster="/images/overview.jpg" // Placeholder poster
              preload="metadata"
            >
              <source
                src="https://res.cloudinary.com/dbtvr8qyd/video/upload/v1755250542/IMG_0381_x7wpli.mov"
                type="video/mp4"
              />
              <p className="text-center text-gray-500 p-8">
                Trình duyệt của bạn không hỗ trợ video. 
                <a 
                  href="https://res.cloudinary.com/dbtvr8qyd/video/upload/v1755250542/IMG_0381_x7wpli.mov" 
                  className="text-blue-600 hover:underline ml-1"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Tải video tại đây
                </a>
              </p>
            </video>

            {/* Play Button Overlay (optional) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg 
                  className="w-6 h-6 text-black ml-1" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </div>

 </motion.div>

        {/* Video Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
        </motion.div>
      </div>
    </section>
  )
}
