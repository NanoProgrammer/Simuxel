"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Header from "./Header";
import { Button } from "./Button";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !bgRef.current) return;

    const animateBackground = () => {
      const x = Math.sin(Date.now() * 0.011) * 25;
      const y = Math.cos(Date.now() * 0.011) * 25;
      gsap.to(bgRef.current, {
        x,
        y,
        duration: 1.5,
        ease: "sine.inOut",
      });
      requestAnimationFrame(animateBackground);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 200;
      const y = (e.clientY / window.innerHeight - 0.5) * 200;
      gsap.to(bgRef.current, {
        x,
        y,
        duration: 1,
        ease: "power3.out",
      });

      const shapes = gsap.utils.toArray(".shape");
      shapes.forEach((shape: any, i) => {
        gsap.to(shape, {
          x: x * (i + 1) * 0.04,
          y: y * (i + 1) * 0.04,
          duration: 1,
          ease: "power3.out",
        });
      });
    };

    animateBackground();
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !buttonRef.current) return;
    gsap.fromTo(
      buttonRef.current,
      {
        scale: 0,
        rotate: -10,
        y: 50,
      },
      {
        scale: 1.1,
        rotate: 0,
        y: 0,
        duration: 1,
        delay: 0.15,
        ease: "elastic.inOut",
      }
    );
  }, [isClient]);

  useEffect(() => {
    if (!isClient || !titleRef.current) return;
    const letters = titleRef.current.querySelectorAll("span");
    gsap.from(letters, {
      opacity: 0,
      yPercent: 100,
      stagger: 0.1,
      duration: 1.5,
      ease: "power3.out",
    });
  }, [isClient]);

  useEffect(() => {
    if (!shapesRef.current) return;
    gsap.to(shapesRef.current, {
      x: "random(-5, 5)",
      skewX: "random(-5, 5)",
      duration: 0.08,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  if (!isClient) return null;

  return (
    <div className="relative overflow-hidden min-h-screen w-full bg-[var(--color-bg)]/90 text-[var(--color-text)] flex flex-col">
      {/* Fondo animado */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Formas animadas */}
      <div ref={shapesRef} className="absolute inset-0 z-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          {[...Array(7)].map((_, i) => (
            <path
              key={i}
              className="shape"
              d={`M0 ${50 + i * 60} Q ${windowSize.width / 4} ${80 + i * 60}, ${
                windowSize.width / 2
              } ${50 + i * 60} T ${windowSize.width} ${50 + i * 60}`}
              stroke="url(#grad)"
              strokeWidth="4"
              fill="none"
            />
          ))}
        </svg>

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="shape absolute w-40 h-40 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-30 blur-2xl"
            style={{
              top: `${5 + Math.random() * 30}%`,
              left: `${10 + Math.random() * 30}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <Header />

      {/* Título + subtítulo + botón */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 min-h-[120px]">
        <h1
          ref={titleRef}
          className="crt-text text-5xl md:text-7xl font-extrabold tracking-wider text-center relative min-h-[120px]"
        >
          {["S", "i", "m", "u", "x", "e", "l"].map((letter, index) => (
            <span key={index} className="inline-block">
              {letter}
            </span>
          ))}
        </h1>
        <p className="text-2xl md:text-4xl mx-8 font-extrabold tracking-wider text-center">
          3D Building Performance Simulator
        </p>
        <div className="mt-8" ref={buttonRef}>
          <Button variant="darkGradientBorder" size="lg">
            <span className="inner">START NOW</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
