'use client'
 
import { 
  ParallaxHero,
  SlidingText,
  CommitmentSection,
  CommunitySection,
  PositionCarousel,
  MomentsList
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
      {/* <MomentsList/> */}
      <SimpleMoments/>
       
    </div>
  )
}

export default Home
