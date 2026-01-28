# Development Roadmap

## Overview

| Phase | Timeline | Goal | Revenue |
|-------|----------|------|---------|
| **MVP** | Week 1-8 | Core planning features | ₹0 |
| **Booking** | Week 9-16 | Affiliate integration, first revenue | ₹25K-50K/mo |
| **Growth** | Week 17-24 | Payments, itinerary, scale | ₹1-3L/mo |

---

## Phase 1: MVP (Week 1-8)

### Week 1-2: Foundation

```
BACKEND:
━━━━━━━━
□ Project setup (Fastify, Prisma, TypeScript)
□ Database schema (User, Trip, TripMember)
□ Auth endpoints (OTP send/verify, JWT)
□ Basic trip CRUD

MOBILE:
━━━━━━━
□ Project setup (Expo, React Navigation)
□ Auth screens (Phone input, OTP verify)
□ Redux store setup
□ API service layer

DELIVERABLE: User can sign up, create trip
```

### Week 3-4: Invite & Join

```
BACKEND:
━━━━━━━━
□ Invite code generation
□ Join trip endpoint
□ Trip members list
□ Real-time setup (Socket.io)

MOBILE:
━━━━━━━
□ Create trip screen
□ Invite screen (link, WhatsApp share)
□ Join trip flow (via deep link)
□ Trip dashboard (members list)

WEB:
━━━━
□ Join trip landing page (for non-app users)
□ Basic trip view (PWA)

DELIVERABLE: User can create trip, invite friends, friends can join
```

### Week 5-6: Date & Budget Voting

```
BACKEND:
━━━━━━━━
□ Date voting endpoints
□ Date aggregation logic
□ Budget entry endpoints
□ Budget aggregation (anonymous)
□ Real-time vote updates

MOBILE:
━━━━━━━
□ Date voting screen (calendar)
□ Date results screen (best dates)
□ Budget entry screen
□ Budget results screen (sweet spot)
□ Finalize dates flow

DELIVERABLE: Group can vote on dates, set budgets, see results
```

### Week 7-8: Hotel Voting

```
BACKEND:
━━━━━━━━
□ Hotel search integration (mock data first)
□ Hotel caching (Redis)
□ Vote endpoints (like/dislike)
□ Vote aggregation (top hotels)

MOBILE:
━━━━━━━
□ Hotel browse screen (card swipe)
□ Hotel details modal
□ Vote results screen
□ "Everyone likes" matches

DELIVERABLE: Group can browse hotels, vote, see top choices
```

### MVP Checklist

```
✓ User authentication (phone OTP)
✓ Create trip
✓ Invite via link
✓ Join trip
✓ Trip dashboard
✓ Date voting
✓ Date results & finalization
✓ Budget entry (private)
✓ Budget aggregation
✓ Hotel browsing
✓ Hotel voting (swipe)
✓ Vote results (top hotels)
```

---

## Phase 2: Booking Integration (Week 9-16)

### Week 9-10: Hotel API Integration

```
BACKEND:
━━━━━━━━
□ MakeMyTrip/Booking.com affiliate signup
□ Hotel search API integration
□ Price filtering
□ Availability checking
□ Affiliate link generation

MOBILE:
━━━━━━━
□ Real hotel data in browse
□ Price display
□ Availability status
□ "Book on MakeMyTrip" button

DELIVERABLE: Real hotel search with affiliate links
```

### Week 11-12: Booking Flow

```
BACKEND:
━━━━━━━━
□ Booking model
□ Create booking endpoint
□ Booking status tracking
□ Affiliate tracking (for commission)

MOBILE:
━━━━━━━
□ Booking confirmation screen
□ Redirect to affiliate
□ Post-booking return flow
□ Booking status in trip dashboard

WEB:
━━━━
□ Booking confirmation page
□ Share booking details

DELIVERABLE: Users can book via affiliate, we track for commission
```

### Week 13-14: Payment Split UI

