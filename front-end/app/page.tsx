import React from 'react'

import Hero from './components/landing/Hero'
import TitleWithPaint from './components/tools/title'
import Import from './components/tools/Imports'
import WorldMap from './components/tools/map'

export default function page() {
  return (
    <div className='bg-[var(--color-dark)] min-h-full'>
       <Hero />
       <TitleWithPaint />
       <Import />
       <WorldMap />
    </div>
  )
}
