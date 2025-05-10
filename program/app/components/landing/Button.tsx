import React from "react";

type Props = {
  children: React.ReactNode;
  variant: "outline" | "ghost" | "primary" | "secondary" | "tertiary" | "dark" | "darkPurple" | "darkGradientBorder";
  size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant,
  size = "md",
  ...props
}: Props) {
  const base =
    "relative font-semibold uppercase tracking-wide text-white transition-all duration-300 ease-in-out rounded-full";

  const variants: Record<Props["variant"], string> = {
    outline:
      "border border-white text-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white hover:bg-white/10",
    primary:
      "bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white",
    secondary: `
      bg-[var(--color-secondary)] text-white 
      bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-tertiary)] transition transition-colors duration-500
      hover:bg-gradient-to-r hover:from-[var(--color-tertiary)] hover:to-[var(--color-secondary)]
    `,
    tertiary: `
      bg-[var(--color-tertiary)] text-white
      bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] transition transition-colors duration-500
      hover:bg-gradient-to-r hover:from-[var(--color-secondary)] hover:to-[var(--color-tertiary)]
    `,
    dark:
      "bg-[var(--color-dark)] hover:bg-[var(--color-dark-purple)] text-white",
    darkPurple:
      "bg-[var(--color-dark-purple)] hover:bg-[var(--color-dark)] text-white",
    darkGradientBorder: `
      bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-[1px] rounded-full
      transition-transform duration-300 hover:scale-105
      shadow-[0_8px_24px_rgba(90,35,253,0.25)] hover:shadow-[0_12px_32px_rgba(90,35,253,0.4)]
      before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[var(--color-dark)] before:z-[1]
    `,
  };

  const sizes = {
    sm: "h-8 px-4 text-sm",
    md: "h-9 px-5 text-base",
    lg: "h-10 px-6 text-base",
  };

  return variant === "darkGradientBorder" ? (
    <div className={`relative inline-flex ${variants[variant]} ${sizes[size]}`}>
      <button
        className={`relative z-[2] w-full h-full rounded-full ${base}`}
        {...props}
      >
        {children}
      </button>
    </div>
  ) : (
    <button
      className={`custom-button ${base} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
