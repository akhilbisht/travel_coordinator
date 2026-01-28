# Features & User Stories

## Core Features

### 1. Trip Creation & Invites

#### User Stories

```
AS A trip organizer
I WANT TO create a new trip with basic details
SO THAT I can start planning with my friends

AS A trip organizer
I WANT TO share an invite link via WhatsApp
SO THAT friends can easily join without downloading an app first

AS A friend
I WANT TO join a trip via a simple link
SO THAT I don't have to go through complex signup
```

#### Feature Specs

| Feature | Description | Priority |
|---------|-------------|----------|
| Create Trip | Name, destination (optional), tentative dates | P0 |
| Invite Link | Shareable URL that opens web/app | P0 |
| WhatsApp Share | Pre-filled WhatsApp message with link | P0 |
| QR Code | For in-person invites | P1 |
| Trip Dashboard | Overview of trip status | P0 |

#### Screens

```
CREATE TRIP SCREEN:
━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Create New Trip            │
├─────────────────────────────┤
│                             │
│  Trip Name                  │
│  ┌───────────────────────┐  │
│  │ Goa Trip 2026         │  │
│  └───────────────────────┘  │
│                             │
│  Destination (optional)     │
│  ┌───────────────────────┐  │
│  │ 🔍 Search destination │  │
│  └───────────────────────┘  │
│                             │
│  Tentative Dates            │
│  ┌───────────────────────┐  │
│  │ Dec 2026              │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │    Create Trip  →     │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘


INVITE SCREEN:
━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Invite Friends             │
├─────────────────────────────┤
│                             │
│  Share this link:           │
│  ┌───────────────────────┐  │
│  │ tripsquad.app/j/abc123│  │
│  └───────────────────────┘  │
│       [Copy]  [QR Code]     │
│                             │
│  ┌───────────────────────┐  │
│  │ 📱 Share on WhatsApp  │  │
│  └───────────────────────┘  │
│                             │
│  Or invite by phone:        │
│  ┌───────────────────────┐  │
│  │ +91 98765 43210       │  │
│  └───────────────────────┘  │
│  [Add Another] [Send Invites]│
│                             │
└─────────────────────────────┘
```

---

### 2. Date Voting

#### User Stories

```
AS A trip member
I WANT TO mark which dates I'm available
SO THAT the group can find overlapping dates

AS A trip organizer
I WANT TO see which dates work for most people
SO THAT I can finalize the trip dates

AS A trip member
I WANT TO see who's available on which dates
SO THAT I know if key people can make it
```

#### Feature Specs

| Feature | Description | Priority |
|---------|-------------|----------|
| Date Range Selection | Organizer sets possible date range | P0 |
| Availability Marking | Members mark available dates | P0 |
| Overlap Visualization | Show dates that work for most | P0 |
| Best Dates Suggestion | AI suggests optimal dates | P1 |
| Date Finalization | Lock in final dates | P0 |

#### Screens

```
DATE VOTING SCREEN:
━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  When can you go?           │
├─────────────────────────────┤
│                             │
│  December 2026              │
│  ┌─────────────────────────┐│
│  │ Mo Tu We Th Fr Sa Su    ││
│  │                    1    ││
│  │  2  3  4  5  6  7  8    ││
│  │  9 10 11 12 13 14 15    ││
│  │ 16 17 18 19[20]21[22]   ││
│  │[23]24 25 26 27 28 29    ││
│  │ 30 31                   ││
│  └─────────────────────────┘│
│  [Selected dates highlighted]│
│                             │
│  Tap dates you're free      │
│                             │
│  ┌───────────────────────┐  │
│  │   Save My Dates  ✓    │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘


DATE RESULTS SCREEN:
━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Best Dates                 │
├─────────────────────────────┤
│                             │
│  🏆 Dec 20-23 (Fri-Mon)     │
│     6/8 people free         │
│     ████████████░░ 75%      │
│                             │
│  🥈 Dec 22-25 (Sun-Wed)     │
│     5/8 people free         │
│     ██████████░░░░ 62%      │
│                             │
│  🥉 Dec 27-30 (Thu-Sun)     │
│     4/8 people free         │
│     ████████░░░░░░ 50%      │
│                             │
│  Who's free when:           │
│  ┌─────────────────────────┐│
│  │ Dec 20-23:              ││
│  │ ✓ Rahul  ✓ Priya       ││
│  │ ✓ Amit   ✓ Neha        ││
│  │ ✓ Rohan  ✓ Sneha       ││
│  │ ✗ Karan  ✗ Anjali      ││
│  └─────────────────────────┘│
│                             │
│  [Finalize Dec 20-23]       │
│                             │
└─────────────────────────────┘
```

