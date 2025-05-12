import { useGLTF } from '@react-three/drei'
import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

// Precarga el modelo
useGLTF.preload('/models/model.glb')

export default function Model(props) {
  const { scene } = useGLTF('/models/model.glb')
  const modelRef = useRef()

  useLayoutEffect(() => {
    if (!modelRef.current) return

    const rotationAmount = Math.PI * 2

    gsap.to(modelRef.current.rotation, {
      y: `-=${rotationAmount}`,
      duration: 20,
      repeat: -1,
      ease: 'linear',
    })
  }, [])

  return (
    <primitive
      ref={modelRef}
      object={scene}
      {...props}
      position={[-2, -4, 0]}
      scale={0.88}
    />
  )
}
