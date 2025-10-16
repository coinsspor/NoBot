import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

function WireframeGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group>
      {/* Main wireframe sphere */}
      <Sphere ref={meshRef} args={[2, 32, 32]}>
        <meshBasicMaterial 
          color="#00f0ff" 
          wireframe 
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial 
          color="#b537f2" 
          wireframe 
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>

      {/* Particles */}
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
    </group>
  )
}

export default function Globe() {
  return (
    <div className="w-full h-96 rounded-3xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <color attach="background" args={['#0a0e27']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <WireframeGlobe />
      </Canvas>
    </div>
  )
}
