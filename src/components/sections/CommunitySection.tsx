import Image from 'next/image'
import Link from 'next/link'

export default function CommunitySection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-4xl font-studio-pro-bold mb-10 text-black">
    Những khoảnh khắc đáng nhớ
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Featured Story */}
        <div className="flex-1">
          <Link href="#">
            <div className="overflow-hidden rounded-[24px]">
              <Image
                src="/images/community-02.jpg"
                alt="Team Building Retreat"
                width={900}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-studio-pro-bold text-black">
                Giây phút chia xa lưu luyến giữa những người đồng nghiệp tâm giao 
              </h3>
              <p className="text-sm mt-1 text-neutral-600">22 tháng 6, 2025</p>
            </div>
          </Link>
        </div>

        {/* Right Column - Article List */}
        <div className="w-full lg:w-96 space-y-10">
          <Link href="#" className="block group">
            <div className="rounded-[24px] overflow-hidden">
              <Image
                src="/images/community-01.jpg"
                alt="Mentorship Program"
                width={300}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4">
              <h4 className="font-studio-pro-bold text-black text-lg leading-snug">
                Hậu trường: Chúng tôi đã làm gì mà thân nhau thế này?
              </h4>
              <p className="text-sm mt-1 text-neutral-600">19 Tháng 5, 2025</p>
            </div>
          </Link>

          <Link href="#" className="block group">
            <div className="rounded-[24px] overflow-hidden">
              <Image
                src="/images/community-03.jpg"
                alt="Shortform Videos"
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4">
              <h4 className="font-studio-pro-bold text-black text-lg leading-snug">
                Gặp nhau cuối năm 2024: Lên thuyền Ethan gắn kết tình đồng chí
              </h4>
              <p className="text-sm mt-1 text-neutral-600">
                18 tháng 12, 2024 ·  
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
