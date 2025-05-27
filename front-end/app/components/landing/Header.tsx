import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./Button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl w-full text-[var(--color-text)]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/objLogo.png" alt="Simuxel Logo" width={70} height={30} />
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 text-sm font-medium">
            {[
              { href: "#model", label: "Modeling" },
              { href: "#wheater", label: "Weather" },
              { href: "#simulate", label: "Simulation" },
              { href: "#compare", label: "Comparisons" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="transition duration-300 ease-in-out hover:text-[var(--color-secondary)] hover:scale-105"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Botones Auth Desktop */}
          <div className="flex gap-4 ml-6">
            <Link href="/sign-in">
              <Button variant="secondary" size="md">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
        </nav>

        {/* Botones Mobile */}
        <div className="flex md:hidden gap-3 ml-auto text-sm">
          <Link href="/sign-in">
            <Button variant="secondary" size="sm">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="darkGradientBorder">Sign Up</Button>

          </Link>
        </div>
      </div>
    </header>
  );
}
