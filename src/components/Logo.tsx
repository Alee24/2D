import React from 'react';

interface LogoProps {
  className?: string;
  size?: number; // overall height or bounding size in px
  light?: boolean; // if true, S and left ring turn white for dark backgrounds
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 32, light = false }) => {
  // Brand emblem colors: strictly Black (#111111) and Vibrant Red (#E31B23)
  const sColor = '#111111';
  const dColor = '#E31B23';

  return (
    <div 
      className={`relative inline-block select-none ${className}`} 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full rounded-full"
      >
        {/* White background disc so black & red logo retains high contrast on all dark & light backgrounds */}
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" />

        {/* Left half outer ring arc (Black) */}
        <path
          d="M 47 7.5 A 42.5 42.5 0 0 0 47 92.5"
          stroke={sColor}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Right half outer ring arc (Red) */}
        <path
          d="M 53 7.5 A 42.5 42.5 0 0 1 53 92.5"
          stroke={dColor}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 'S' in bold geometric sans-serif (Black) */}
        <text
          x="33"
          y="66"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Inter', 'Montserrat', -apple-system, sans-serif"
          fontSize="46"
          fontWeight="900"
          fill={sColor}
        >
          S
        </text>

        {/* 'D' in bold geometric sans-serif (Red) */}
        <text
          x="67"
          y="66"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Inter', 'Montserrat', -apple-system, sans-serif"
          fontSize="46"
          fontWeight="900"
          fill={dColor}
        >
          D
        </text>
      </svg>
    </div>
  );
};

export default Logo;
