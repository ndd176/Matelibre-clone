'use client'
 
import ParallaxHero from '@/components/ParallaxHero'
 import SlidingText from '@/components/SlidingText'
 import CommitmentSection from '@/components/CommitmentSection'
 import CommunitySection from '@/components/CommunitySection'
import ProductCardList from './sections/PositionCarousel'
import MomentsList from '@/components/MomentsList'
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
