'use client'
 
import { 
  ParallaxHero,
  SlidingText,
  CommitmentSection,
  CommunitySection,
  PositionCarousel,
} from '@/components'
import SimpleMoments from '@/components/sections/SimpleMoments'

const Home = () => {
  return (
    <div className="bg-white text-black">
      <ParallaxHero />
      <PositionCarousel/>
      <SlidingText />
      <CommitmentSection />
      <CommunitySection />
      <SimpleMoments/>
    </div>
  )
}

export default Home
