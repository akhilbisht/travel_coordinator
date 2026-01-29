# AI Prompts and Parsing Logic (Practical, Grounded)

This document defines a safe, minimal AI flow that avoids hallucinations.
The AI is used only for intent parsing and for turning structured data
into plain language explanations. All destinations come from the dataset.

-------------------------------------------------------------------------------
1) Intent Schema (Strict Output)
-------------------------------------------------------------------------------
Return JSON in this exact schema. Missing values must be null.

{
  "origin_city": "string or null",
  "season_or_month": "string or null",
  "trip_length_days": "number or null",
  "budget_min_per_day_inr": "number or null",
  "budget_max_per_day_inr": "number or null",
  "interests": [
    "beach",
    "mountains",
    "food",
    "culture",
    "nightlife",
    "nature",
    "wildlife",
    "adventure",
    "spiritual",
    "quiet",
    "family",
    "heritage",
    "desert",
    "lakes",
    "islands",
    "city",
    "backwaters",
    "snow",
    "trekking",
    "relaxation",
    "waterfalls"
  ],
  "constraints": ["flight_only", "max_travel_time", "low_effort", "family_friendly"],
  "group_size": "number or null"
}

Notes:
- If the user provides a total budget for the entire trip,
  convert to per person per day only if group_size and trip_length_days exist.
- Keep the interests list limited to known tags (no free text).

-------------------------------------------------------------------------------
2) Intent Parsing Prompt (System)
-------------------------------------------------------------------------------
You are a strict parser. Extract travel intent into the JSON schema.
Do not invent values. Use null when unknown.
Only include interests from this list:
["beach", "mountains", "food", "culture", "nightlife", "nature", "wildlife",
"adventure", "spiritual", "quiet", "family", "heritage", "desert", "lakes",
"islands", "city", "backwaters", "snow", "trekking", "relaxation", "waterfalls"]
If the input mentions a season (winter, summer, monsoon), map it to months:
winter -> Nov-Feb, summer -> Mar-Jun, monsoon -> Jun-Sep.
Return JSON only. No prose.

User input:
<<<{user_input}>>>

-------------------------------------------------------------------------------
3) Example Intent Outputs
-------------------------------------------------------------------------------
Input:
"We want beaches in December, 4 days, budget 8k per person, from Bangalore."

Output:
{
  "origin_city": "Bangalore",
  "season_or_month": "Dec",
  "trip_length_days": 4,
  "budget_min_per_day_inr": 8000,
  "budget_max_per_day_inr": 8000,
  "interests": ["beach"],
  "constraints": [],
  "group_size": null
}

Input:
"Family trip in winter, 3 days, total 30k for 5 people from Delhi."

Output:
{
  "origin_city": "Delhi",
  "season_or_month": "Nov-Feb",
  "trip_length_days": 3,
  "budget_min_per_day_inr": 2000,
  "budget_max_per_day_inr": 2000,
  "interests": ["family"],
  "constraints": [],
  "group_size": 5
}

Calculation:
30000 / 5 / 3 = 2000 per person per day

-------------------------------------------------------------------------------
4) Clarifying Questions Logic
-------------------------------------------------------------------------------
Ask only what is missing for ranking:
- If season_or_month is null -> ask travel month
- If budget range is null -> ask budget per person per day
- If trip_length_days is null -> ask trip length
- If interests list is empty -> ask interests

Avoid more than 2 follow-up questions at once.

-------------------------------------------------------------------------------
5) Scoring Logic (Deterministic)
-------------------------------------------------------------------------------
Inputs:
- Parsed intent
- Destination row from dataset

Score components (0-5 each):
- interest_match: tag overlap count (max 5)
- season_fit: 5 if month in best_months else 2
- budget_fit: 5 if range overlaps, else 1
- trip_length_fit: 5 if within 1 day of avg_trip_days else 2

Total score = interest_match + season_fit + budget_fit + trip_length_fit
Sort by score desc and return top 3.

-------------------------------------------------------------------------------
6) Explanation Prompt (Grounded)
-------------------------------------------------------------------------------
You are a helpful travel assistant. Use only the facts provided.
Do not invent hotels, prices, or events. Use simple language.
Write 3 short reasons and one caution (do nots).

Destination data:
{destination_row}

User intent:
{intent_json}

Output format:
- Why it fits: ...
- Best window: ...
- Estimated budget range: ...
- Do not: ...

-------------------------------------------------------------------------------
7) Safety and Consistency Rules
-------------------------------------------------------------------------------
- Never suggest destinations outside the dataset.
- If intent is too vague, ask clarifying questions instead of guessing.
- Keep outputs short; avoid long itineraries in V1.

-------------------------------------------------------------------------------
8) Fallback Rules
-------------------------------------------------------------------------------
If scoring yields fewer than 3 good matches:
- Relax budget_fit by one level
- Offer 2 matches and ask if budget can be adjusted

If user wants a destination not in dataset:
- Respond: "I do not have data for that yet. Here are 3 similar options."

-------------------------------------------------------------------------------
9) Test Cases (Quick Checks)
-------------------------------------------------------------------------------
1) Input: "Snow trip in Jan from Delhi, 4 days, 6k per day"
   Expect: Auli, Manali, Shimla (winter months)

2) Input: "Beaches in Feb from Mumbai, 3 days, 4k per day"
   Expect: Alibaug, Tarkarli, Goa (budget-fit coastal)

3) Input: "Wildlife weekend in March, 2 days"
   Expect: Ranthambore, Gir, Corbett (wildlife tag)
