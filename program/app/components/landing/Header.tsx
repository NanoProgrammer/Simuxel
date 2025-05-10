import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";

export default function Header() {
  return (
    <header className="text-primary sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-16 py-1 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image src="/objLogo.png" alt="Logo" width={70} height={30} />
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <a
                href="#model"
                className="transition-all duration-500 ease-in-out hover:text-[var(--color-text)] hover:scale-105"
              >
                Modeling
              </a>
            </li>
            <li>
              <a
                href="#wheater"
                className="transition-all duration-300 ease-in-out hover:text-[var(--color-text)] hover:scale-105"
              >
                Weather
              </a>
            </li>
            <li>
              <a
                href="#simulate"
                className="transition-all duration-300 ease-in-out hover:text-[var(--color-text)] hover:scale-105"
              >
                Simulation
              </a>
            </li>
            <li>
              <a
                href="#compare"
                className="transition-all duration-300 ease-in-out hover:text-[var(--color-text)] hover:scale-105"
              >
                Comparations
              </a>
            </li>
          </ul>

          {/* Botones */}
          <div className="flex gap-4 ml-6">
            <Link href="/sign-in">
              <Button variant="secondary" size="md">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="tertiary" size="md">Sign Up</Button>
            </Link>
          </div>
        </nav>

        {/* Botones Mobile */}
        <div className="flex md:hidden gap-3 ml-auto text-sm">
        <Link href="/sign-in">
              <Button variant="secondary" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="tertiary" size="sm">Sign Up</Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
