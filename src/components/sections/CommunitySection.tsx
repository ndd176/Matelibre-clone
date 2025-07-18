import Image from 'next/image'
import Link from 'next/link'

export default function CommunitySection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-4xl font-studio-pro-bold mb-10 text-black">
        Life at Ethan
      </h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Featured Story */}
        <div className="flex-1">
          <Link href="#">
            <div className="overflow-hidden rounded-[24px]">
              <Image
                src="/images/team-building-01.webp"
                alt="Team Building Retreat"
                width={900}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-studio-pro-bold text-black">
                Our Latest Team Retreat: More Than Just Fun
              </h3>
              <p className="text-sm mt-1 text-neutral-600">June 22, 2025 · Culture</p>
            </div>
          </Link>
        </div>

        {/* Right Column - Article List */}
        <div className="w-full lg:w-96 space-y-10">
          <Link href="#" className="block group">
            <div className="rounded-[24px] overflow-hidden">
              <Image
                src="/images/team-building-02.webp"
                alt="Mentorship Program"
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4">
              <h4 className="font-studio-pro-bold text-black text-lg leading-snug">
                How Our Mentorship Program Helps Newcomers Grow
              </h4>
              <p className="text-sm mt-1 text-neutral-600">May 10, 2025 · People</p>
            </div>
          </Link>

          <Link href="#" className="block group">
            <div className="rounded-[24px] overflow-hidden">
              <Image
                src="/images/team-building-03.webp"
                alt="Shortform Videos"
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="mt-4">
              <h4 className="font-studio-pro-bold text-black text-lg leading-snug">
                Behind the Scenes: Making Our Shortform Campaigns
              </h4>
              <p className="text-sm mt-1 text-neutral-600">
                April 18, 2025 · <span className="bg-neutral-200 text-xs px-2 py-0.5 rounded-full">Media</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
