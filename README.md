# Peer Scheduler

A clean, responsive Vue.js app for finding and scheduling practice sessions with peers. Built to be pixel-perfect and production-ready.

## What it does

- Browse available peers for practice sessions
- Filter by availability days (Monday, Tuesday, etc.)
- View peer profiles with experience, availability, and contact info
- Responsive design that works on all devices

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will open at `http://localhost:8080`

## Features

### Smart Filtering
- Filter peers by days they're available
- Multi-select support (show peers available on ANY selected day)
- Real-time filtering as you select/deselect days

### Peer Profiles
- Profile photos with initials fallback
- Availability schedule with day abbreviations
- Experience level and session history
- Target companies and location
- One-click booking


## Project Structure

```
src/
├── components/
│   └── PeerCard.vue          # Peer profile card
├── services/
│   └── peerService.js        # API calls
├── utils/
│   └── dateUtils.js          # Date/availability logic
├── constants/
│   └── api.js                # API endpoints
└── App.vue                   # Main app
```

## How it works

The app fetches peer data from a live API and displays it in a clean, filterable interface. The availability filtering is smart - it calculates actual hours available per day, so if someone is available Monday 11 PM to Tuesday 3 AM, they show up for both Monday and Tuesday filters.

## Built with

- **Vue 3** - Modern reactive framework
- **Vite** - Fast build tool
- **Bootstrap 5** - Responsive styling
- **Node.js 22** - Runtime environment

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
