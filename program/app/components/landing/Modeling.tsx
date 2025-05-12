'use client'

import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Suspense } from 'react'
import Model from './Model'
import Import from './Import'

gsap.registerPlugin(ScrollTrigger)

export default function Modeling() {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Configuración del contexto GSAP con ScrollTrigger
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top center',
          end: 'top 10%',
          scrub: true, // Hace que la animación siga el scroll
        },
      })
    }, [textRef])  // Dependencias vacías

    // Refresca los ScrollTriggers después de la carga
    ScrollTrigger.refresh()

    return () => ctx.revert() // Limpiar el contexto cuando el componente se desmonta
  }, [])

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-[var(--color-dark)]" id='model'>
      <h1
        ref={textRef}
        className="text-white text-3xl font-bold text-center mt-10 mb-24"
      >
        Tools
      </h1>

      <div className="flex flex-1">
        <div className="w-[40%] p-6 text-white space-y-4">
          <h3 className="text-xl font-semibold">Modeling</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
            itaque sint nisi officiis numquam cupiditate consequuntur vero...
          </p>
        </div>

        <div className="w-[60%] h-full">
          <Canvas
            orthographic
            camera={{ position: [0, 0, 100], zoom: 40 }}
            className="w-full h-full"
          >
            <group>
              <ambientLight intensity={0.8} />
              <directionalLight intensity={1} position={[6, 5, 6]} />
              <directionalLight intensity={0.5} position={[-6, -6, -6]} />
            </group>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full text-white animate-pulse">
                  Loading 3D model...
                </div>
              }
            >
              <Model />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <Import />
    </div>
  )
}
