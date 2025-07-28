'use client'
 
import { 
  ParallaxHero,
  SlidingText,
  CommitmentSection,
  CommunitySection,
  PositionCarousel,
} from '@/components'
import SimpleMoments from '@/components/sections/SimpleMoments'
import ScrollDiscoverIndicator from '@/components/ui/ScrollDiscoverIndicator'

const Home = () => {
  return (
    <div className="bg-white text-black">
      <ParallaxHero />
      <PositionCarousel/>
      <SlidingText />
      <CommitmentSection />
      <CommunitySection />
      <SimpleMoments/>
      <ScrollDiscoverIndicator/>
    </div>
  )
}

export default Home
