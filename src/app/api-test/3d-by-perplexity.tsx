
'use client'
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Tạo 1 quả cầu đơn giản (atom)
function Atom({ position, color = 'red', radius = 0.3 }: { position: [number, number, number], color?: string, radius?: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
    </mesh>
  )
}

// Tạo 1 liên kết (bond) dưới dạng hình trụ nối 2 quả cầu
function Bond({ start, end, color = '#aaa' }: { start: THREE.Vector3, end: THREE.Vector3, color?: string }) {
  const ref = useRef<THREE.Mesh>(null)
  // Tính toán vị trí trung điểm nối start-end
  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
  // Tính toán vector hướng nối
  const direction = new THREE.Vector3().subVectors(end, start)
  const length = direction.length()
  // Tạo ma trận dịch chuyển xoay theo hướng vector
  const axis = new THREE.Vector3(0, 1, 0)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, direction.clone().normalize())
  return (
    <mesh position={midpoint} ref={ref} quaternion={quaternion}>
      <cylinderGeometry args={[0.09, 0.09, length, 16]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
    </mesh>
  )
}



function EthaneMolecule() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })
  // Vị trí các nguyên tử C và H theo phân tử Ethane (C2H6)
  const carbon1 = new THREE.Vector3(-0.7, 0, 0)
  const carbon2 = new THREE.Vector3(0.7, 0, 0)
  const hydrogens = [
    new THREE.Vector3(-1.2, 0.9, 0),
    new THREE.Vector3(-1.2, -0.9, 0),
    new THREE.Vector3(-0.7, 0, 1),
    new THREE.Vector3(1.2, 0.9, 0),
    new THREE.Vector3(1.2, -0.9, 0),
    new THREE.Vector3(0.7, 0, -1),
  ]
  return (
    <group ref={groupRef}>
      {/* 2 nguyên tử Carbon */}
      <Atom position={carbon1.toArray()} color={'#222'} radius={0.4} />
      <Atom position={carbon2.toArray()} color={'#222'} radius={0.4} />
      {/* 6 nguyên tử Hydrogen */}
      {hydrogens.map((pos, idx) => (
        <Atom key={idx} position={pos.toArray()} color={'#fff'} radius={0.25} />
      ))}
      {/* Liên kết giữa các nguyên tử */}
      <Bond start={carbon1} end={carbon2} color="#fbbf24" />
      {hydrogens.slice(0, 3).map((h, idx) => (
        <Bond key={'c1h'+idx} start={carbon1} end={h} color="#60a5fa" />
      ))}
      {hydrogens.slice(3).map((h, idx) => (
        <Bond key={'c2h'+idx} start={carbon2} end={h} color="#60a5fa" />
      ))}
    </group>
  )
}

export default function Ethane3D() {
  return (
    <div style={{ width: '100%', height: 500, background: 'linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ height: 500, width: '100%' }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 4, 5]} intensity={0.8} />
        <EthaneMolecule />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}
