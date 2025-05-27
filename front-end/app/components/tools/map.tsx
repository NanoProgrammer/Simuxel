'use client'

import React, { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps'

// Usa un geoJSON confiable con CORS
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Temperaturas promedio
const temperatureData: Record<string, number> = {
  Canada: -5,
  Colombia: 24,
  Brazil: 27,
  Russia: -10,
  India: 30,
  Australia: 22,
  'United States': 15,
  Germany: 10,
  Egypt: 35,
  'South Africa': 21,
}

export default function WorldMap() {
  const [tooltip, setTooltip] = useState<{ name: string; temp: number } | null>(null)

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-16">
      <ComposableMap
        projection="geoEqualEarth"
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string = geo.properties?.name || geo.properties?.NAME || 'Unknown'
              const temp = temperatureData[name]

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if (temp !== undefined) {
                      setTooltip({ name, temp })
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: {
                      fill: temp
                        ? `rgba(255, 99, 71, ${Math.min(temp / 40, 1)})`
                        : '#ccc',
                      outline: 'none',
                    },
                    hover: {
                      fill: '#00E5FF',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#FF5722',
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div className="absolute left-4 top-4 bg-black/80 text-white text-sm px-4 py-2 rounded-md shadow-md pointer-events-none">
          <strong>{tooltip.name}</strong>: {tooltip.temp}°C avg
        </div>
      )}
    </div>
  )
}
