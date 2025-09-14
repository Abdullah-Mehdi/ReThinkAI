import { useState } from 'react'
import './styles/App.css'
import WaterBottleSlider from './components/WaterBottleSlider'

import { FaArrowUp } from "react-icons/fa6";
import { RiLoopLeftLine } from "react-icons/ri";

import TypingBubble from './components/TypingBubble.jsx';

export default function OpenAIHome() {
  const [isTyping, setIsTyping] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'questions' will be the two pages (FOR NOW)
  const [inputText, setInputText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1); // Track which question (1-7)
  const [answers, setAnswers] = useState({}); // Store all answers.. hehehe...
  const [score, setScore] = useState(0);

  // Question data
  const questions = {
    1: {
      type: 'fillblank-slider',
      text: 'ChatGPT query consumes about _____ times more electricity than a simple web search.',
      blankWord: '5',
      sliderRange: [1, 10],
      correctAnswer: 5,
      component: null
    },
    2: {
      type: 'component',
      text: 'How much water does each AI prompt use?',
      component: WaterBottleSlider,
      correctAnswer: 16 
    },
    3: {
      type: 'placeholder',
      text: 'Question 3 placeholder',
      correctAnswer: 'placeholder',
      component: null
    },
    4: {
      type: 'placeholder',
      text: 'Question 4 placeholder',
      correctAnswer: 'placeholder',
      component: null
    },
    5: {
      type: 'placeholder',
      text: 'Question 5 placeholder',
      correctAnswer: 'placeholder',
      component: null
    },
    6: {
      type: 'placeholder',
      text: 'Question 6 placeholder',
      correctAnswer: 'placeholder',
      component: null
    },
    7: {
      type: 'placeholder',
      text: 'Question 7 placeholder',
      correctAnswer: 'placeholder',
      component: null
    }
  };

  // SO when we click send with text, we go to questions page yippie!!
  const handleSendClick = () => {
    if (inputText.trim()) {
      // Show typing bubble first
      setIsTyping(true);
      
      // After 3 seconds, hide typing bubble and navigate to questions
      setTimeout(() => {
        setIsTyping(false);
        setCurrentPage('questions');
        setCurrentQuestion(1);
      }, 3000);
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

    const currentQ = questions[currentQuestion];
    // Update score if answer is correct
    if (answer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }

    // Move to next question or finish (FOR NOW - we will change the finish state later)
    if (currentQuestion < 7) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // All questions completed
      console.log('All answers:', { ...answers, [currentQuestion]: answer });
      // alert('Survey completed! Check console for answers.');
      setCurrentPage('home');
      setCurrentQuestion(1);
      setAnswers({});
      setScore(0);

      setCurrentPage('results');
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
    setScore(0);
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

  if (currentPage === 'results') {
  const totalPoints = Object.values(answers).reduce((sum, ans) => {
    // For now: count any answer as 1 point (replace with real scoring logic later)
    return sum + (ans === 'placeholder' || ans === 'component-answer' ? 1 : 1);
  }, 0);

  const percentageBetter = Math.floor((totalPoints / 7) * 100); // fake comparison %

  return (
    <div className="results-page">
      <h1>You got {totalPoints}/7 points!</h1>
      <p>That's better than {percentageBetter}% of other users!!!</p>

      {/* Simple bar chart with Y axis */}
<div className="bar-chart-container">
  {/* Y axis labels */}
  <div className="y-axis">
    {[60, 50, 40, 30, 20, 10, 0].map((percent) => (
      <div key={percent} className="y-label">
        {percent}%
      </div>
    ))}
  </div>

  {/* Bars */}
  <div className="bar-chart">
    {[
      { score: 0, height: 20 },
      { score: 1, height: 10 },
      { score: 2, height: 30 },
      { score: 3, height: 60 },
      { score: 4, height: 110 },
      { score: 5, height: 30},
      { score: 6, height: 20 },
      { score: 7, height: 10 },
    ].map(({ score, height }) => (
      <div key={score} className="bar">
        <div 
          className="bar-fill" 
          style={{ height: `${height}px` }}
        />
        <span className="bar-label">{score}</span>
      </div>
    ))}
  </div>
</div>


      {/* Row of buttons */}
      <div className="results-buttons">
        <button className="next-btn" onClick={handleBackToHome}>Go Home</button>
        <button className="next-btn" onClick={() => setCurrentPage('questions')}>Retake Quiz  <RiLoopLeftLine size={20} /></button>
      </div>

      {/* Link text to Google Doc */}
      <p className="results-link">
        Read more about our <a href="https://docs.google.com/document/d/1TlMySydvNZwFaaoJoEQJum9m1lcZqLHacZ5_J1k9PUI/edit?usp=sharing" target="_blank" rel="noopener noreferrer">sources</a> here.
      </p>
    </div>
  );
}


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
          <div className="score-display">
            Score: {score} / {currentQuestion - 1}
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
              <currentQ.component onAnswer={handleNextQuestion} />
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
        {isTyping && <TypingBubble />}
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
