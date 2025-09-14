import React from 'react';

const WaterBottle = ({ fillPercentage = 0 }) => {
  return (
    <div className="water-bottle-container">
      <svg width="120" height="200" viewBox="0 0 120 200" className="water-bottle">
        {/* Bottle outline */}
        <defs>
          <linearGradient id="waterGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#4FC3F7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#81C784', stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Bottle body */}
        <path
          d="M30 40 L30 170 Q30 180 40 180 L80 180 Q90 180 90 170 L90 40 Q90 30 80 30 L40 30 Q30 30 30 40"
          fill="none"
          stroke="#333"
          strokeWidth="3"
          filter="url(#shadow)"
        />
        
        {/* Bottle neck */}
        <rect x="45" y="20" width="30" height="20" rx="5" fill="none" stroke="#333" strokeWidth="3"/>
        
        {/* Bottle cap */}
        <rect x="42" y="10" width="36" height="15" rx="7" fill="#FF6B6B" stroke="#333" strokeWidth="2"/>
        
        {/* Water fill */}
        <clipPath id="bottleClip">
          <path d="M33 40 L33 170 Q33 177 40 177 L80 177 Q87 177 87 170 L87 40 Q87 33 80 33 L40 33 Q33 33 33 40"/>
        </clipPath>
        
        <rect
          x="30"
          y={180 - (fillPercentage * 1.4)} // Adjust fill height based on percentage
          width="60"
          height={fillPercentage * 1.4}
          fill="url(#waterGradient)"
          clipPath="url(#bottleClip)"
          className="water-fill"
        />
        
        {/* Water surface animation */}
        {fillPercentage > 0 && (
          <ellipse
            cx="60"
            cy={180 - (fillPercentage * 1.4)}
            rx="27"
            ry="3"
            fill="#29B6F6"
            opacity="0.8"
            clipPath="url(#bottleClip)"
            className="water-surface"
          />
        )}
        
        {/* Volume labels */}
        <text x="100" y="145" fontSize="12" fill="#666" className="volume-label">8oz</text>
        <text x="100" y="110" fontSize="12" fill="#666" className="volume-label">12oz</text>
        <text x="100" y="75" fontSize="12" fill="#666" className="volume-label">16oz</text>
        <text x="100" y="40" fontSize="12" fill="#666" className="volume-label">20oz</text>
      </svg>
    </div>
  );
};

export default WaterBottle;
