import { useState } from 'react'
import Lottie from 'lottie-react'
import './styles/App.css'
import WaterBottleSlider from './components/WaterBottleSlider'
import MultipleChoiceBlank from './components/MultipleChoiceBlank.jsx';

import { FaArrowUp } from "react-icons/fa6";
import { RiLoopLeftLine } from "react-icons/ri";

import TypingBubble from './components/TypingBubble.jsx';
import backImg from './assets/backdrop.svg'
import backAnim from './assets/animatedElements.json'

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
      type: 'multiple-choice-blank',
      text: 'In 2023, they used _____ gallons of water for their data centers. Enough to water 41 golf courses annually.',
      options: ['4 billion', '500 million', '6 billion', '700 million'],
      correctAnswer: '6 billion', 
      component: MultipleChoiceBlank
    },
    4: {
      type: 'multiple-choice-blank',
      text: 'Making a 2 kg computer requires _____ the amount of raw materials.',
      options: ['100 times', '400 times', '600 times', '10000 times'],
      correctAnswer: '400 times',
      component: MultipleChoiceBlank
    },
    5: {
      type: 'multiple-choice-blank',
      text: 'In AI datacenters, a GPU’s lifespan averages to _____ .',
      options: ['2-5 years', '1-3 years', '2-10 years', '1-7 years'],
      correctAnswer: '1-3 years',
      component: MultipleChoiceBlank
    },
    6: {
      type: 'multiple-choice-blank',
      text: 'By 2026, the yearly electricity consumption of data centers could power _____ American homes for a full year.',
      options: ['11 million', '27 million', '54 million', '73 million'],
      correctAnswer: '73 million',
      component: MultipleChoiceBlank
    },
    7: {
      type: 'multiple-choice-blank',
      text: 'By 2026, global data centers will use electricity equal to _____ the annual electricity generation of the entire United States.',
      options: ['6 times', '10 times', '17 times', '23 times'],
      correctAnswer: '6 times',
      component: MultipleChoiceBlank
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
    const currentQ = questions[currentQuestion];
    const wasPreviouslyCorrect = answers[currentQuestion] === currentQ.correctAnswer;
    const isNowCorrect = answer === currentQ.correctAnswer;

    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));

    setScore(prev => {
      // If it was correct before and still correct -> no change
      if (wasPreviouslyCorrect && isNowCorrect) return prev;
      // If it was correct before but now wrong -> subtract 1
      if (wasPreviouslyCorrect && !isNowCorrect) return prev - 1;
      // If it was wrong before and now correct -> add 1
      if (!wasPreviouslyCorrect && isNowCorrect) return prev + 1;
      // Otherwise no change
      return prev;
    });

    if (currentQuestion < 7) {
      setCurrentQuestion(prev => prev + 1);
    } else {
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

  const handleRetake = () => {
    setCurrentPage('questions');
    setCurrentQuestion(1);
    setAnswers({});
    setScore(0);
  }

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
          {currentQuestion === 7 ? 'See Results' : 'Next Question'}
        </button>
      </div>
    );
  };

  if (currentPage === 'results') {
  const totalPoints = Object.values(answers).reduce((sum, ans) => {
    // For now: count any answer as 1 point (replace with real scoring logic later)
    return sum + (ans === 'placeholder' || ans === 'component-answer' ? 1 : 1);
  }, 0);

  // const percentageBetter = Math.floor((totalPoints / 7) * 100); // fake comparison %
  const scorePercentMap = [5, 20, 35, 50, 65, 80, 90, 99];
  const percentageBetter = scorePercentMap[score];

  return (
    <div className="results-page">
      <h1>You got {score}/7 points!</h1>
      
      <p>That's better than {percentageBetter}% of other users!!!</p>

      {/* Simple bar chart with Y axis */}
      <div className="bar-chart-container">
        {/* Y axis labels */}
        <div className="y-axis">
          {[50, 40, 30, 20, 10, 0].map((percent) => (
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
      <button className="next-btn" onClick={handleRetake}>Retake Quiz  <RiLoopLeftLine size={20} /></button>
    </div>

    {/* Link text to Google Doc */}
    <p className="results-link">
      Read more about our <a href="https://docs.google.com/document/d/1TlMySydvNZwFaaoJoEQJum9m1lcZqLHacZ5_J1k9PUI/edit?usp=sharing" target="_blank" rel="noopener noreferrer">sources</a> here.
    </p>
  </div>
    );
  }


 const currentQ = questions[currentQuestion];
  const imageOffset = -(currentQuestion - 1);
  const scaleFactor = window.innerHeight / 1080;

  // Show home page
  return (
    <div className="homepage">
      {currentPage === 'questions' && (
        <div className="back-img-container">
          <div 
            className="moving-elements-wrapper"
            style={{ transform: `translateX(calc(${imageOffset} * (1920px * ${scaleFactor}) + (100vw - 1920px * ${scaleFactor}) / 2 + 150px))` }}
          >
            <img
              className="back-img"
              src={backImg}
              alt="Decorative background"
            />
            <div 
              className="back-anim-offset-container"
              style={{ transform: 'translateX(-380px) translateY(0px)' }}
            >
              <Lottie 
                className='back-anim' 
                animationData={backAnim} 
                loop 
                autoplay 
              />
            </div>
          </div>
        </div>
      )}
      {/* LEFT COLUMN */}
      <div className="left-col">
        <div className="logo">OpenAI</div>
        <div className="left-text"> 
          <p className="tagline">Research</p>
          <p className="tagline">Safety</p>
          <p className="tagline">For People</p>
          <p className="tagline">For You</p>
          <p className="tagline">ChatGPT</p>
          <p className="tagline">Data Centers</p>
          <p className="tagline">Stories</p>
          <p className="tagline">Company</p>
          <p className="tagline">News</p>
        </div>
        
      </div>

      {/* RIGHT COLUMN */}
      <div className="right-col">
        {currentPage === 'home' && (
          <>
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
              <div className='button-group'>
                {isTyping && <TypingBubble />}
                <button 
                  className="send-btn"
                  onClick={handleSendClick}
                  disabled={!inputText.trim()}
                >
                  <FaArrowUp size={20} />
                </button>
              </div>
            </div>
          </>
        )}

        {currentPage === 'questions' && (
          <div className="questions-page">
            <div className="questions-header">
              <div className="header-left">
                <button className="back-home-btn" onClick={handleBackToHome}>
                  ← Home
                </button>
              </div>
              <div className="header-center">
                <div className="progress-indicator">
                  Question {currentQuestion} of 7
                </div>
                <div className="score-display">
                  Score: {score} / {Object.keys(answers).length}
                </div>
              </div>
              <div className="header-right">
                {currentQuestion > 1 && (
                  <button className="prev-btn" onClick={handlePrevQuestion}>
                    ← Previous
                  </button>
                )}
              </div>
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

              {currentQ.type === 'multiple-choice-blank' && currentQ.component && (
                <currentQ.component 
                  questionData={{...currentQ, isLast: currentQuestion === 7}}
                  onAnswer={handleNextQuestion}
                />
              )}

              {currentQ.type === 'placeholder' && (
                <div className="placeholder-question">
                  <h2>{currentQ.text}</h2>
                  <p>This question will be implemented later.</p>
                  <button 
                    className="next-btn"
                    onClick={() => handleNextQuestion('placeholder')}
                  >
                    {currentQuestion === 7 ? 'See Results' : 'Next Question'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
