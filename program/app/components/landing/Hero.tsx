'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Header from './Header'
import { Button } from './Button'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  // Asegurarse de que el código se ejecute solo en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Obtener el tamaño de la ventana solo en el cliente
  useEffect(() => {
    if (!isClient) return
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [isClient])

  // Animación fondo + mouse
  useEffect(() => {
    if (!isClient || !bgRef.current) return
    const animateBackground = () => {
      const x = Math.sin(Date.now() * 0.011) * 25
      const y = Math.cos(Date.now() * 0.011) * 25
      gsap.to(bgRef.current, {
        x,
        y,
        duration: 1.5,
        ease: 'sine.inOut',
      })
      requestAnimationFrame(animateBackground)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 200
      const y = (e.clientY / window.innerHeight - 0.5) * 200
      gsap.to(bgRef.current, {
        x,
        y,
        duration: 1,
        ease: 'power3.out',
      })

      // Efecto de movimiento de formas
      const shapes = gsap.utils.toArray('.shape')
      shapes.forEach((shape: any, i) => {
        gsap.to(shape, {
          x: x * (i + 1) * 0.04,
          y: y * (i + 1) * 0.04,
          duration: 1,
          ease: 'power3.out',
        })
      })
    }

    animateBackground()
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isClient])

  // CRT distortion
  useEffect(() => {
    if (!isClient || !buttonRef.current) return
    gsap.fromTo(buttonRef.current,{
      scale: 0,
      rotate: -10,
      y: 50

    }, {
      scale: 1.1,
      repeat: 0,
      yoyo: false,
      rotate: 0,
      duration: 1,
      y: 0,
      delay: 0.15,
      ease: 'elastic.inOut',
    } )
  }, [isClient])

  // Animación de entrada de letras
  useEffect(() => {
    if (!isClient || !titleRef.current) return
    const letters = titleRef.current.querySelectorAll('span')

    gsap.from(letters, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1.5,
      ease: 'power3.out',
    })
  }, [isClient])

  useEffect(() => {
    
    if (!shapesRef.current) return
    gsap.to(shapesRef.current, {
      x: 'random(-5, 5)',
      skewX: 'random(-5, 5)',
      duration: 0.08,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])


  if (!isClient) return null

  return (
    <div className="relative overflow-hidden min-h-screen w-full bg-black/70 text-[var(--color-white)] flex flex-col">
      {/* Fondo animado */}
      <div ref={bgRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Círculos que se mueven */}
        <div className="absolute w-[80vw] h-[80vw] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-30 rounded-full mix-blend-lighten top-1/4 left-1/4 animate-float-fast" />
        <div className="absolute w-[70vw] h-[70vw] bg-gradient-to-br from-[var(--color-tertiary)] to-[var(--color-primary)] opacity-25 rounded-full mix-blend-lighten top-2/3 left-1/3 animate-float-slow" />
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-tertiary)] opacity-30 rounded-full mix-blend-lighten top-1/2 left-2/3 animate-float-medium" />
        <div className="absolute w-[50vw] h-[50vw] bg-gradient-to-br from-[var(--color-light)] to-[var(--color-tertiary)] opacity-20 rounded-full mix-blend-lighten top-1/3 left-1/2 animate-float-slower" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-light)] opacity-25 rounded-full mix-blend-lighten top-1/4 left-3/4 animate-float-fast" />
      </div>

      {/* Fondo adicional con formas animadas */}
      <div ref={shapesRef} className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          {[...Array(7)].map((_, i) => (
            <path
              key={i}
              className="shape"
              d={`M0 ${50 + i * 60} Q ${windowSize.width / 4} ${80 + i * 60}, ${windowSize.width / 2} ${50 + i * 60} T ${windowSize.width} ${50 + i * 60}`}
              stroke="url(#grad)"
              strokeWidth="4"  // Aumenté el grosor de las líneas
              fill="none"
            />
          ))}
        </svg>

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shape absolute w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-light)] opacity-30 blur-2xl"
            style={{
              top: `${5 + Math.random() * 30}%`,  // Distribución aleatoria
              left: `${10 + Math.random() * 30}%`, // Distribución aleatoria
            }}
          />
        ))}
      </div>

      {/* Header y contenido visible encima del fondo */}
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <h1
          ref={titleRef}
          className="crt-text text-5xl md:text-7xl font-extrabold tracking-wider text-center relative"
        >
          {['S', 'i', 'm', 'u', 'x', 'e', 'l'].map((letter, index) => (
            <span key={index} className="inline-block">{letter}</span>
          ))}
        </h1>
        <p className='text-2xl md:text-4xl font-extrabold tracking-wider text-center'>3D Building Performance Simulator</p>
        <div className='mt-8' ref={buttonRef}>
          <Button variant="outline" size="lg" >Start now</Button>
        </div>
      </div>
    </div>
  )
}
