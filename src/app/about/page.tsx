



'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// Elegant Animation variants for minimalist style
const elegantFadeIn = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }
}

const smoothStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Refined team data with minimalist presentation
const teamMembers = [
  {
    name: "Đình Duy",
    role: "Nhà sáng lập & CEO",
    image: "/images/anhduy.png",
    bio: "Người tạo dựng hành trình khởi nghiệp từ POD và Dropshipping, xây nền tảng bền vững bằng sáng tạo, công nghệ và tinh thần không ngừng đổi mới.",
    skills: ["Lãnh đạo", "Chiến lược", "Đổi mới sáng tạo", "Phát triển bền vững"],
    quote: "Tạo ra những sản phẩm đẹp và có trách nhiệm với hành tinh này.",
    experience: "Hơn 10 năm",
     achievement: "Từ startup nhỏ phát triển thành doanh nghiệp doanh thu 50M+"
  },
  {
    name: "Minh Nguyệt",
    role: "COO",
    image: "/images/chinguyet.png",
    bio: "Người thủ lĩnh truyền cảm hứng, dẫn dắt đội ngũ thiết kế vượt qua từng thử thách với lòng đam mê và sự tỉ mỉ.",
    skills: ["Lãnh đạo", "Chiến lược", "Đổi mới sáng tạo", "Phát triển bền vững"],
    quote: "Mỗi thiết kế là một câu chuyện về văn hóa và cảm xúc.",
    achievement: "Dẫn dắt đội ngũ đạt 99.9% chất lượng sản phẩm trong 5 năm liên tiếp"
  },
  {
    name: "Đội ngũ seller",
    role: "Kinh doanh & Phân phối",
    image: "/images/seller.jpg",
    bio: "Là cầu nối giữa sản phẩm thủ công và khách hàng toàn cầu – mang giá trị Việt Nam vươn xa.",
    skills: ["Bán hàng", "Thị trường quốc tế", "Thương mại điện tử", "Phân phối"],
    quote: "Chúng tôi không chỉ bán sản phẩm, mà lan tỏa tinh thần thủ công Việt.",
    achievement: "Phân phối sản phẩm đến hơn 30 quốc gia"
  },
  {
    name: "Đội ngũ thiết kế",
    role: "Vận hành & Sản xuất",
    image: "/images/designer.jpg",
    bio: "Những nghệ nhân phía sau mỗi sản phẩm hoàn hảo, đảm bảo chất lượng cao nhất từ ý tưởng đến tay người dùng.",
    skills: ["Chất lượng sản phẩm", "Quy trình sản xuất", "Quản lý vận hành", "Tối ưu hóa"],
    quote: "Sự xuất sắc đến từ từng chi tiết nhỏ.",
     achievement: "Duy trì chất lượng đạt 99.8% trong suốt 5 năm"
  },
  {
    name: "Đội ngũ media",
    role: "Đổi mới số & Công nghệ",
    image: "/images/media2.jpg",
    bio: "Kết nối công nghệ và sáng tạo để nâng tầm trải nghiệm khách hàng và tối ưu hóa sản xuất.",
    skills: ["AI ứng dụng", "Tự động hóa", "Thiết kế số", "Công nghệ sáng tạo"],
    quote: "Công nghệ hỗ trợ nghệ thuật – không thay thế nó.",
    achievement: "Tăng hiệu suất sản xuất gấp 3 lần"
  },
  {
    name: "Đội ngũ support",
    role: "Chăm sóc khách hàng",
    image: "/images/support.webp",
    bio: "Luôn lắng nghe và đồng hành để mỗi khách hàng đều cảm thấy được trân trọng và thấu hiểu.",
    skills: ["Giao tiếp", "Tư vấn khách hàng", "Giải quyết vấn đề", "Xây dựng niềm tin"],
    quote: "Mỗi phản hồi tích cực là động lực để chúng tôi làm tốt hơn.",
    experience: "Hơn 7 năm",
     achievement: "Đạt 4.9/5 sao từ hơn 10,000 lượt đánh giá"
  }
]




