import React from 'react'
import Background from './components/Background'

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Background />
      <div className="relative">{children}</div>
    </div>
  );
}

