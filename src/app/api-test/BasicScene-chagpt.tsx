// app/components/EthanecomLogo.tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Text3D, Environment, Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'


function RotatingText3D() {
  const textRef = useRef<any>(null)
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      textRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })
  return (
    <Center>
      <group ref={textRef}>
        <Text3D
          font={'/fonts/Studio-Pro-Bold-Regular.json'}
          size={1.4}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.1}
          bevelSize={0.06}
          bevelSegments={10}
        >
          ETHANECOM
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.7}
            roughness={0.2}
            emissive="#ffedd5"
            emissiveIntensity={0.5}
          />
        </Text3D>
      </group>
    </Center>
  )
}

function BasicSceneChagpt() {
  return (
    <div style={{ width: '100%', height: '500px', background: 'linear-gradient(145deg, #fce8d5, #ffe5ec)' }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} shadows>
        <Suspense fallback={null}>
          {/* Xoá HDRI, dùng màu nền đơn giản */}
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={0.3} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-5, -3, 5]} intensity={0.6} color="#ff90b3" />
          <pointLight position={[4, 5, -5]} intensity={0.5} color="#93c5fd" />

          <RotatingText3D />

          <Sparkles
            count={40}
            scale={[10, 2, 10]}
            size={2}
            speed={0.6}
            color="#fff1e6"
            opacity={0.7}
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} intensity={1.3} />
          </EffectComposer>
        </Suspense>

        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default BasicSceneChagpt