// Clean values for minimalist presentation
const coreValues = [
  {
    icon: "/images/star.jpg",
    title: "Luôn đổi mới",
    description: "Chúng tôi không ngừng sáng tạo để mang đến những thiết kế táo bạo cùng giải pháp thương mại điện tử hiệu quả.",
    details: "Đội ngũ Ethan Ecom liên tục cho ra đời các sản phẩm độc đáo trên TikTok, Etsy, Shopify và WordPress – mở ra những hướng đi mới cho ngành.",
    metrics: ["Hơn 100 thiết kế đã ra mắt", "Ra nội dung mỗi tuần", "Luôn bắt kịp xu hướng"],
    impact: "Góp phần định hình xu hướng thương mại điện tử hiện đại"
  },
    {
    icon: "/images/handshake.jpg",
    title: "Lấy khách hàng làm trung tâm",
    description: "Mọi điều chúng tôi làm đều xuất phát từ mong muốn mang lại trải nghiệm tốt nhất cho khách hàng.",
    details: "Từ việc sản xuất theo yêu cầu đến hỗ trợ tận tình 24/7, sự hài lòng của khách hàng là ưu tiên hàng đầu tại Ethan Ecom.",
    metrics: ["97% khách hàng hài lòng", "Phản hồi nhanh chóng", "Hỗ trợ mọi lúc"],
    impact: "90% khách hàng quay lại và giới thiệu cho người khác"
  },
  {
    icon: "/images/flash.jpg",
    title: "Linh hoạt và tốc độ",
    description: "Chúng tôi làm việc nhanh, triển khai gọn và luôn sẵn sàng bắt kịp mọi cơ hội.",
    details: "Quy trình dropshipping và sản xuất theo yêu cầu được tinh gọn tối đa, giúp đơn hàng đến tay khách hàng chỉ trong thời gian ngắn.",
    metrics: ["Giao hàng trong 48h", "Ra mắt thị trường nhanh gấp 3 lần", "Hệ thống linh hoạt dễ mở rộng"],
    impact: "Luôn dẫn đầu trong cuộc chơi tốc độ"
  },
    {
    icon: "/images/tree-of-life.jpg",
    title: "Tinh thần cầu tiến &  môi trường thân thiện",
    description: "Chúng tôi xây dựng môi trường làm việc cởi mở, nơi mọi người được lắng nghe và cùng nhau phát triển.",
    details: "Ethan Ecom khuyến khích học hỏi, trân trọng sự khác biệt và luôn cải tiến để mang lại giá trị lâu dài cho cả team và khách hàng.",
    metrics: ["Văn hóa làm việc tích cực",   "Hỗ trợ tận tình những người mới"],
    impact: "Xây dựng một tập thể tử tế, cầu tiến và lấy con người làm gốc"
  },
    {
    icon: "/images/needle.jpg",
    title: "Tỉ mỉ trong từng chi tiết",
    description: "Chúng tôi coi trọng chất lượng và sự cá nhân hóa trong từng sản phẩm gửi đến tay khách hàng.",
    details: "Từ khâu sản xuất cho đến hoàn thiện, mọi sản phẩm đều được kiểm tra kỹ lưỡng để đảm bảo độ chính xác và sự tinh tế.",
    metrics: ["Chất lượng đạt 99.9%", "Không phát sinh lỗi", "Được đánh giá cao trong giới thủ công"],
    impact: "Trở thành tiêu chuẩn mới cho sản phẩm cá nhân hóa"
  },
  {
    icon: "/images/fire.jpg",
    title: "Làm việc bằng đam mê",
    description: "Chúng tôi là một tập thể trẻ trung, năng động và luôn khao khát phát triển.",
    details: "Mỗi thành viên tại Ethan Ecom đều mang trong mình tinh thần cầu tiến, sáng tạo và không ngừng học hỏi để cùng nhau bứt phá.",
    metrics: ["Tỷ lệ gắn bó cao", "Văn hóa làm việc tích cực", "Luôn tràn đầy năng lượng"],
    impact: "Tạo nên môi trường làm việc đáng mơ ước trong ngành thương mại điện tử"
  },


];



