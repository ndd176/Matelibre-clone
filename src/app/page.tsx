'use client'
 
import { 
  ParallaxHero,
  SlidingText,
  CommitmentSection,
  CommunitySection,
  PositionCarousel,
  MomentsList
} from '@/components'

const Home = () => {
  return (
    <div className="bg-white text-black">
      <ParallaxHero />
      <PositionCarousel/>
      <SlidingText />
      <CommitmentSection />
      <CommunitySection />
      <MomentsList/>
    </div>
  )
}

export default Home