---

### 3. Budget Setting

#### User Stories

```
AS A trip member
I WANT TO set my budget privately
SO THAT I don't feel awkward sharing with the group

AS A trip organizer
I WANT TO see the budget overlap
SO THAT I can find hotels that work for everyone

AS A trip member
I WANT TO see the group's budget range (anonymized)
SO THAT I know what to expect
```

#### Feature Specs

| Feature | Description | Priority |
|---------|-------------|----------|
| Private Budget Entry | Each person enters their range | P0 |
| Anonymous Aggregation | Show range without names | P0 |
| Budget Overlap | Visual of where budgets align | P0 |
| Budget Suggestions | Based on destination | P1 |

#### Screens

```
BUDGET ENTRY SCREEN:
━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  What's your budget?        │
├─────────────────────────────┤
│                             │
│  Per night (your share)     │
│                             │
│  Minimum                    │
│  ┌───────────────────────┐  │
│  │ ₹ 2,000               │  │
│  └───────────────────────┘  │
│                             │
│  Maximum                    │
│  ┌───────────────────────┐  │
│  │ ₹ 4,000               │  │
│  └───────────────────────┘  │
│                             │
│  🔒 Only you can see this   │
│  Group sees anonymous range │
│                             │
│  ┌───────────────────────┐  │
│  │   Save Budget  ✓      │  │
│  └───────────────────────┘  │
│                             │
└─────────────────────────────┘


BUDGET RESULTS SCREEN:
━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Group Budget               │
├─────────────────────────────┤
│                             │
│  6/8 people have set budget │
│                             │
│  Sweet Spot:                │
│  ┌───────────────────────┐  │
│  │    ₹3,000 - ₹4,500    │  │
│  │    per night/person   │  │
│  └───────────────────────┘  │
│  5 people comfortable here  │
│                             │
│  Budget Distribution:       │
│                             │
│  ₹1K   ₹2K   ₹3K   ₹4K   ₹5K│
│   ░░░░░████████████░░░░░░  │
│        ▲ sweet spot ▲       │
│                             │
│  [Browse Hotels in Budget]  │
│                             │
└─────────────────────────────┘
```

---

### 4. Hotel Browsing & Voting

#### User Stories

```
AS A trip member
I WANT TO browse hotels that fit our dates and budget
SO THAT I can find options I like

AS A trip member
I WANT TO vote on hotels (like/dislike)
SO THAT the group can see popular choices

AS A trip organizer
I WANT TO see which hotels everyone likes
SO THAT I can book the most popular option
```

#### Feature Specs

| Feature | Description | Priority |
|---------|-------------|----------|
| Hotel Search | Based on dates, budget, destination | P0 |
| Swipe Voting | Tinder-style like/dislike | P0 |
| Match Display | Show hotels everyone likes | P0 |
| Hotel Details | Photos, amenities, reviews | P0 |
| Comparison View | Side-by-side top options | P1 |

#### Screens

```
HOTEL SWIPE SCREEN:
━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Hotels for Dec 20-23       │
│  Budget: ₹3,000-4,500/night │
├─────────────────────────────┤
│                             │
│  ┌───────────────────────┐  │
│  │                       │  │
│  │    [Hotel Photo]      │  │
│  │                       │  │
│  │───────────────────────│  │
│  │ Beach Paradise Resort │  │
│  │ ⭐ 4.2 (342 reviews)  │  │
│  │ ₹3,800/night          │  │
│  │                       │  │
│  │ 🏊 Pool  🏖️ Beach     │  │
│  │ 🍳 Breakfast  📶 WiFi │  │
│  │                       │  │
│  └───────────────────────┘  │
│                             │
│    ✗          ℹ️          ❤️  │
│  [Dislike]  [Details]  [Like]│
│                             │
│  ← Swipe left    Swipe right→│
│                             │
└─────────────────────────────┘


HOTEL MATCHES SCREEN:
━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Group Favorites            │
├─────────────────────────────┤
│                             │
│  🏆 Beach Paradise Resort   │
│     6/8 people liked        │
│     ₹3,800/night            │
│     ████████████░░ 75%      │
│     [View] [Book This]      │
│                             │
│  🥈 Sunset Bay Hotel        │
│     5/8 people liked        │
│     ₹4,200/night            │
│     ██████████░░░░ 62%      │
│     [View]                  │
│                             │
│  🥉 Palm Grove Resort       │
│     4/8 people liked        │
│     ₹3,500/night            │
│     ████████░░░░░░ 50%      │
│     [View]                  │
│                             │
│  Waiting for:               │
│  Karan, Anjali to vote      │
│  [Remind Them]              │
│                             │
└─────────────────────────────┘
```

