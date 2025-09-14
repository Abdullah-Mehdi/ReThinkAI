import { useState } from 'react'
import './styles/App.css'
import WaterBottleSlider from './components/WaterBottleSlider'

import { FaArrowUp } from "react-icons/fa6";

export default function OpenAIHome() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'questions' will be the two pages (FOR NOW)
  const [inputText, setInputText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1); // Track which question (1-7)
  const [answers, setAnswers] = useState({}); // Store all answers.. hehehe...

  // Question data
  const questions = {
    1: {
      type: 'fillblank-slider',
      text: 'ChatGPT query consumes about _____ times more electricity than a simple web search.',
      blankWord: '5',
      sliderRange: [1, 10],
      component: null
    },
    2: {
      type: 'component',
      text: 'How much water does each AI prompt use?',
      component: WaterBottleSlider
    },
    3: {
      type: 'placeholder',
      text: 'Question 3 placeholder',
      component: null
    },
    4: {
      type: 'placeholder',
      text: 'Question 4 placeholder',
      component: null
    },
    5: {
      type: 'placeholder',
      text: 'Question 5 placeholder',
      component: null
    },
    6: {
      type: 'placeholder',
      text: 'Question 6 placeholder',
      component: null
    },
    7: {
      type: 'placeholder',
      text: 'Question 7 placeholder',
      component: null
    }
  };

  // SO when we click send with text, we go to questions page yippie!!
  const handleSendClick = () => {
    if (inputText.trim()) {
      setCurrentPage('questions');
      setCurrentQuestion(1);
    }
  };

  // Handle input text change - meaning when we type in the input box 
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle Enter key press to send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  const handleNextQuestion = (answer) => {
    // Store the current answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));

    // Move to next question or finish (FOR NOW - we will change the finish state later)
    if (currentQuestion < 7) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // All questions completed
      console.log('All answers:', { ...answers, [currentQuestion]: answer });
      alert('Survey completed! Check console for answers.');
      setCurrentPage('home');
      setCurrentQuestion(1);
      setAnswers({});
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCurrentQuestion(1);
    setAnswers({});
  };

  // Render Fill-in-the-blank with slider component
  const FillBlankSlider = ({ questionData, onAnswer }) => {
    const [sliderValue, setSliderValue] = useState(5); // Default to middle value
    const [fillValue, setFillValue] = useState(questionData.blankWord);

    // Update fill value as slider changes :))
    const handleSliderChange = (e) => {
      const value = parseInt(e.target.value);
      setSliderValue(value);
      setFillValue(value.toString());
    };

    const textParts = questionData.text.split('_____'); // Split the text at the blank~ so we can insert the slider value!!

    // SO this... this is what RENDERS the fill in the blank with slider component
    return (
      <div className="fill-blank-container">
        <div className="question-text">
          {textParts[0]}
          <span className="fill-blank">{fillValue}</span>
          {textParts[1]}
        </div>
        
        <div className="slider-container">
          <div className="slider-labels">
            <span>1</span>
            <span>10</span>
          </div>
          <input
            type="range"
            min={questionData.sliderRange[0]}
            max={questionData.sliderRange[1]}
            value={sliderValue}
            onChange={handleSliderChange}
            className="question-slider"
          />
        </div>
        
        <button 
          className="next-btn"
          onClick={() => onAnswer(sliderValue)}
        >
          Next Question
        </button>
      </div>
    );
  };

  // Show questions page
  if (currentPage === 'questions') {
    const currentQ = questions[currentQuestion];
    
    // RENDER QUESTIONS PAGE (depending on question type...)
    return (
      <div className="questions-page">
        <div className="questions-header">
          <button className="back-home-btn" onClick={handleBackToHome}>
            ← Home
          </button>
          <div className="progress-indicator">
            Question {currentQuestion} of 7
          </div>
          {currentQuestion > 1 && (
            <button className="prev-btn" onClick={handlePrevQuestion}>
              ← Previous
            </button>
          )}
        </div>

        <div className="question-content">
          {currentQ.type === 'fillblank-slider' && (
            <FillBlankSlider 
              questionData={currentQ} 
              onAnswer={handleNextQuestion}
            />
          )}
          
          {currentQ.type === 'component' && currentQ.component && (
            <div className="component-question">
              <currentQ.component />
              <button 
                className="next-btn"
                onClick={() => handleNextQuestion('component-answer')}
              >
                Next Question
              </button>
            </div>
          )}

          {currentQ.type === 'placeholder' && (
            <div className="placeholder-question">
              <h2>{currentQ.text}</h2>
              <p>This question will be implemented later.</p>
              <button 
                className="next-btn"
                onClick={() => handleNextQuestion('placeholder')}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show home page
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
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your question..."
            className="prompt-input"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="send-btn"
            onClick={handleSendClick}
            disabled={!inputText.trim()}
          >
            <FaArrowUp size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
