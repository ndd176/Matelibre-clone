'use client'

import { useState } from 'react'
import { FaCopy, FaFacebookF, FaPlus, FaMinus } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const email = 'ethanecom@gmail.com'

const faqs = [
  {
    question: 'Ethan Ecom đang tuyển dụng những vị trí nào?',
    answer: (
      <>
        <p className="mb-2">
          Chúng tôi đang phát triển nhanh và luôn tìm kiếm những đồng nghiệp tuyệt vời! Hiện tại, chúng tôi đang tuyển dụng: 
          <strong> IT, Thiết kế, Internet Marketing, Thiết kế thêu, Quản lý thêu,  Seller trên các sàn thương mại ddien tử, QA, QC,</strong> và <strong>Video creator</strong>.  
        </p>
        <p className="mb-2">
          Nếu bạn có đam mê, hứng thú về bất kỳ ngành nghề nào ở trên, đừng ngần ngại đến với Ethan!
        </p>
      </>
    ),
  },
  {
    question: 'Làm sao để ứng tuyển?',
    answer: (
      <>
        <p className="mb-2">
          Rất dễ dàng 🍋 Chỉ cần vào trang <a href="/careers" className="underline font-bold">Tuyển dụng</a>, chọn vị trí phù hợp với bạn, nhấn nút "Ứng tuyển", tải lên CV — và xong!
        </p>
        <p className="mb-2">
          Chúng tôi sẽ liên hệ để lên lịch phỏng vấn nếu phù hợp. Chúc may mắn!
        </p>
      </>
    ),
  },
  {
    question: 'Tôi chưa có kinh nghiệm. Có thể ứng tuyển không?',
    answer: (
      <>
        <p className="mb-2">
          Tất nhiên rồi! Ai cũng bắt đầu từ đâu đó. Một số vị trí yêu cầu kinh nghiệm nhiều hơn, nhưng nếu bạn háo hức học hỏi, có trách nhiệm và thái độ tốt — chúng tôi sẵn sàng đào tạo bạn.
        </p>
        <p className="mb-2">
          Kỹ năng máy tính cơ bản là bắt buộc, và nếu bạn biết chút tiếng Anh thì đó là điểm cộng tuyệt vời! 🚀
        </p>
      </>
    ),
  },
]

export default function FAQSection() {
  const [copied, setCopied] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
        {/* LEFT: Newsletter box */}
        <div className="relative bg-neutral-100 rounded-[48px] p-10 md:p-14 flex flex-col justify-between">
          {/* Facebook icon */}
          <a
            href="https://www.facebook.com/ethanecom3979"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-6 md:top-8 md:right-8 text-black hover:text-blue-600"
          >
            <FaFacebookF size={20} />
          </a>

          {/* Text */}
          <h3 className="text-xl md:text-3xl font-plus-jakarta-sans-bold max-w-xl mb-6">
            Có câu hỏi hoặc chỉ muốn chào hỏi? Đừng ngại liên hệ — chúng tôi chỉ cách bạn một tin nhắn! 💬
          </h3>

          {/* Email row */}
          <div className="flex items-center max-w-xl bg-white border border-black rounded-full px-6 py-3 relative mt-auto">
            <span className="text-xl font-medium text-black">{email}</span>
            <button
              onClick={handleCopy}
              className="ml-auto text-black hover:text-blue-600 transition"
              aria-label="Copy email"
            >
              <FaCopy size={16} />
            </button>

            {/* Copied feedback */}
            {copied && (
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded-full animate-fade">
                Đã sao chép!
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: FAQ */}
        <div>
          {/* Title on top of FAQ */}
          <h2 className="text-2xl md:text-3xl font-plus-jakarta-sans-bold mb-6">
            Câu hỏi thường gặp
          </h2>

          <div className="flex flex-col divide-y divide-black/10">
            {faqs.map((faq, index) => {
              const isOpen = index === openIndex
              return (
                <div
                  key={index}
                  className={`border border-black px-6 py-4 transition-all rounded-[40px] my-3`}
                >
                  <button
                    className="flex items-center justify-between w-full text-left font-plus-jakarta-sans-bold text-lg"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    {faq.question}
                    <span className="ml-4">
                      {isOpen ? <FaMinus size={14} /> : <FaPlus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { height: 'auto', opacity: 1 },
                          collapsed: { height: 0, opacity: 0 },
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 text-lg font-bold text-neutral-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Animation style */}
      <style>{`
        @keyframes fade {
          0% { opacity: 0; transform: translateY(0.25rem); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-0.25rem); }
        }
        .animate-fade {
          animation: fade 2s ease-in-out forwards;
        }
      `}</style>
    </section>
  )
}