```
BACKEND:
━━━━━━━━
□ Payment split calculation
□ Payment tracking model
□ Manual payment marking

MOBILE:
━━━━━━━
□ Payment split screen
□ "Who owes what" view
□ Mark as paid (manual)
□ Send reminder (WhatsApp)

DELIVERABLE: Organizer can track who paid
```

### Week 15-16: Polish & Launch Prep

```
BACKEND:
━━━━━━━━
□ Error handling improvements
□ Logging & monitoring
□ Rate limiting tuning
□ Performance optimization

MOBILE:
━━━━━━━
□ Push notifications
□ Onboarding flow
□ Empty states
□ Error handling
□ App Store preparation

MARKETING:
━━━━━━━━━
□ Landing page
□ App Store listing
□ Social media presence
□ 10 beta groups for feedback

DELIVERABLE: Production-ready app with first users
```

---

## Phase 3: Growth (Week 17-24)

### Week 17-18: Payment Collection

```
BACKEND:
━━━━━━━━
□ Razorpay integration
□ Payment link generation
□ Webhook handling
□ Auto-update payment status

MOBILE:
━━━━━━━
□ Pay now button
□ Payment status updates
□ Payment history
□ Receipt sharing

DELIVERABLE: Collect payments within app
```

### Week 19-20: Shared Itinerary

```
BACKEND:
━━━━━━━━
□ Itinerary model
□ Activity CRUD
□ Day-by-day structure

MOBILE:
━━━━━━━
□ Itinerary view (timeline)
□ Add activity
□ Edit/delete activities
□ Map view (places)

DELIVERABLE: Groups can plan full itinerary
```

### Week 21-22: Activity Bookings

```
BACKEND:
━━━━━━━━
□ Activity search API
□ Activity affiliate integration
□ Booking flow

MOBILE:
━━━━━━━
□ Discover activities
□ Add to itinerary
□ Book activities

DELIVERABLE: Book experiences, tours, transport
```

### Week 23-24: Premium & Analytics

```
BACKEND:
━━━━━━━━
□ Premium feature flags
□ Subscription model (if needed)
□ Analytics events
□ Admin dashboard

MOBILE:
━━━━━━━
□ Premium upsell
□ Advanced split (custom amounts)
□ Export itinerary (PDF)
□ Trip history

MARKETING:
━━━━━━━━━
□ Instagram content creation
□ Influencer outreach
□ Referral program launch

DELIVERABLE: Monetization beyond affiliate
```

---

## Success Metrics

### MVP (Week 8)

| Metric | Target |
|--------|--------|
| Registered users | 200 |
| Trips created | 50 |
| Average members/trip | 5 |
| Feature completion | 100% |

### Booking (Week 16)

| Metric | Target |
|--------|--------|
| Registered users | 1,000 |
| Trips created | 300 |
| Bookings | 30 |
| Revenue | ₹75K total |

### Growth (Week 24)

| Metric | Target |
|--------|--------|
| Registered users | 5,000 |
| Trips created | 1,500 |
| Bookings/month | 100 |
| Revenue | ₹2.5L/month |

---

## Risk Mitigation

### Technical Risks

| Risk | Mitigation |
|------|------------|
| Hotel API access | Start with mock data, multiple API options |
| Real-time scaling | Use Redis pub/sub, optimize queries |
| Mobile performance | Lazy loading, pagination, caching |

### Business Risks

| Risk | Mitigation |
|------|------------|
| Low conversion | Focus on UX, reduce friction |
| Users book elsewhere | Make in-app booking seamless |
| Viral growth doesn't happen | Backup: targeted marketing |

---

## Weekly Standup Template

```markdown
## Week X Standup

### Completed
- [ ] Feature 1
- [ ] Feature 2

### In Progress
- [ ] Feature 3

### Blocked
- [ ] Issue description

### Next Week
- [ ] Planned feature 1
- [ ] Planned feature 2

### Metrics
- Users: X
- Trips: X
- Bookings: X
```
