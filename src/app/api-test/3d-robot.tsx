import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Spline = dynamic(() => import('@splinetool/react-spline/next'), { ssr: false })

export default function SplineRobot() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768)
  }, [])

  return (
    <main className="w-full h-screen">
      {isDesktop ? (
        <Spline         scene="https://prod.spline.design/6Mvm0piLJKnYY5Od/scene.splinecode" 
 />
        
      ) : (
        <img src="/images/Will-Smith-meme-4.png" alt="3D Robot" className="w-full h-full object-cover" />
      )}
<iframe src='https://my.spline.design/nexbotrobotcharacterconcept-RMKbkMtMTROJiqZ8QifRRx1s/' width='100%' height='100%'></iframe>
      <iframe src='https://my.spline.design/liquidglass-sgvhwAfr3Aqbj9ovyQZzp1CT/'  width='100%' height='100%'></iframe>
    </main>
    
  )
}