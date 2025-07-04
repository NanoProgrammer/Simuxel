'use client';
import { useState } from 'react';

export default function Button({ type = 'progress' }) {
  const [hovered, setHovered] = useState(false);

  const styles = {
    progress: {
      label: 'In Progress',
      color: '#00f0ff',
      gradient: 'linear-gradient(45deg, #011e2a, #033946)',
    },
    todo: {
      label: 'To-do',
      color: '#9b9bff',
      gradient: 'linear-gradient(45deg, #1a1a3d, #35357c)',
    },
    review: {
      label: 'In Review',
      color: '#ffe066',
      gradient: 'linear-gradient(135deg, #2e2600, #4a3e00)',
    },
    design: {
      label: 'Design Review',
      color: '#c085ff',
      gradient: 'linear-gradient(135deg, #2d003d, #510065)',
    },
    done: {
      label: 'Done',
      color: '#00e676',
      gradient: 'linear-gradient(135deg, #013b1a, #026e34)',
    },
    notStarted: {
      label: 'Not Started',
      color: '#ff6ec7',
      gradient: 'linear-gradient(135deg, #4b0030, #73004f)',
    },
    blocked: {
      label: 'Blocked',
      color: '#ff3b3b',
      gradient: 'linear-gradient(135deg, #420000, #7a0000)',
    },
    hold: {
      label: 'On Hold',
      color: '#4fc3f7',
      gradient: 'linear-gradient(135deg, #001933, #003f7f)',
    },
    archived: {
      label: 'Archived',
      color: '#aaaaaa',
      gradient: 'linear-gradient(135deg, #2a2a2a, #555555)',
    },
  };

  const style = styles[type];
  if (!style) return null;

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative px-4 py-2 rounded-xl text-white font-light tracking-wide 
        flex items-center gap-2 transition-all duration-500 ease-in-out
        shadow-[0_0_3px_var(--shadow-color)_inset,_0_0_6px_var(--shadow-color)]
        transform hover:scale-[1.05] overflow-hidden
      `}
      style={{
        background: style.gradient,
        '--shadow-color': style.color,
      }}
    >
      <span>{style.label}</span>
      <span
        className="absolute top-0 left-[-100%] w-full h-full"
        style={{
          background: `linear-gradient(60deg, transparent, transparent, ${style.color}40, transparent, transparent)`,
          transform: hovered ? 'translateX(200%)' : 'translateX(0%)',
          transition: 'transform 0.8s ease',
        }}
      />
    </button>
  );
}
