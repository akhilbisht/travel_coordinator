# TripSquad - Group Travel Coordinator

> "Plan group trips without WhatsApp chaos"

## Overview

A mobile-first app that helps friend groups plan trips together — vote on dates, set budgets, browse hotels collectively, and split payments seamlessly.

**Problem**: Planning a group trip with 5-10 friends is a nightmare of 200+ WhatsApp messages, conflicting schedules, and one frustrated person who ends up booking everything and chasing payments for months.

**Solution**: A dedicated app where groups can collaboratively plan trips in minutes, not weeks.

## The Problem We Solve

```
THE GROUP TRIP NIGHTMARE (Current Reality)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Day 1:   "Let's plan Goa!" (WhatsApp group)
Day 2-5: 200 messages about dates
Day 6:   "When are you free?" × 8 people
Day 7:   Someone shares Google Form for dates
Day 8:   3 people fill it, 5 forget
Day 10:  "What's everyone's budget?"
Day 12:  Awkward silence about money
Day 15:  One person searches hotels
Day 16:  Shares 5 links, no one responds
Day 18:  "This one?" "Too expensive" "Bad reviews"
Day 20:  Decision paralysis
Day 25:  "Let's do it next month"
Day 30:  Trip doesn't happen

OR

One frustrated person books everything, pays ₹50,000,
then chases 7 friends for ₹6,000 each for 3 months.
```

## The Solution

```
TRIPSQUAD EXPERIENCE (2-minute planning)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. CREATE TRIP
   → "Goa Trip - Dec 2026"
   → Share invite link to WhatsApp group

2. EVERYONE JOINS
   → Friends tap link, join trip
   → No app download needed (PWA option)

3. VOTE ON DATES
   → Each person marks available dates
   → App shows best overlap
   → "6/8 people free Dec 20-23"

4. SET BUDGETS
   → Everyone enters their budget
   → App shows: "Sweet spot: ₹3,500-4,500/night"

5. BROWSE TOGETHER
   → See hotels in budget + dates
   → Everyone swipes ❤️ or ✗
   → "5/8 people liked Resort Paradise"

6. VOTE & BOOK
   → Final vote on top 3 options
   → Winner gets booked
   → Payment split automatically

7. SHARED ITINERARY
   → Everyone sees the plan
   → Add activities, restaurants
   → Real-time updates
```

## Why This Wins

| Factor | Reason |
|--------|--------|
| **Universal pain** | Everyone who's planned a group trip knows the chaos |
| **Viral by design** | 1 user invites 7 friends = free growth |
| **No inventory needed** | Affiliate bookings via MakeMyTrip/Booking.com |
| **Clear monetization** | 5-8% commission on bookings |
| **Low capital** | ₹1-2L to launch, ₹5-10L runway |

## Target Users

### Primary: Urban Friend Groups (22-35 years)

```
PROFILE:
━━━━━━━

• College friends planning reunion trips
• Office colleagues planning team outings
• Couples planning with other couples
• Family groups (cousins, siblings)

BEHAVIOR:
━━━━━━━━

• Plan 2-4 group trips per year
• Budget: ₹3,000-10,000/night/room
• Destinations: Goa, Himachal, Rajasthan, Kerala
• Currently: WhatsApp chaos, one person does all work
```

### Secondary: Trip Organizers

```
PROFILE:
━━━━━━━

• The "planner friend" in every group
• Often books and chases payments
• Would LOVE a tool to make this easier

SUPERPOWER:
━━━━━━━━━━

• They'll be our power users
• They'll invite their groups
• They'll spread the word
```

## Business Model

### Revenue Streams

| Stream | How It Works | Revenue |
|--------|--------------|---------|
| **Affiliate Commission** | Earn 5-8% on hotel bookings via MakeMyTrip/Booking.com | Primary |
| **Premium Features** | ₹99/trip for advanced splitting, itinerary export | Secondary |
| **Activity Bookings** | Commission on experiences, tours, transport | Future |

