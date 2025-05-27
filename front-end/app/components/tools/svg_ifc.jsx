import React from 'react'

export default function Svgifc() {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="64" cy="64" r="56" fill="#D9D4BA" />
      <path
        d="M44 20C42.3431 20 41 21.3431 41 23V105C41 106.657 42.3431 108 44 108H100C101.657 108 103 106.657 103 105V40L83 20H44Z"
        fill="#C54F2F"
      />
      <path d="M83 20V40H103L83 20Z" fill="#A33E26" />
      <rect x="42" y="57" width="44" height="26" rx="4" fill="#72281A" />
      <text
        x="64"
        y="76"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={20}
        fill="white"
        fontWeight="bold"
      >
        IFC
      </text>
    </svg>
  )
}
