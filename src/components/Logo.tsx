import React from 'react';

interface LogoProps {
  className?: string;
  size?: number; // overall height or bounding size in px
  light?: boolean; // if true, S turns white for dark backgrounds
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, light = false }) => {
  // We use the exact brand colors: blue (#00468b) or offwhite, and red (#E31B23) for 'D'
  const sColor = light ? '#FAFAF8' : '#00468b';
  const dColor = '#E31B23';

  // We design a beautiful vector layout where "S" and "D" are beautifully nested.
  // The 'Playfair Display' font is already imported globally in index.css.
  // Using an SVG with <text> ensures pixel-perfect rendering across all devices.
  return (
    <div 
      className={`relative inline-block select-none ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* 'D' is placed on the right and slightly lower, rendered first so it stays in the background */}
        <text
          x="35"
          y="78"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="75"
          fontWeight="900"
          fill={dColor}
          stroke={dColor}
          strokeWidth="3"
          strokeLinejoin="round"
          style={{ paintOrder: 'stroke fill' }}
          letterSpacing="-0.05em"
        >
          D
        </text>

        {/* 'S' is placed on the left, rendered second so its curves gracefully overlap the 'D' */}
        <text
          x="3"
          y="72"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="75"
          fontWeight="900"
          fill={sColor}
          stroke={sColor}
          strokeWidth="3"
          strokeLinejoin="round"
          style={{ paintOrder: 'stroke fill' }}
          letterSpacing="-0.05em"
        >
          S
        </text>
      </svg>
    </div>
  );
};

export default Logo;
