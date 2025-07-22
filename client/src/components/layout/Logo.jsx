import React, { useId } from 'react';

// This component encapsulates your SVG logo
export const Logo = ({ size = 'default', className, ...props }) => {
  // Define the pixel dimensions for each size variant
  const sizeMap = {
    small: '32',
    default: '40',
    large: '64',
  };

  // Generate a unique ID for the gradient to avoid conflicts
  const gradientId = useId();
  const currentSize = sizeMap[size] || sizeMap.default;

  return (
    <svg
      width={currentSize}
      height={currentSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill={`url(#${gradientId})`} />
      <g fill="white">
        <rect x="14" y="12" width="3" height="24" rx="1.5" />
        <rect x="14" y="12" width="16" height="3" rx="1.5" />
        <rect x="14" y="21" width="12" height="3" rx="1.5" />
        <rect x="14" y="33" width="16" height="3" rx="1.5" />
        <circle cx="35" cy="16" r="2" opacity="0.9" />
        <circle cx="32" cy="20" r="1.5" opacity="0.75" />
        <circle cx="35" cy="24" r="1.5" opacity="0.75" />
        <circle cx="32" cy="28" r="2" opacity="0.9" />
      </g>
    </svg>
  );
};