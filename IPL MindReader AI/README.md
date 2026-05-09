# IPL MindReader AI 🏏🤖

> **An advanced AI app that identifies IPL players like Akinator**

## Project Overview

**IPL MindReader AI** is a production-ready hackathon project that combines artificial intelligence with modern web technologies. It identifies IPL cricketers in just 8 to 12 smart questions using probabilistic reasoning and adaptive decision-making.

### Key Features
- ✨ Premium UI/UX with a cyberpunk theme, gold highlights, and electric blue accents
- 🧠 Advanced AI reasoning powered by entropy-based question selection
- 🔥 Gemini AI integration for dynamic prompts and explanations
- 📊 Real-time analytics for tracking gameplay performance
- 🎮 1000+ IPL player profiles in a large generated dataset
- 🚀 Deployment-ready for Vercel and modern cloud hosts

## Tech Stack

### Frontend
- Next.js 14 - React framework
- Tailwind CSS - styling system
- Framer Motion - animations and transitions
- Firebase - real-time data and analytics support

### Backend
- Node.js + Express - REST API server
- Google Generative AI (Gemini) - AI-driven question generation
- Firebase Admin SDK - data persistence
- Custom probabilistic reasoning engine - IPL dataset analysis

### Data
- 1000+ generated IPL player profiles covering roles, teams, awards, and traits

## Getting Started

### Install Dependencies

```bash
git clone https://github.com/ABHISHEKABHI52/AI-Akinator-IPL.git
cd "AI-Akinator-IPL"
npm install

cd backend
npm install

cd ../frontend
npm install
```

### Environment Setup

Create `backend/.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
BACKEND_PORT=4001
FIREBASE_PROJECT_ID=ipl-mindreader-ai
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ipl-mindreader-ai
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
```

### Start Development Servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

The backend runs at `http://localhost:4001` and the frontend runs at `http://localhost:3000`.

## How to Play

1. Open the landing page.
2. Click **Play Now**.
3. Think of an IPL player.
4. Answer the AI's questions honestly.
5. Watch the system identify the player.

## Game Flow

```text
Landing -> Start Game -> Questions -> 8-12 Answers -> AI Guess -> Feedback
```

### Reasoning Pipeline
1. Filtering removes players that do not match the answers.
2. Confidence scoring measures how likely the leading candidate is correct.
3. Entropy-based question selection chooses the most informative next question.
4. An 80% threshold triggers a final guess when confidence is high enough.

## Dataset

### Player Profile Fields
- Name, country, and role
- IPL teams and captaincy history
- Awards such as Orange Cap and Purple Cap
- Batting style and bowling type
- Finisher, aggressive batter, and death bowler flags
- Legend or retired status

### Regenerate the Dataset

```bash
cd backend
npm run generate:dataset
```

This generates 1000 unique IPL player profiles.

## API Endpoints

### Game API

Start a game:

```http
POST /game/start
```

Answer a question:

```http
POST /game/answer
Body: { gameId, answer: "yes|no|maybe|unknown" }
```

Make a guess:

```http
POST /game/guess
Body: { gameId }
```

Check game status:

```http
GET /game/status?gameId=<gameId>
```

### Admin API

Dataset info:

```http
GET /admin/dataset/info
```

Regenerate dataset:

```http
POST /admin/dataset/generate
```

## Analytics Dashboard

Open `/analytics` to view:
- Accuracy rate
- Average number of questions
- Top guessed players
- Confidence trend chart

## Design System

### Color Palette
- Primary: Neon gold `#FFD700`
- Secondary: Electric blue `#00D4FF`
- Background: Luxury black `#0A0A0A`
- Accent: Cyberpunk purple

### Visual Style
- Glassmorphism panels
- Stadium lighting effects
- Cinematic transitions
- Fully responsive layout

## Testing

```bash
npm run dev
```

Then open `http://localhost:3000` and verify the full game flow by starting a match and answering questions.

## Production Deployment

### Vercel

```bash
vercel --prod
```

### Backend Hosting

You can deploy the Express backend to Render, Railway, or any Node.js-compatible host.

1. Connect your GitHub repository.
2. Set the build command to `npm install`.
3. Set the start command to `cd backend && npm start`.
4. Add the required environment variables.

## Project Structure

```text
IPL-Akinator-AI/
├── backend/
├── frontend/
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a branch for your feature.
3. Commit your changes.
4. Push the branch.
5. Open a pull request.

## License

This project is released under the MIT License.

## Credits

- Google Gemini API
- Firebase
- Next.js community
- IPL cricket data inspiration

## Contact

- GitHub: [@ABHISHEKABHI52](https://github.com/ABHISHEKABHI52)
- Email: abhishekabhijit.work@gmail.com

---

Made with passion for IPL cricket fans.
