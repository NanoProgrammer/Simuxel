// components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-6 px-4 sm:px-6 md:px-10 text-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <span className="text-white font-semibold">Simuxel</span>

        <div className="flex gap-4">
          <a href="#modeling" className="hover:text-cyan-400">Modeling</a>
          <a href="#weather" className="hover:text-cyan-400">Weather</a>
          <a href="#simulation" className="hover:text-cyan-400">Simulation</a>
          <a href="#comparisons" className="hover:text-cyan-400">Compare</a>
        </div>

        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Simuxel
        </p>
      </div>
    </footer>
  );
}
