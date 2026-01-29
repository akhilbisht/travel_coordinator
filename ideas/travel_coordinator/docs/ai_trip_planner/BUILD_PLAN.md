# Solo Build Plan (Using Copilot or GPT)

Objective:
Build a minimal, WhatsApp-like AI trip decision page that produces
three destination options and lets a group vote and share.

This plan assumes you are a solo founder using AI tools to write code.

-------------------------------------------------------------------------------
1) STACK CHOICE (Keep it minimal)
-------------------------------------------------------------------------------
Recommended V1 stack for a solo builder:
- Frontend: Next.js (App Router) + Tailwind CSS
- Backend: Next.js API routes (single repo)
- Database: Supabase (Postgres + Auth)
- Hosting: Vercel (frontend + API routes)
- AI: OpenAI or similar (intent parsing and response generation)

Why:
- One codebase for UI + API
- Supabase handles auth + data quickly
- Vercel deploys in minutes

Alternative:
- Use Firebase (Auth + Firestore) if you prefer Google stack.

-------------------------------------------------------------------------------
2) DATASET FIRST (No AI without data)
-------------------------------------------------------------------------------
Create a small curated dataset of 50-100 Indian destinations.
Use the provided CSV in datasets/ as your starting point.

Fields you need:
- name, state, region
- best_months
- tags (beach, mountain, culture, etc)
- budget range per person per day
- avg trip days
- short highlights, dos, donts

Reason:
This prevents hallucinations and makes the AI reliable.

-------------------------------------------------------------------------------
3) MVP FEATURES (Only these)
-------------------------------------------------------------------------------
1) Chat-like input (natural language)
2) Clarifying questions (season, budget, length, interests)
3) Top 3 suggestions with explanations
4) One-tap voting (group)
5) Shareable summary (WhatsApp)

Not in V1:
- Live hotel inventory
- Payment collection
- Full itinerary builder

-------------------------------------------------------------------------------
4) BUILD STEPS (Week-by-Week)
-------------------------------------------------------------------------------

WEEK 1: Foundation
- Initialize Next.js app with Tailwind
- Create single-page layout (see WIREFRAME.md)
- Build dataset loader (read CSV into memory or DB)
- Add simple scoring function for destinations

WEEK 2: AI Layer + Suggestions
- Implement intent parsing:
  - Use LLM to convert input to structured fields:
    { interests, season, budget, origin, trip_length }
- Map the structured fields to the dataset
- Score and rank top 3 destinations
- Generate response explanation text

WEEK 3: Group Features
- Add Supabase auth (phone OTP)
- Add trips table + members table
- Add voting table
- Show group progress and finalize
- Add shareable summary (WhatsApp share link)

WEEK 4: Polish + Beta
- Add loading and error states
- Tune prompts for clarity
- Test with 5-10 real groups
- Measure time to decision

-------------------------------------------------------------------------------
5) DATABASE TABLES (Minimal)
-------------------------------------------------------------------------------
users
  id, phone, name

trips
  id, title, origin, season, budget_min, budget_max, trip_length

trip_members
  id, trip_id, user_id, role

suggestions
  id, trip_id, destination_id, rank, explanation

votes
  id, trip_id, user_id, destination_id, vote

-------------------------------------------------------------------------------
6) CORE SCORING FUNCTION (Simple + Deterministic)
-------------------------------------------------------------------------------
score = interest_match + season_fit + budget_fit + travel_time_fit

Each term should be 0-5 based on data:
- interest_match: overlap of tags
- season_fit: requested month in best_months
- budget_fit: range overlap
- travel_time_fit: optional if you store origin access

This keeps results predictable and avoids AI hallucinations.

-------------------------------------------------------------------------------
7) PROMPT STRATEGY (AI Use)
-------------------------------------------------------------------------------
Use the LLM only for:
- parsing intent into structured fields
- generating short explanations based on fixed data

Never allow the LLM to invent destinations or facts.
Always ground the response in your dataset.

-------------------------------------------------------------------------------
8) COPILOT WORKFLOW (Solo Dev)
-------------------------------------------------------------------------------
Use Copilot for:
- generating UI components
- wiring forms and state
- writing SQL migrations

Use GPT for:
- designing the scoring logic
- refining prompts
- generating seed data

-------------------------------------------------------------------------------
9) VALIDATION CHECKLIST (Before Launch)
-------------------------------------------------------------------------------
- Does the user get 3 options in < 30 seconds?
- Can a group vote and decide in < 48 hours?
- Is the summary shareable and clear?
- Does the user understand why each option is recommended?

-------------------------------------------------------------------------------
10) NEXT STEP AFTER MVP
-------------------------------------------------------------------------------
If the decision loop works:
- Add hotel shortlist and budget breakdown
- Integrate affiliate booking links
- Add payment split tracking

-------------------------------------------------------------------------------
Summary:
Your winning product is not a complex app. It is a fast, minimal decision engine.
Keep it one page, make it instant, and make it shareable.
