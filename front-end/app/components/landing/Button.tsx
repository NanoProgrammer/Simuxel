"use client";
import React, { useRef } from "react";
import { gsap, Elastic } from "gsap";

type Props = {
  children: React.ReactNode;
  variant:
    | "outline"
    | "ghost"
    | "primary"
    | "secondary"
    | "tertiary"
    | "dark"
    | "darkGradientBorder";
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant,
  size = "md",
  ...props
}: Props) {
  const base =
    "relative font-semibold uppercase tracking-wide text-[var(--color-text)] rounded-full";

  const variants: Record<Props["variant"], string> = {
    outline:
      "border border-[var(--color-text)] text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]",
    ghost:
      "bg-transparent text-[var(--color-text)] hover:bg-white/10",
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)]",
    secondary: `
      bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)]
      text-white transition duration-300 ease-in-out
      hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)]
    `,
    tertiary: `
      bg-[var(--color-accent)] text-[var(--color-text)]
      hover:bg-[var(--color-secondary)] transition duration-300 ease-in-out
    `,
    dark:
      "bg-[var(--color-bg)] text-[var(--color-text)] hover:bg-[var(--color-accent)]",
    darkGradientBorder: `
      bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]
      p-[1px] rounded-full shadow-[0_8px_24px_rgba(128,0,255,0.25)]
    `,
  };

  const sizes = {
    sm: "h-8 px-4 text-sm",
    md: "h-9 px-5 text-base",
    lg: "h-10 px-6 text-base",
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        rotationY: 20,
        rotateZ: 5,
        duration: 0.8,
        ease: Elastic.easeOut.config(1, 0.3),
      });
    }
  };

  const onMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        rotationY: 0,
        rotateZ: 0,
        duration: 0.8,
        ease: Elastic.easeOut.config(1, 0.3),
      });
    }
  };

  if (variant === "darkGradientBorder") {
    return (
      <div
        className={`relative inline-flex ${variants[variant]} ${sizes[size]} rounded-full`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <button
          ref={buttonRef}
          className={`relative z-[2] w-full h-full rounded-full ${base}`}
          {...props}
        >
          {children}
        </button>
      </div>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={`${base} ${variants[variant]} ${sizes[size]}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
