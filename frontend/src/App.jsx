import { useState } from 'react'
import './styles/App.css'

import { FaArrowUp } from "react-icons/fa6";

export default function OpenAIHome() {
  return (
    <div className="homepage">
      {/* LEFT COLUMN */}
      <div className="left-col">
        <div className="logo">OpenAI</div>
        <div className="left-text"> 
          <p className="tagline"> AAAAAA</p>
          <p className="tagline"> BBBBBBB</p>
          <p className="tagline"> CCCCCCCC</p>
        </div>
        
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-col">
        <h1 className="prompt-title">What can I help with?</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your question..."
            className="prompt-input"
          />
          <button className="send-btn">
            <FaArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
