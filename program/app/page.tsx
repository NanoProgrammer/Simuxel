// page.tsx
"use client";
import React from 'react';// npm install framer-motion gsap three @react-three/fiber @react-three/drei chart.js react-chartjs-2 zustand next-auth @next-auth/prisma-adapter @prisma/client
import Button from './components/landing/Button'; // Solo importa el componente Button

export default function Page() {
  return (
    <>
      <div className='bg-red text-white'>page</div>
      <Button variant="primary" onClick={() => console.log("click!")}>
        Empezar
      </Button>

      <Button href="/docs" variant="purple" white>
        Leer más
      </Button>

      <Button className="border border-light" px="px-10">
        Personalizado
      </Button>
    </>
  );
}
