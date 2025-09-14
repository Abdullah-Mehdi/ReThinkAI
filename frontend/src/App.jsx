import { useState } from 'react';
import './styles/App.css';
import { FaArrowUp } from "react-icons/fa6";
import TypingBubble from './components/TypingBubble.jsx';

export default function OpenAIHome() {
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 3000);
  }

  return (
    <div className="homepage">
      {/* LEFT COLUMN */}
      <div className="left-col">
        <div className="logo">OpenAI</div>
        <div className="left-text"> 
          <p className="tagline">Research</p>
          <p className="tagline">Safety</p>
          <p className="tagline">For Business</p>
          <p className="tagline">For Developers</p>
          <p className="tagline">ChatGPT</p>
          <p className="tagline">Sora</p>
          <p className="tagline">Stories</p>
          <p className="tagline">Company</p>
          <p className="tagline">News</p>
        </div>
        
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-col">
        <h1 className="prompt-title">What can I help with?</h1>
        {isTyping && <TypingBubble />}
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your question..."
            className="prompt-input"
          />
          <button className="send-btn" onClick={handleSend}>
            <FaArrowUp size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}
