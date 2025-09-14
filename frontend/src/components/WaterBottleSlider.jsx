import React, { useState } from 'react';
import WaterBottle from './WaterBottle';
import '../styles/WaterBottle.css';

const WaterBottleSlider = () => {
  const [selectedSize, setSelectedSize] = useState(8);
  
  // Map bottle sizes to fill percentages
  const sizeToFillPercentage = {
    8: 25,   // 25% fill for 8oz
    12: 50,  // 50% fill for 12oz
    16: 75,  // 75% fill for 16oz
    20: 100  // 100% fill for 20oz
  };

  const sizes = [8, 12, 16, 20];

  return (
    <div className="water-bottle-slider">
      <div className="question-container">
        <h2>How much water does each AI prompt use?</h2>
        <p>Move the slider to select your answer:</p>
      </div>
      
      <div className="bottle-and-controls">
        <div className="bottle-display">
          <WaterBottle fillPercentage={sizeToFillPercentage[selectedSize]} />
        </div>
        
        <div className="vertical-slider-container">
          <input
            type="range"
            min="0"
            max="3"
            value={sizes.indexOf(selectedSize)}
            onChange={(e) => setSelectedSize(sizes[parseInt(e.target.value)])}
            className="vertical-slider"
            orient="vertical"
          />
          <div className="vertical-labels">
            <span className="label-item">20oz</span>
            <span className="label-item">16oz</span>
            <span className="label-item">12oz</span>
            <span className="label-item">8oz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterBottleSlider;
