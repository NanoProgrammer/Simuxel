import React from 'react'

import Hero from './components/landing/Hero'
import Modeling from './components/landing/Modeling'

export default function page() {
  return (
    <div className='bg-[var(--color-dark)] min-h-full'>
       <Hero />
       <Modeling />
    </div>
  )
}