---

### 5. Booking & Payments

#### User Stories

```
AS A trip organizer
I WANT TO book the chosen hotel
SO THAT the trip is confirmed

AS A trip member
I WANT TO pay my share easily
SO THAT one person doesn't have to front the money

AS A trip organizer
I WANT TO track who has paid
SO THAT I don't have to chase people manually
```

#### Feature Specs

| Feature | Description | Priority |
|---------|-------------|----------|
| Book via Affiliate | Redirect to MakeMyTrip/Booking.com | P0 |
| Payment Split | Calculate each person's share | P0 |
| Payment Collection | Razorpay payment links | P1 |
| Payment Tracking | Who paid, who owes | P1 |
| Reminders | Auto-remind non-payers | P2 |

#### Screens

```
BOOKING SCREEN:
━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Book Beach Paradise Resort │
├─────────────────────────────┤
│                             │
│  Dec 20-23, 2026 (3 nights) │
│  4 rooms × ₹3,800/night     │
│                             │
│  Total: ₹45,600             │
│  Per person: ₹5,700         │
│                             │
│  ┌───────────────────────┐  │
│  │  Book on MakeMyTrip → │  │
│  └───────────────────────┘  │
│                             │
│  After booking, return here │
│  to set up payment split    │
│                             │
└─────────────────────────────┘


PAYMENT SPLIT SCREEN:
━━━━━━━━━━━━━━━━━━━━

┌─────────────────────────────┐
│  Payment Split              │
├─────────────────────────────┤
│                             │
│  Total: ₹45,600             │
│  Per person: ₹5,700         │
│                             │
│  Payment Status:            │
│  ┌─────────────────────────┐│
│  │ ✓ Rahul      ₹5,700 Paid││
│  │ ✓ Priya      ₹5,700 Paid││
│  │ ⏳ Amit      ₹5,700 Due ││
│  │ ⏳ Neha      ₹5,700 Due ││
│  │ ✓ Rohan     ₹5,700 Paid││
│  │ ⏳ Sneha     ₹5,700 Due ││
│  │ ✓ Karan     ₹5,700 Paid││
│  │ ⏳ Anjali    ₹5,700 Due ││
│  └─────────────────────────┘│
│                             │
│  Collected: ₹22,800 (50%)   │
│  Remaining: ₹22,800         │
│                             │
│  [Send Payment Reminders]   │
│                             │
└─────────────────────────────┘
```

---

### 6. Shared Itinerary

#### User Stories

```
AS A trip member
I WANT TO see the trip itinerary
SO THAT I know the plan

AS A trip member
I WANT TO suggest activities
SO THAT I can contribute to planning

AS A trip organizer
I WANT TO add activities, restaurants, etc.
SO THAT everyone knows the full plan
```

#### Feature Specs

| Feature | Description | Priority |
|---------|-------------|----------|
| Day-by-Day View | Timeline of the trip | P1 |
| Add Activities | Restaurants, sightseeing, etc. | P1 |
| Voting on Activities | Group decides together | P2 |
| Map View | See all locations | P2 |
| Export | PDF/Calendar export | P2 |

---

## Feature Priority Matrix

| Feature | Impact | Effort | Priority | Phase |
|---------|--------|--------|----------|-------|
| Trip Creation | High | Low | P0 | MVP |
| Invite System | High | Low | P0 | MVP |
| Date Voting | High | Medium | P0 | MVP |
| Budget Setting | High | Low | P0 | MVP |
| Hotel Browsing | High | Medium | P0 | MVP |
| Hotel Voting | High | Medium | P0 | MVP |
| Affiliate Booking | High | Medium | P0 | Booking |
| Payment Split UI | Medium | Low | P1 | Booking |
| Payment Collection | Medium | High | P1 | Growth |
| Shared Itinerary | Medium | Medium | P1 | Growth |
| Activity Booking | Medium | Medium | P2 | Growth |
| Premium Features | Low | Low | P2 | Growth |

---

## MVP Feature Set (Week 1-8)

### Must Have (P0)

1. ✅ User authentication (phone OTP)
2. ✅ Create trip
3. ✅ Invite via link
4. ✅ Join trip
5. ✅ Date voting
6. ✅ Date results & finalization
7. ✅ Budget entry
8. ✅ Budget aggregation
9. ✅ Hotel search (API integration)
10. ✅ Hotel swipe voting
11. ✅ Vote results
12. ✅ Trip dashboard

### Nice to Have (P1)

1. Push notifications
2. WhatsApp deep linking
3. Basic analytics

### Not in MVP

1. Payment collection
2. Itinerary builder
3. Activity booking
4. Premium features
