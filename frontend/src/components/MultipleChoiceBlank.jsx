import React, { useState, useEffect } from 'react';

export default function MultipleChoiceBlank({ questionData, onAnswer }) {
  const [selected, setSelected] = useState(null);

  // Reset selected when question changes
  useEffect(() => {
    setSelected(null);
  }, [questionData.text]);

  const handleSelect = (optionIdx) => {
    setSelected(optionIdx);
  };

  const handleSubmit = () => {
    if (selected !== null) {
      onAnswer(questionData.options[selected]);
    }
  };

  // Split the text at the blank
  const textParts = questionData.text.split('_____');

  return (
    <div className="mc-blank-overlay">
      <div className="mc-blank-container">
        <div className="mc-question-text">
          {textParts[0]}
          <span className="mc-blank">
            {selected !== null ? questionData.options[selected] : '_____'}
          </span>
          {textParts[1]}
        </div>
        <div className="mc-options">
          {questionData.options.map((opt, idx) => (
            <button
              key={idx}
              className={`mc-option-btn${selected === idx ? ' selected' : ''}`}
              onClick={() => handleSelect(idx)}
              type="button"
            >
              {opt}
            </button>
          ))}
        </div>
        <button
          className="next-btn"
          onClick={handleSubmit}
          disabled={selected === null}
        >
          {questionData.isLast ? 'See Results' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}