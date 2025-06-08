'use client';
import { motion } from 'framer-motion';
import WeatherTitle from './WeatherTitle';
import Link from 'next/link';

export default function SelectProject() {
  return (
    <>
      <WeatherTitle />
      <div className='flex flex-col items-center justify-center h-screen'>
        <motion.h1
          className='animate-float text-4xl items-center shadow-blue-400/50 shadow-2xs text-center font-bold mx-8'
          whileInView="onscreen"
        >
          Selects A Project
        </motion.h1>

        <div className='animate-float flex flex-row items-center justify-around mt-8 p-8 rounded-lg shadow-purple-500/50 shadow-2xl bg-grey-100 dark:bg-gray-800 w-full md:w-6/9 h-3/4 scale-[0.85] sm:scale-[0.9] md:scale-100 transition-transform'>
          {Array(3).fill().map((_, index) => (
            <motion.div
              key={index}
              className='h-5/9 w-3/11 bg-[var(--color-bg)]/70 shadow-blue-500/10 shadow-xl rounded-2xl container flex flex-col items-center justify-around p-4'
              whileInView={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            >
              Project {index + 1}

              {index === 0 && (
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='ml-4'>
                  <rect x="20" y="30" width="30" height="50" fill="#3b82f6" rx="2" />
                  <line x1="10" y1="80" x2="40" y2="50" stroke="#9333ea" strokeWidth="2" />
                  <line x1="40" y1="50" x2="70" y2="60" stroke="#9333ea" strokeWidth="2" />
                  <circle cx="10" cy="80" r="3" fill="#9333ea" />
                  <circle cx="40" cy="50" r="3" fill="#9333ea" />
                  <circle cx="70" cy="60" r="3" fill="#9333ea" />
                </svg>
              )}

              {index === 1 && (
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="35" width="20" height="45" fill="#60a5fa" rx="2" />
                  <rect x="45" y="50" width="8" height="30" fill="#9333ea" />
                  <rect x="56" y="45" width="8" height="35" fill="#9333ea" />
                  <rect x="67" y="40" width="8" height="40" fill="#9333ea" />
                  <circle cx="25" cy="25" r="6" fill="#bae6fd" />
                  <circle cx="75" cy="25" r="10" fill="#a78bfa" />
                  <path d="M75 25 L75 18 L80 25 Z" fill="#1e40af" />
                </svg>
              )}

              {index === 2 && (
                <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#60a5fa" strokeDasharray="4,2" strokeWidth="1.5" />
                  <line x1="50" y1="20" x2="50" y2="80" stroke="#9333ea" strokeWidth="1" />
                  <line x1="20" y1="50" x2="80" y2="50" stroke="#9333ea" strokeWidth="1" />
                  <path d="M20,80 Q40,40 60,60 T90,65" stroke="#9333ea" fill="none" strokeWidth="2" />
                  <circle cx="20" cy="80" r="3" fill="#9333ea" />
                  <circle cx="60" cy="60" r="3" fill="#9333ea" />
                  <circle cx="90" cy="65" r="3" fill="#9333ea" />
                </svg>
              )}

              <Link href='/simulator'>
                <button className='bg-dark text-white px-4 py-2 rounded-lg shadow-md hover:scale-110 transition-transform duration-300 ease-in-out shadow-blue-500/50'>
                  Select
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
