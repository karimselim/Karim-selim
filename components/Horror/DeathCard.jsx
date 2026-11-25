import React from 'react';

// Tarot XIII, drawn in SVG: gold frame, a skull made of a bug icon, a scythe.
const DeathCard = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 300"
    role="img"
    aria-label="Death, tarot card XIII"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', backfaceVisibility: 'hidden' }}
  >
    <defs>
      <radialGradient id="dc-bg" cx="50%" cy="45%" r="70%">
        <stop offset="0" stopColor="#3a0a0e" />
        <stop offset="1" stopColor="#0a0204" />
      </radialGradient>
    </defs>
    <rect width="200" height="300" rx="10" fill="url(#dc-bg)" />
    <rect x="8" y="8" width="184" height="284" rx="6" fill="none" stroke="#d4af37" strokeWidth="2" />
    <rect x="15" y="15" width="170" height="270" rx="4" fill="none" stroke="#d4af37" strokeWidth="0.6" opacity=".7" />
    <text x="100" y="42" textAnchor="middle" fill="#d4af37" fontFamily="serif" fontSize="18" letterSpacing="4">XIII</text>
    <g stroke="#d4af37" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M52 250 L146 70" />
      <path d="M146 70 Q 176 74 168 108 Q 160 90 140 84" fill="#d4af37" />
    </g>
    <g fill="#e9dcc0">
      <ellipse cx="100" cy="140" rx="38" ry="42" />
      <rect x="80" y="170" width="40" height="26" rx="5" />
    </g>
    <g fill="#0a0204">
      <ellipse cx="85" cy="138" rx="9" ry="12" />
      <ellipse cx="115" cy="138" rx="9" ry="12" />
      <path d="M100 150 L94 164 L106 164Z" />
    </g>
    <g stroke="#0a0204" strokeWidth="2.5">
      <path d="M88 176 V194 M96 176 V194 M104 176 V194 M112 176 V194" />
    </g>
    <circle cx="85" cy="138" r="2.5" fill="#ff3b3b" />
    <circle cx="115" cy="138" r="2.5" fill="#ff3b3b" />
    <text x="100" y="268" textAnchor="middle" fill="#d4af37" fontFamily="serif" fontSize="16" letterSpacing="5">DEATH</text>
  </svg>
);

export default DeathCard;
