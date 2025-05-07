// Button.tsx
"use client"; // Este es el archivo que debe ser marcado como cliente.


type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  px?: string;
  white?: boolean;
  variant?: "primary" | "purple" | "custom";
};

const Button = ({
  children,
  className = "",
  href,
  onClick,
  px = "px-8",
  white = false,
  variant = "primary",
}: ButtonProps) => {
  // Definir la base de las clases
  const baseClasses =
    "inline-flex items-center justify-center h-12 font-semibold text-lg rounded-md transition-all duration-300 transform";

  // Colores de texto y fondo según el color y el modo blanco
  const textColor = white ? "text-[var(--color-text-primary)]" : "text-[var(--color-dark-base)]";
  
  const bgColor =
    variant === "primary"
      ? "bg-[var(--color-blue-primary)] hover:bg-[var(--color-blue-hover)]"
      : variant === "purple"
      ? "bg-[var(--color-purple-accent)] hover:bg-[var(--color-purple-hover)]"
      : "bg-transparent border-2 border-[var(--color-border-light)] hover:bg-[var(--color-dark-surface)]";

  const shadowEffect =
    variant === "primary" || variant === "purple"
      ? "shadow-lg hover:shadow-xl"
      : "";

  // Combinamos todas las clases
  const buttonClasses = `${baseClasses} ${textColor} ${bgColor} ${shadowEffect} ${px} ${className} hover:scale-105`;

  const content = <span>{children}</span>;

  // Si es un enlace
  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {content}
      </a>
    );
  }

  // Si es un botón
  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
};

export default Button;
