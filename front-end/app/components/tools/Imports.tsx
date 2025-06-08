import React from 'react'
import Svgglft from './svg_glft'
import Svgifc from './svg_ifc'
import Svgdwg from './svg_dwg'
import Svgdxf from './svg_dxf'
import { Button } from '../landing/Button'
import Link from 'next/link'

export default function Import() {
  const fileTypes = [
    { icon: <Svgglft />, label: 'GLTF' },
    { icon: <Svgifc />, label: 'IFC' },
    { icon: <Svgdwg />, label: 'DWG' },
    { icon: <Svgdxf />, label: 'DXF' },
  ]

  return (
    <section className="w-full py-20 px-4 bg-[var(--color-bg)] text-[var(--color-text)] relative">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-heading text-[var(--color-secondary)] mb-6 animate-float">
          From File to Forecast
        </h2>

        <p className="text-[16px] md:text-xl text-[var(--color-subtext)] max-w-3xl mx-auto leading-relaxed mb-12">
          Upload your <span className="text-[var(--color-primary)] font-semibold">GLTF</span>, <span className="text-[var(--color-primary)] font-semibold">IFC</span>, <span className="text-[var(--color-primary)] font-semibold">DWG</span>, or <span className="text-[var(--color-primary)] font-semibold">DXF</span> file and instantly simulate your building&apos;s energy use, thermal comfort, and performance based on real climate data — no HVAC required.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-center items-center">
          {fileTypes.map(({ icon, label }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300"
            >
              <div className="w-32 h-32">{icon}</div>
              <span className="text-sm text-[var(--color-subtext)] group-hover:text-[var(--color-secondary)] transition">
                {label} Format
              </span>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <Link href="/simulator">
            <Button variant="darkGradientBorder" size="lg">
              <span className="inner text-lg px-6 py-3">Upload Your Model</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
