# FitMind AI 🏋️‍♂️

An AI-powered gym tracker with workout logging, progress visualization, and AI coaching.

## Tech Stack
- **Frontend:** React + Vite + Recharts + TailwindCSS
- **Backend:** Node.js + Express + SQLite (better-sqlite3)
- **AI:** Anthropic Claude API

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/fitmind-ai.git
cd fitmind-ai
```

### 2. Backend
```bash
cd server
npm install
cp ../.env.example .env   # Add your API key
node server.js
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

## Features
- Log workouts with sets, reps, weight
- Track personal records (PRs)
- View progress charts
- AI Coach generates personalized workout plans
- Workout streaks
