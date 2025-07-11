import Image from 'next/image';
import Link from 'next/link';

export default function CommunitySection() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-16">
                 <h2 className="text-3xl font-studio-pro-bold mb-4">Our community</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Feature Article */}
        <div className="flex-1  overflow-hidden">
          <Image
            src="/images/banner-1.webp"
            alt="Main Article"
            width={900}
            height={600}
            className="w-full h-auto object-cover rounded-[24px]"
          />
          <div className="mt-6">
            <h3 className="text-2xl font-studio-pro-bold">What Does Yerba Mate Taste Like?</h3>
            <p className="text-sm mt-1 text-neutral-600">august 8, 2024</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-96">
 

          {/* Article List */}
          <div className="space-y-8">
            <Link href="#" className="block">
              <div className="rounded-[32px] overflow-hidden">
                <Image
                  src="/images/banner-2.webp"
                  alt="Article 1"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4">
                <h4 className="font-studio-pro-bold leading-snug">
                  Mate Libre's different Yerba Mate Flavors
                </h4>
                <p className="text-sm mt-1 text-neutral-600">august 8, 2024</p>
              </div>
            </Link>

            <Link href="#" className="block">
              <div className="rounded-[32px] overflow-hidden">
                <Image
                  src="/images/banner-3.webp"
                  alt="Article 2"
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="mt-4">
                <h4 className="font-studio-pro-bold leading-snug">Mate Mule</h4>
                <p className="text-sm mt-1 text-neutral-600">
                  september 1, 2023 <span className="ml-2 inline-block bg-neutral-200 text-xs px-2 py-0.5 rounded-full">recipes</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