### Unit Economics

```
TYPICAL GROUP TRIP:
━━━━━━━━━━━━━━━━━━

Group size: 8 people (4 rooms)
Duration: 3 nights
Room rate: ₹4,000/night
Total booking: ₹48,000

Our commission (5%): ₹2,400

Premium features (2 groups/10 buy): ₹99 × 2 = ₹198

REVENUE PER SUCCESSFUL TRIP: ~₹2,500
```

### Growth Projections

| Month | Groups | Bookings | Revenue |
|-------|--------|----------|---------|
| 3 | 100 | 10 | ₹25K |
| 6 | 500 | 50 | ₹1.25L |
| 9 | 1,500 | 150 | ₹3.75L |
| 12 | 4,000 | 400 | ₹10L |

## Tech Stack

### Mobile App (Primary)
- **Framework**: React Native + Expo
- **State**: Redux Toolkit + RTK Query
- **UI**: React Native Paper
- **Real-time**: Socket.io

### Web App (PWA)
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **PWA**: next-pwa

### Backend
- **Runtime**: Node.js + Fastify
- **Database**: PostgreSQL + Prisma
- **Cache**: Redis
- **Real-time**: Socket.io

### Integrations
- **Hotels**: MakeMyTrip Affiliate API, Booking.com Affiliate
- **Payments**: Razorpay (for split payments)
- **Auth**: Phone OTP (MSG91)
- **Notifications**: Firebase Cloud Messaging

## Project Structure

```
travel_coordinator/
├── mobile/                 # React Native app
│   └── src/
│       ├── screens/        # App screens
│       ├── components/     # Reusable components
│       ├── services/       # API services
│       ├── store/          # Redux store
│       └── navigation/     # Navigation setup
├── web/                    # Next.js PWA
│   └── src/
│       ├── pages/          # Routes
│       ├── components/     # UI components
│       └── styles/         # Tailwind styles
├── backend/                # Node.js API
│   └── src/
│       ├── routes/         # API endpoints
│       ├── services/       # Business logic
│       ├── models/         # Prisma models
│       └── config/         # Configuration
└── docs/                   # Documentation
    ├── FEATURES.md
    ├── TECHNICAL_ARCHITECTURE.md
    └── ROADMAP.md
```

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- Redis
- Expo CLI (for mobile)

### Installation

```bash
# Clone repository
git clone https://github.com/akhilbisht/travel_coordinator.git
cd travel_coordinator

# Install backend dependencies
cd backend && npm install

# Install mobile dependencies
cd ../mobile && npm install

# Install web dependencies
cd ../web && npm install

# Set up environment variables
cp backend/.env.example backend/.env
# Edit .env with your credentials

# Run database migrations
cd backend && npm run db:migrate

# Start development servers
npm run dev          # Backend (port 3000)
cd ../mobile && npm start   # Mobile (Expo)
cd ../web && npm run dev    # Web (port 3001)
```

## Documentation

- [Features & User Stories](docs/FEATURES.md)
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md)
- [Development Roadmap](docs/ROADMAP.md)
- [API Documentation](docs/API.md)

## Roadmap

### Phase 1: MVP (Week 1-8)
- [ ] Trip creation & invite system
- [ ] Date voting
- [ ] Budget setting
- [ ] Hotel browsing (basic)
- [ ] Group voting

### Phase 2: Booking (Week 9-16)
- [ ] Affiliate integration (MakeMyTrip)
- [ ] Booking flow
- [ ] Payment collection
- [ ] First revenue

### Phase 3: Growth (Week 17-24)
- [ ] Split payments (Razorpay)
- [ ] Shared itinerary
- [ ] Activity bookings
- [ ] Premium features

## Contributing

This is currently a solo project. Contributions welcome once MVP is stable.

## License

Proprietary - All rights reserved

---

*Built for every frustrated trip planner who's tired of WhatsApp chaos.*