const milestones = [
  {
    year: "2017",
    title: "Khởi đầu",
    description: "Ethan Ecom được thành lập với mục đích kinh doanh đơn giản trên nền tảng Amazon.",
    impact: "Ra mắt những sản phẩm dropshipping đầu tiên",
    details: "Ba thành viên thân thiết chập chững bắt đầu mô hình kinh doanh đơn giản",
    achievement: "Đặt nền móng đầu tiên cho Ethan",
    metrics: "3 thành viên → 50 đơn đầu tiên"
  },
  {
    year: "2018",
    title: "Thành công rực rỡ",
    description: "Các sản phẩm viral trên Amazon giúp Ethan Ecom thu hút sự chú ý lớn, tạo đà tăng trưởng nhanh chóng.",
    impact: "Doanh thu tăng gấp 4 lần so với lúc khởi đầu ",
    details: "Những thiết kế độc đáo kết hợp với chiến lược marketing thông minh đã giúp lượng khách hàng và doanh thu tăng vọt.",
    achievement: "Leo lên được top 10 amazon với sản phẩm áo in",
    metrics: "Thoáng chốc tổng số lượng đơn hàng vượt trên 10 ngàn"
  },
  {
    year: "2020",
    title: "Vượt qua giông bão để tiến lên",
    description: "Gặp phải thử thách lớn trong kinh doanh, những sự kiện ngoài ý muốn khiến cho việc duy trì doanh nghiệp trở nên vô cùng khó khăn",
    impact: "Tái cấu trúc mô hình vận hành",
    details: "Năm 2020, đại dịch khiến kho Amazon quá tải, đơn hàng đình trệ, doanh thu lao dốc. Sản phẩm tồn kho, chi phí đội lên, dòng tiền cạn kiệt. Ethan Ecom đứng trước bờ vực phá sản.",
    achievement: "Học được một bài học lớn",
    metrics: "Giai đoạn khó khăn này là bước ngoặt giúp Ethan Ecom củng cố nội lực, chuẩn bị cho một chiến lược phát triển bền vững và linh hoạt hơn trong tương lai."
  },
{
  year: "2022",
  title: "Trở lại mạnh mẽ",
  description: "Nắm bắt cơ hội mới từ TikTok và Etsy để mở rộng thị trường và kết nối với thế hệ khách hàng trẻ.",
  impact: "Tăng gấp đôi lượng khách hàng nhờ nội dung viral",
  details: "Chúng tôi tận dụng sức lan tỏa mạnh mẽ của TikTok để giới thiệu các thiết kế sáng tạo, từ đó thúc đẩy doanh số và xây dựng cộng đồng người theo dõi trung thành.",
  achievement: "Hiện diện mạnh mẽ trên nhiều nền tảng",
  metrics: "153 triệu lượt xem TikTok → 2.510.000+ khách hàng"
},
  {
  year: "2023",
  title: "Mở rộng nền tảng",
  description: "Mở rộng quy mô hoạt động bằng cách tham gia nhiều nền tảng thương mại điện tử khác nhau.",
  impact: "Vươn ra nhiều quốc gia hơn với danh mục sản phẩm đa dạng",
  details: "Chúng tôi ra mắt dòng sản phẩm tùy chỉnh và nâng cấp vận hành để đáp ứng nhu cầu ngày càng tăng.",
  achievement: "Thâm nhập thị trường quốc tế",
  metrics: "10+ quốc gia → 50.000+ đơn hàng"
},
{
  year: "2024",
  title: "Tăng tốc quy mô",
  description: "Xây dựng văn phòng mới để chào đón đội ngũ ngày càng lớn mạnh và nâng cao hiệu quả vận hành.",
  impact: "Mở rộng đội ngũ lên hơn 20 nhân viên",
  details: "Trụ sở mới giúp đẩy mạnh hoạt động trên các nền tảng",
  achievement: "Tăng trưởng vận hành",
  metrics: "20+ thành viên → Gấp đôi năng lực xử lý"
},
{
  year: "2025",
  title: "Bùng nổ tăng trưởng",
  description: "Văn phòng chính hoạt động hết công suất, Ethan Ecom mở thêm chi nhánh thứ hai",
  impact: "Mở rộng đội ngũ nhân viên",
  details: "Văn phòng 2 được cấp tốc chuẩn bị đến đón chào những nhân tài tề tựu về góp sức phát triển kinh doanh",
  achievement: "Nâng tổng số nhân viên lên 51",
  metrics: "2 văn phòng → 10.000+ đơn hàng custom"
}

];

