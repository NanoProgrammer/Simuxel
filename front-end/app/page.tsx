import React from 'react'
import Hero from './components/landing/Hero'
import TitleWithPaint from './components/tools/title'
import Import from './components/tools/Imports'
import SelectProject from './components/tools/selectProject'
import RealtimeWeather from './components/tools/RealtimeWeather'
import WeatherCustom from './components/tools/WeatherCustom'

export default function page() {
  return (
    <div className='bg-[var(--color-dark)] min-h-full'>
       <Hero />
       <TitleWithPaint />
       <Import />
       <SelectProject />
       <RealtimeWeather />
       <WeatherCustom />
    </div>
  )
}
