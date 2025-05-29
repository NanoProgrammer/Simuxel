import type { Metadata } from "next";
import { Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simuxel – 3D Building Performance Simulator",
  description:
    "Simuxel es una plataforma web que permite modelar y simular en 3D el rendimiento energético de edificios directamente en el navegador, usando datos climáticos reales y visualizaciones térmicas interactivas.",
  keywords: [
    "simulación energética",
    "simulador edificios",
    "3D energy modeling",
    "rendimiento térmico",
    "arquitectura sustentable",
    "Simuxel",
    "web simulator",
  ],
  authors: [{ name: "Simuxel Team" }],
  icons: {
    icon: "/favico.ico",
  },
  openGraph: {
    title: "Simuxel – 3D Building Performance Simulator",
    description:
      "Modela edificios y simula su comportamiento térmico en tiempo real con datos climáticos reales, directamente desde tu navegador.",
    url: "https://simuxel.com",
    siteName: "Simuxel",
    images: [
      {
        url: "https://simuxel.com/og.png",
        width: 600,
        height: 600,
        alt: "Simuxel – 3D Building Performance Simulator",
      },
    ],
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0D0D11",  // Mover themeColor aquí
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