// Các bước quy trình được tinh chỉnh cho phong cách tối giản
const designProcess = [
  {
    step: "01",
    title: "Nghiên cứu thị trường, tìm xu hướng",
    description: "Nhanh chóng xác định xu hướng nóng và nhu cầu khách hàng trên các nền tảng.",
    details: "Chúng tôi quét các sản thương mại để thu thập dữ liệu thị trường sau đó xác định xu hướng viral và sở thích khách hàng.",
    duration: "Seller, Internet Marketing",
   },
  {
    step: "02",
    title: "Phát Triển Ý Tưởng",
    description: "Động não nhanh chóng để tạo ra các thiết kế nổi bật cho POD",
    details: "Đội ngũ của chúng tôi hợp tác để phác thảo các khái niệm táo bạo phù hợp với sức hấp dẫn viral và tùy chỉnh.",
    duration: "Seller, Internet Marketing",
   },
  {
    step: "03",
    title: "Thiết Kế & Chuẩn Bị",
    description: "Tạo nhanh các thiết kế kỹ thuật số để sản xuất.",
    details: "Chúng tôi tạo ra hình ảnh chất lượng cao và file tùy chỉnh, sẵn sàng cho việc thực hiện của nhà cung cấp.",
    duration: "Designer",
   },
  {
    step: "04",
    title: "Tạo Nội Dung",
    description: "Sản xuất video TikTok hấp dẫn để giới thiệu thiết kế và thúc đẩy bán hàng.",
    details: "Chúng tôi quay và chỉnh sửa nội dung sinh động để làm nổi bật sản phẩm và khơi gợi sự quan tâm của khách hàng.",
    duration: "Video Creator",
   },
  {
    step: "05",
    title: "Ra Mắt & Thực Hiện",
    description: "Phát hành trên các nền tảng và phối hợp với nhà cung cấp để giao hàng suôn sẻ.",
    details: "Sản phẩm của chúng tôi hiện diện trên nhiều nền tảng bán lẻ và sáng tạo toàn cầu,cùng các kênh mạng xã hội",
    duration: "Fullfillment",
   }
];

// Các thành tựu được tinh chỉnh để trình bày tối giản
const achievements = [
  {
    title: "Công Nhận Ngành",
    items: [
      "Giải Thưởng Tiên Phong Thời Trang Bền Vững 2024",
      "Công Nhận Xuất Sắc Đổi Mới",
      "Giải Thưởng Tác Động Bền Vững Toàn Cầu"
    ],
    metrics: "Hơn 15 Giải Thưởng Lớn"
  },
  {
    title: "Xuất Sắc Kinh Doanh",
    items: [
      "Startup Thời Trang Phát Triển Nhanh Nhất",
      "Giải Thưởng Lựa Chọn Khách Hàng - 3 Năm Liên Tiếp",
      "Nhà Tuyển Dụng Của Năm - Ngành Công Nghiệp Sáng Tạo"
    ],
    metrics: "Tỷ Lệ Tăng Trưởng 500%"
  },
  {
    title: "Tác Động Toàn Cầu",
    items: [
      "Hơn 1 Triệu Cuộc Sống Được Chạm Tới Qua Sản Phẩm",
      "Hơn 500 Nghệ Nhân Được Trao Quyền Toàn Cầu",
      "50% Giảm Carbon Trong Ngành Được Tác Động"
    ],
    metrics: "Ảnh Hưởng Toàn Thế Giới"
  }
]

// Các đối tác tuyệt vời cho bài trình bày tối giản
const partnerships = [
  {
    name: "Mạng Lưới Nghệ Nhân Toàn Cầu",
    description: "Trao quyền cho hơn 500 nghệ nhân truyền thống trên 15 quốc gia",
    impact: "Hơn 500 Nghệ Nhân Được Hỗ Trợ • Hơn 2 Triệu Đô La Thanh Toán Trực Tiếp",
    category: "Tác Động Cộng Đồng"
  },
  {
    name: "Phòng Thí Nghiệm Đổi Mới",
    description: "Hợp tác với các trường đại học hàng đầu về công nghệ bền vững",
    impact: "5 Bằng Sáng Chế Đang Chờ Xử Lý • 3 Đột Phá Đổi Mới",
    category: "Nghiên Cứu & Phát Triển"
  },
  {
    name: "Liên Minh Môi Trường",
    description: "Dẫn đầu chuyển đổi bền vững của ngành thời trang",
    impact: "Hơn 10 Triệu Tín Chỉ Carbon • 50% Tác Động Ngành",
    category: "Lãnh Đạo Bền Vững"
  }
]

