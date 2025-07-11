'use client'
 
import ParallaxHero from '@/components/sections/ParallaxHero'
import SlidingText from '@/components/sections/SlidingText'
import CommitmentSection from '@/components/sections/CommitmentSection'
import CommunitySection from '@/components/sections/CommunitySection'
import ProductCardList from '@/components/sections/PositionCarousel'
import MomentsList from '@/components/sections/MomentsList'

const Home = () => {
  return (
    <div className="bg-white text-black">
      <ParallaxHero />
      <ProductCardList/>
      <SlidingText />
      <CommitmentSection />
      <CommunitySection />
      <MomentsList/>
    </div>
  )
}

export default Home
