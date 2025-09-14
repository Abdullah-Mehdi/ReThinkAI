# ReThinkAI - Educational AI Environment Quiz

## Overview
ReThinkAI is an interactive educational React application that raises awareness about AI's environmental impact through an engaging quiz experience. Users learn about the hidden costs of AI systems including energy consumption, water usage, and resource extraction through interactive questions and components.

## Project Architecture
- **Frontend**: React 19 + Vite development server
- **UI Library**: Lottie React for animations, React Icons
- **Styling**: Custom CSS with responsive design
- **Build Tool**: Vite 7.1 for fast development and optimized builds

## Current State
✅ **Successfully imported and configured for Replit environment**
- Node.js 20 environment set up
- All dependencies installed (React, Vite, Lottie, React Router)
- Vite configured for Replit proxy system (host: 0.0.0.0, port: 5000)
- Development workflow configured and running
- Production deployment settings configured (autoscale with serve)

## Recent Changes (Sept 14, 2025)
- Configured Vite server for Replit environment (removed invalid allowedHosts option)
- Updated port from 8000 to 5000 for Replit compatibility
- Removed Docker/backend proxy configuration (frontend-only app)
- Added serve package for production deployment
- Set up autoscale deployment configuration

## Key Features
- Interactive quiz with 7 questions about AI environmental impact
- Multiple question types: sliders, multiple choice, fill-in-the-blank
- Custom components: WaterBottleSlider, MultipleChoiceBlank, TypingBubble
- Lottie animations for enhanced user experience
- Educational content about sustainable AI practices
- Results page with performance comparison and additional resources

## Development Commands
- `cd frontend && npm run dev` - Start development server (port 5000)
- `cd frontend && npm run build` - Build for production
- `cd frontend && npm run lint` - Run ESLint

## File Structure
```
frontend/
├── src/
│   ├── components/     # React components (WaterBottle, Quiz components)
│   ├── styles/        # CSS files
│   ├── assets/        # Images, animations (Lottie JSON)
│   ├── App.jsx        # Main application component
│   └── main.jsx       # React entry point
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Deployment
- **Development**: Runs via workflow on port 5000
- **Production**: Autoscale deployment with Vite build + serve
- **Build**: `npm run build` creates optimized bundle in `dist/`
- **Serve**: Uses `serve` package to host static files

## User Preferences
- No specific user preferences documented yet
- Standard React/Vite development workflow
- Maintains original educational content and quiz structure

## Notes
- This is a frontend-only application (no backend required)
- Quiz data and content are embedded in the React components
- All animations and assets are included in the repository
- Built for educational awareness about AI environmental impact