# Travel Coordinator Project

This branch contains the analysis and project setup for the **TripSquad - Group Travel Coordinator** app.

## Project Overview

A mobile-first app that helps friend groups plan trips together — vote on dates, set budgets, browse hotels collectively, and split payments seamlessly.

**Problem**: Planning a group trip with 5-10 friends is a nightmare of 200+ WhatsApp messages.

**Solution**: A dedicated app where groups can collaboratively plan trips in minutes, not weeks.

## Contents

### 1. Initial Analysis: Travel Social Platform

Before arriving at TripSquad, we analyzed a broader idea of "Social media for travelers + reverse hotel booking."

**Location**: `ideas/travel-social-platform/`

| Document | Description |
|----------|-------------|
| [README](ideas/travel-social-platform/README.md) | Overview and verdict |
| [Market Research](ideas/travel-social-platform/docs/MARKET_RESEARCH.md) | Indian travel market landscape |
| [SWOT Analysis](ideas/travel-social-platform/docs/SWOT_ANALYSIS.md) | Detailed strengths/weaknesses |
| [Full Analysis](ideas/travel-social-platform/docs/FULL_ANALYSIS.md) | Complete viability assessment |
| [Pivot Options](ideas/travel-social-platform/docs/PIVOT_OPTIONS.md) | Alternative directions |
| [Pivot Comparison](ideas/travel-social-platform/docs/PIVOT_COMPARISON.md) | Budget-constrained analysis |

**Verdict**: 3.5/10 viability — Don't build as described. Pivot recommended.

### 2. Final Project: TripSquad (Group Travel Coordinator)

The chosen pivot with 6.5/10 viability.

**Location**: `ideas/travel_coordinator/`

| Document | Description |
|----------|-------------|
| [README](ideas/travel_coordinator/README.md) | Full business case |
| [Features](ideas/travel_coordinator/docs/FEATURES.md) | User stories & screen specs |
| [Roadmap](ideas/travel_coordinator/docs/ROADMAP.md) | Week-by-week development plan |
| [Architecture](ideas/travel_coordinator/docs/TECHNICAL_ARCHITECTURE.md) | System design & database |

**Tech Stack**:
- Mobile: React Native + Expo
- Backend: Node.js + Fastify + Prisma
- Database: PostgreSQL + Redis

**Business Model**:
- Affiliate commission on hotel bookings (5-8%)
- Premium features (₹99/trip)

## Quick Links

- [Start Building → Roadmap](ideas/travel_coordinator/docs/ROADMAP.md)
- [Feature Specs](ideas/travel_coordinator/docs/FEATURES.md)
- [Why We Pivoted](ideas/travel-social-platform/docs/PIVOT_OPTIONS.md)

## Budget Requirement

| Phase | Timeline | Cost |
|-------|----------|------|
| MVP | Week 1-8 | ₹1-1.5L |
| Booking Integration | Week 9-16 | ₹1-2L |
| Growth | Week 17-24 | ₹2-3L |
| **Total** | 6 months | **₹5-6L** |

With ₹5-10L budget, you have comfortable runway for 9-12 months.