export default function AboutUsAltPage() {
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  
  // Track scroll position for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'story', 'values', 'team', 'process', 'timeline', 'achievements']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-studio-pro">
      {/* MINIMALIST HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Beautiful Monstera Background */}
        <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60 z-0">
          <Image
            src="/images/ethan-02.webp" // ảnh trong thư mục /public/images/
            alt="Sky Background"
            fill
            priority
            className="object-cover"
          />
        </div>
          <motion.div 
            className="absolute inset-0 opacity-5"
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, #22c55e 0%, transparent 70%)',
                'radial-gradient(circle at 80% 20%, #16a34a 0%, transparent 70%)',
                'radial-gradient(circle at 40% 80%, #15803d 0%, transparent 70%)',
                'radial-gradient(circle at 60% 30%, #22c55e 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating Plant Elements */}
        <motion.div 
          className="absolute top-16 left-16 w-16 h-16 opacity-10"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-300">
            <path d="M50 10 C30 20, 20 40, 30 60 C40 80, 60 80, 70 60 C80 40, 70 20, 50 10 Z" />
            <circle cx="50" cy="50" r="3" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-20 w-12 h-12 opacity-10"
          animate={{ 
            rotate: [0, -15, 15, 0],
            y: [0, -10, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 5 L65 30 L90 25 L70 50 L85 75 L60 70 L50 95 L40 70 L15 75 L30 50 L10 25 L35 30 Z" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-1/3 right-16 w-8 h-8 opacity-10"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="20" fill="white" fillOpacity="0.3" />
          </svg>
        </motion.div>

        <motion.div 
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
 
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2
              className="font-studio-pro-bold text-white leading-tight mb-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 7rem)',
                lineHeight: '1.1',
                wordBreak: 'break-word',
              }}
            >
              Ethan Ecom
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl mx-auto"
          >
            <p
              className="text-white leading-relaxed font-studio-pro font-studio-pro-bold"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
                textShadow: '0 2px 8px rgba(0,0,0,0.25)',
              }}
            >
              Đồng lòng, đồng sức, 
              <br />
              bứt phá, gặt thành công
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16"
          >
            <div className="w-24 h-px bg-white mx-auto"></div>
          </motion.div>
        </motion.div>

           <motion.div 
            className="absolute top-20 left-20 w-2 h-2 bg-green-600 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-2 h-2 bg-green-500 rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-10 w-1 h-1 bg-green-700 rounded-full"
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 2, 1] }}
            transition={{ duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
              </section>

 
              <motion.nav 
                className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 hidden md:block"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="max-w-7xl mx-auto px-2 md:px-6 py-3 md:py-6">
                  <div className="flex justify-center">
                    <div className="flex gap-2 md:gap-8 flex-wrap justify-center">
                      {[
                        { id: 'story', label: 'Câu chuyện của chúng tôi' },
                        { id: 'values', label: 'Giá trị cốt lõi' },
                        { id: 'team', label: 'Đội ngũ' },
                        { id: 'process', label: 'Quy trình làm việc' },
                        { id: 'timeline', label: 'Hành trình' },
                        ].map((section) => (
                        <motion.button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`px-3 md:px-6 py-2 md:py-3 text-xs md:text-sm font-studio-pro-bold transition-all duration-300 relative ${
                            activeSection === section.id
                              ? 'text-black'
                              : 'text-gray-600 hover:text-black'
                          }`}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {section.label}
                          {activeSection === section.id && (
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                              layoutId="activeSection"
                              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.nav>

      {/* CLEAN STORY SECTION */}
      <section id="story" className="py-24 bg-white relative overflow-hidden">
        {/* Beautiful Plant Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 right-0 w-1/3 h-full opacity-50"
            style={{
              backgroundImage: 'url(images/table-01.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Floating Leaf Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 opacity-5"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 Q20 30, 20 50 Q20 80, 50 90 Q80 80, 80 50 Q80 30, 50 10 Z" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-16 right-16 w-14 h-14 opacity-5"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, 10, -5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <ellipse cx="50" cy="30" rx="30" ry="20" />
            <ellipse cx="50" cy="70" rx="25" ry="15" />
            <line x1="50" y1="10" x2="50" y2="85" stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={smoothStagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={elegantFadeIn}>
              <div className="mb-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black leading-tight">
                  Câu chuyện của chúng tôi
                </h2>
              </div>
              
              <div className="space-y-8">
                <motion.div 
                  className="bg-gray-50 p-8 rounded-3xl"
                  variants={elegantFadeIn}
                >
                  <p className="text-xl text-gray-800 leading-relaxed font-studio-pro">
Được khơi nguồn từ đam mê trong lĩnh vực thương mại sáng tạo, Ethan Ecom ra đời với sứ mệnh kết hợp giữa những thiết kế táo bạo. Chúng tôi mang đến sự giao thoa độc đáo giữa nghệ thuật thủ công và tốc độ đổi mới của thương mại điện tử hiện đại.                  </p>
                </motion.div>
                
                <motion.div 
                  className="bg-black text-white p-8 rounded-3xl"
                  variants={elegantFadeIn}
                >
                  <p className="text-lg leading-relaxed font-studio-pro">
Từ một văn phòng nhỏ khởi đầu với ước mơ kinh doanh đơn giản, Ethan Ecom đã không ngừng phát triển để từng bước khẳng định vị thế của mình, hướng đến mục tiêu trở thành một trong những tên tuổi dẫn đầu trong ngành.                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={elegantFadeIn}
            >
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="bg-black text-white p-8 rounded-3xl text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">50+</h3>
                  <p className="text-lg font-studio-pro">Nhân viên</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-100 text-black p-8 rounded-3xl text-center mt-8"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">7+</h3>
                  <p className="text-lg font-studio-pro">Năm Kinh Nghiệm</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-800 text-white p-8 rounded-3xl text-center -mt-4"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">1M+</h3>
                  <p className="text-lg font-studio-pro">Khách Hàng Tin Tưởng</p>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 text-black p-8 rounded-3xl text-center mt-4 border-2 border-black"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-4xl font-studio-pro-bold mb-2">10M+</h3>
                  <p className="text-lg font-studio-pro">Sản phẩm thủ công được gửi đi khắp thế giới</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CLEAN VALUES SECTION */}
      <section id="values" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Monstera Pattern Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-2/3 opacity-8"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1545152840-c05b2ec3dee7?w=800&q=80)',
              backgroundSize: 'contain',
              backgroundPosition: 'bottom left',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Decorative Plant Elements */}
        <motion.div 
          className="absolute top-32 right-20 w-16 h-16 opacity-8"
          animate={{ 
            rotate: [0, 15, -10, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 5 C30 15, 15 35, 25 55 C35 75, 65 75, 75 55 C85 35, 70 15, 50 5 Z" />
            <path d="M50 25 C45 30, 45 40, 50 45 C55 40, 55 30, 50 25 Z" fill="white" fillOpacity="0.2" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-32 w-12 h-12 opacity-6"
          animate={{ 
            y: [0, -10, 5, 0],
            rotate: [0, -20, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M20 80 Q50 20, 80 80 Q50 60, 20 80 Z" />
            <circle cx="50" cy="50" r="5" fill="white" fillOpacity="0.3" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Giá trị của chúng tôi
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 h-full rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
              <div className="relative w-[60px] h-[60px] mb-6">
                <Image
                  src={value.icon}
                  alt={value.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
                  <h3 className="text-2xl font-studio-pro-bold mb-4 text-black">{value.title}</h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-studio-pro">{value.description}</p>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-sm text-gray-600 font-studio-pro">{value.details}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {value.metrics.map((metric, idx) => (
                        <span key={idx} className="bg-black text-white px-3 py-1 text-xs font-studio-pro-bold rounded-full">
                          {metric}
                        </span>
                      ))}
                    </div>
                    <div className="border-l-4 border-black pl-4">
                      <p className="text-sm font-studio-pro-bold text-black">{value.impact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ELEGANT TEAM SECTION */}
      <section id="team" className="py-24 bg-white relative overflow-hidden">
        {/* Tropical Plants Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-1/4 h-full opacity-6"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-1/3 h-2/3 opacity-5"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Animated Plant Elements */}
        <motion.div 
          className="absolute top-40 right-10 w-18 h-18 opacity-8"
          animate={{ 
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 L35 25 L20 15 L30 35 L15 45 L35 40 L45 55 L50 35 L55 55 L65 40 L85 45 L70 35 L80 15 L65 25 Z" />
            <circle cx="50" cy="35" r="8" fill="white" fillOpacity="0.2" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-16 w-14 h-14 opacity-6"
          animate={{ 
            y: [0, -12, 6, 0],
            rotate: [0, 12, -6, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <ellipse cx="50" cy="40" rx="35" ry="25" />
            <ellipse cx="50" cy="70" rx="20" ry="15" />
            <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="3" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Gặp gỡ đội ngũ của chúng tôi
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs font-studio-pro-bold rounded-full">
                      {member.experience}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-studio-pro-bold mb-2 text-black">{member.name}</h3>
                    <div className="bg-gray-100 text-black p-3 mb-4 rounded-2xl">
                      <p className="text-lg font-studio-pro-bold">{member.role}</p>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed font-studio-pro">{member.bio}</p>
                    
                    <div className="space-y-3">
                      <div className="bg-black text-white p-3 rounded-2xl">
                        <p className="text-xs font-studio-pro italic">"{member.quote}"</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {member.skills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="bg-gray-50 text-black px-2 py-1 text-xs font-studio-pro text-center rounded-full border">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="border-l-4 border-black pl-3">
                        <p className="text-xs font-studio-pro-bold text-black">{member.achievement}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLEAN PROCESS SECTION */}
      <section id="process" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Elegant Plant Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 right-0 w-2/5 h-full opacity-60"
            style={{
              backgroundImage: 'url(images/moment-01.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Scattered Leaf Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-10 h-10 opacity-8"
          animate={{ 
            rotate: [0, 10, -5, 0],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 10 Q25 30, 30 60 Q50 80, 70 60 Q75 30, 50 10 Z" />
            <line x1="50" y1="10" x2="50" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-40 left-32 w-8 h-8 opacity-6"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, -15, 15, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-1/2 left-10 w-6 h-6 opacity-7"
          animate={{ 
            scale: [1, 1.3, 0.7, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 65 L30 75 L35 55 L20 40 L40 40 Z" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Quy trình của chúng tôi
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="space-y-16">
            {designProcess.map((step, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}>
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-6 mb-8">
                        <div className="bg-black text-white p-6 rounded-2xl">
                          <span className="text-3xl font-studio-pro-bold">{step.step}</span>
                        </div>
                        <div className="bg-gray-100 text-black px-4 py-2 rounded-full">
                          <span className="text-sm font-studio-pro-bold">{step.duration}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-studio-pro-bold mb-4 text-black">{step.title}</h3>
                      <p className="text-xl text-gray-700 mb-6 leading-relaxed font-studio-pro">{step.description}</p>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl">
                          <p className="text-sm text-gray-600 font-studio-pro">{step.details}</p>
                        </div>
 
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-center ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <motion.div 
                      className="inline-flex items-center justify-center w-32 h-32 bg-black text-white rounded-full text-6xl font-studio-pro-bold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.step}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<br />
      {/* CLEAN TIMELINE SECTION */}
      <section id="timeline" className="py-24 bg-white relative overflow-hidden">
        {/* Background Plant Image */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            backgroundImage: 'url(images/moment-02.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          
        />

        {/* Floating Branch Pattern */}
        <motion.div 
          className="absolute top-16 right-16 w-20 h-20 opacity-7"
          animate={{ 
            rotate: [0, 15, -10, 0],
            x: [0, 8, -5, 0]
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-600 fill-none">
            <path d="M20 50 Q35 30, 50 50 Q65 70, 80 50" strokeWidth="2" />
            <path d="M30 40 Q40 35, 45 45" strokeWidth="1" />
            <path d="M55 55 Q65 50, 70 60" strokeWidth="1" />
            <circle cx="25" cy="45" r="2" fill="currentColor" />
            <circle cx="75" cy="55" r="2" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-20 right-32 w-12 h-12 opacity-8"
          animate={{ 
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, -20, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 10 Q70 30, 60 50 Q50 70, 40 50 Q30 30, 50 10 Z" />
            <path d="M50 20 Q60 35, 55 50 Q50 60, 45 50 Q40 35, 50 20 Z" fill="white" fillOpacity="0.2" />
          </svg>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Hành trình của chúng tôi
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <motion.div 
                      className="inline-flex items-center justify-center w-24 h-24 bg-black text-white rounded-2xl text-3xl font-studio-pro-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="bg-gray-50 p-8 rounded-3xl group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                      <h3 className="text-3xl font-studio-pro-bold mb-4 text-black">{milestone.title}</h3>
                      <p className="text-xl text-gray-700 mb-6 leading-relaxed font-studio-pro">{milestone.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black text-white p-4 rounded-2xl">
                          <p className="text-sm font-studio-pro-bold">Thành tựu: {milestone.impact}</p>
                        </div>
                        <div className="bg-gray-200 text-black p-4 rounded-2xl">
                          <p className="text-sm font-studio-pro-bold">Dấu ấn: {milestone.achievement}</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-2xl mb-4 border border-gray-200">
                        <p className="text-sm text-gray-600 font-studio-pro">{milestone.details}</p>
                      </div>
                      
                      <div className="border-l-4 border-black pl-4">
                        <p className="text-sm font-studio-pro-bold text-black">{milestone.metrics}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLEAN ACHIEVEMENTS SECTION */}
      <section id="achievements" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Monstera Background */}
        {/* <div 
          className="absolute top-0 right-0 w-1/3 h-full opacity-6"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat'
          }}
        /> */}

        {/* Decorative Plant Elements */}
        <motion.div 
          className="absolute top-20 left-16 w-16 h-16 opacity-8"
          animate={{ 
            rotate: [0, 8, -5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 15 Q30 35, 35 55 Q50 75, 65 55 Q70 35, 50 15 Z" />
            <path d="M50 25 Q40 40, 42 55 Q50 65, 58 55 Q60 40, 50 25 Z" fill="white" fillOpacity="0.25" />
            <line x1="50" y1="15" x2="50" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 left-8 w-10 h-10 opacity-7"
          animate={{ 
            y: [0, -6, 3, 0],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <circle cx="50" cy="50" r="30" />
            <circle cx="50" cy="50" r="18" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
            <circle cx="40" cy="40" r="3" fill="white" fillOpacity="0.6" />
          </svg>
        </motion.div>

        {/* <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-studio-pro-bold text-black mb-6">
              Thành tựu của chúng tôi
            </h2>
            <div className="w-24 h-px bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {achievements.map((category, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-white p-8 h-full rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-lg transition-all duration-300">
                  <div className="bg-black text-white p-4 mb-6 rounded-2xl">
                    <h3 className="text-2xl font-studio-pro-bold">{category.title}</h3>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-2xl border-l-4 border-black">
                        <p className="text-sm font-studio-pro">🏆 {item}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-black text-white p-4 rounded-2xl text-center">
                    <p className="text-lg font-studio-pro-bold">{category.metrics}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
           <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[
              { number: "15+", label: "Giải thưởng lớn" },
              { number: "500%", label: "Tỷ lệ tăng trưởng" },
              { number: "1M+", label: "Cuộc sống tác động" },
              { number: "50%", label: "Ảnh hưởng ngành" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-100"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-4xl font-studio-pro-bold mb-2 text-black">{stat.number}</h3>
                <p className="text-sm font-studio-pro text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div> */}
      </section>
 
      {/* CLEAN CTA SECTION */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Final Monstera Background */}
        <div 
          className="absolute inset-0 opacity-6"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Floating Final Elements */}
        <motion.div 
          className="absolute top-16 left-16 w-12 h-12 opacity-8"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-600">
            <path d="M50 15 Q30 30, 35 50 Q50 70, 65 50 Q70 30, 50 15 Z" />
            <path d="M50 25 Q40 35, 42 50 Q50 60, 58 50 Q60 35, 50 25 Z" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="45" r="3" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute top-16 right-16 w-12 h-12 opacity-8"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-500">
            <path d="M50 15 Q70 30, 65 50 Q50 70, 35 50 Q30 30, 50 15 Z" />
            <path d="M50 25 Q60 35, 58 50 Q50 60, 42 50 Q40 35, 50 25 Z" fill="white" fillOpacity="0.3" />
            <circle cx="50" cy="45" r="3" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-16 left-20 w-10 h-10 opacity-7"
          animate={{ 
            y: [0, -8, 4, 0],
            rotate: [0, 15, -10, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div 
          className="absolute bottom-16 right-20 w-10 h-10 opacity-7"
          animate={{ 
            y: [0, 6, -4, 0],
            rotate: [0, -15, 10, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-green-700">
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" fill="white" fillOpacity="0.4" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mb-12">
<h2 className="text-5xl md:text-6xl pt-4 lg:text-7xl font-studio-pro-bold text-black mb-8 leading-snug">
                Sẵn sàng tham gia sứ mệnh của chúng tôi?
              </h2>
              <p className="text-2xl text-gray-700 mb-8 font-studio-pro leading-relaxed">
                Chúng tôi đang xây dựng nhiều hơn một công ty.<br/>
                Chúng tôi đang tạo nên một tương lai bền vững.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link href="/careers">
                <motion.div 
                  className="bg-black text-white p-10 rounded-3xl cursor-pointer group hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-3xl font-studio-pro-bold mb-4">Tham gia đội ngũ</h3>
                  <p className="text-lg font-studio-pro">Nghề nghiệp & Cơ hội</p>
                </motion.div>
              </Link>
              
              <Link href="/community">
                <motion.div 
                  className="bg-white text-black p-10 rounded-3xl cursor-pointer group border-2 border-black hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-3xl font-studio-pro-bold mb-4">Giải đáp thắc mắc</h3>
                  <p className="text-lg font-studio-pro">Thông tin liên hệ</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
