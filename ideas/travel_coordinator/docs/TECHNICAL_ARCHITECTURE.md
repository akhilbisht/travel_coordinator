# Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   Mobile App     │  │    Web App       │  │  WhatsApp Link   │  │
│  │  (React Native)  │  │   (Next.js)      │  │   (Deep Link)    │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                     │             │
└───────────┼─────────────────────┼─────────────────────┼─────────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY                                  │
│                    (Fastify + Rate Limiting)                        │
└─────────────────────────────────────────────────────────────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Auth Service   │  │   Trip Service   │  │  Hotel Service   │
│   (OTP, JWT)     │  │  (Core Logic)    │  │  (Search, Cache) │
└──────────────────┘  └──────────────────┘  └──────────────────┘
            │                     │                     │
            └─────────────────────┼─────────────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            ▼                     ▼                     ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │     Redis        │  │  External APIs   │
│   (Primary DB)   │  │  (Cache/Queue)   │  │ (Hotels, SMS)    │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## Tech Stack

### Frontend (Mobile)

| Component | Technology | Reason |
|-----------|------------|--------|
| Framework | React Native + Expo | Cross-platform, fast iteration, OTA updates |
| State | Redux Toolkit | Predictable state management |
| API Client | RTK Query | Caching, auto-refetch |
| UI | React Native Paper | Material Design, consistent UX |
| Navigation | React Navigation | Standard for RN |
| Forms | React Hook Form + Zod | Performant validation |

### Frontend (Web)

| Component | Technology | Reason |
|-----------|------------|--------|
| Framework | Next.js 14 | SSR, PWA support, React |
| Styling | Tailwind CSS | Rapid development |
| State | React Query | Server state management |
| PWA | next-pwa | Offline support, installable |

### Backend

| Component | Technology | Reason |
|-----------|------------|--------|
| Runtime | Node.js 20 | JavaScript ecosystem |
| Framework | Fastify | High performance, TypeScript |
| ORM | Prisma | Type-safe, migrations |
| Validation | Zod | Schema validation |
| Auth | JWT + Phone OTP | Simple, secure |
| Real-time | Socket.io | Voting updates |

### Data Layer

| Component | Technology | Reason |
|-----------|------------|--------|
| Database | PostgreSQL | Reliable, JSON support |
| Cache | Redis | Session, rate limiting |
| Search | PostgreSQL FTS | Good enough for MVP |

### External Services

| Service | Provider | Purpose |
|---------|----------|---------|
| SMS/OTP | MSG91 | Phone authentication |
| Hotels | MakeMyTrip Affiliate | Hotel search & booking |
| Payments | Razorpay | Payment collection |
| Push | Firebase FCM | Notifications |
| Hosting | Railway/Render | Backend |
| CDN | Vercel | Web frontend |

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    User      │───────│  TripMember  │───────│    Trip      │
└──────────────┘       └──────────────┘       └──────────────┘
       │                      │                      │
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   DateVote   │       │  BudgetEntry │       │  HotelVote   │
└──────────────┘       └──────────────┘       └──────────────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │   Booking    │
                                              └──────────────┘
                                                     │
                                                     ▼
                                              ┌──────────────┐
                                              │   Payment    │
                                              └──────────────┘
```

### Prisma Schema

```prisma
// User - People using the app
model User {
  id          String   @id @default(uuid())
  phone       String   @unique
  name        String?
  avatarUrl   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  memberships TripMember[]
  dateVotes   DateVote[]
  budgets     BudgetEntry[]
  hotelVotes  HotelVote[]
  payments    Payment[]
}

// Trip - A group trip being planned
model Trip {
  id              String    @id @default(uuid())
  name            String
  destination     String?
  destinationData Json?     // Cached destination info
  inviteCode      String    @unique @default(cuid())
  status          TripStatus @default(PLANNING)
  
  // Date range for voting
  dateRangeStart  DateTime?
  dateRangeEnd    DateTime?
  
  // Finalized dates
  startDate       DateTime?
  endDate         DateTime?
  
  // Budget (aggregated)
  budgetMin       Int?
  budgetMax       Int?
  
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  // Relations
  members         TripMember[]
  dateVotes       DateVote[]
  budgets         BudgetEntry[]
  hotelVotes      HotelVote[]
  booking         Booking?
}

enum TripStatus {
  PLANNING      // Initial state
  DATES_VOTING  // Voting on dates
  DATES_SET     // Dates finalized
  BUDGET_SET    // Budget collected
  HOTEL_VOTING  // Voting on hotels
  HOTEL_CHOSEN  // Hotel selected
  BOOKED        // Booking confirmed
  COMPLETED     // Trip done
  CANCELLED     // Trip cancelled
}

// TripMember - User's membership in a trip
model TripMember {
  id        String   @id @default(uuid())
  tripId    String
  userId    String
  role      MemberRole @default(MEMBER)
  joinedAt  DateTime @default(now())
  
  trip      Trip     @relation(fields: [tripId], references: [id])
  user      User     @relation(fields: [userId], references: [id])

  @@unique([tripId, userId])
}

enum MemberRole {
  ORGANIZER
  MEMBER
}

// DateVote - User's available dates
model DateVote {
  id        String   @id @default(uuid())
  tripId    String
  userId    String
  date      DateTime
  available Boolean  @default(true)
  createdAt DateTime @default(now())

  trip      Trip     @relation(fields: [tripId], references: [id])
  user      User     @relation(fields: [userId], references: [id])

  @@unique([tripId, userId, date])
}

// BudgetEntry - User's budget (private)
model BudgetEntry {
  id        String   @id @default(uuid())
  tripId    String
  userId    String
  minBudget Int      // Per night, per person
  maxBudget Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  trip      Trip     @relation(fields: [tripId], references: [id])
  user      User     @relation(fields: [userId], references: [id])

  @@unique([tripId, userId])
}

// HotelVote - User's vote on a hotel
model HotelVote {
  id          String   @id @default(uuid())
  tripId      String
  userId      String
  hotelId     String   // External hotel ID
  hotelData   Json     // Cached hotel info
  vote        VoteType
  createdAt   DateTime @default(now())

  trip        Trip     @relation(fields: [tripId], references: [id])
  user        User     @relation(fields: [userId], references: [id])

  @@unique([tripId, userId, hotelId])
}

enum VoteType {
  LIKE
  DISLIKE
  SKIP
}

// Booking - Confirmed booking
model Booking {
  id              String   @id @default(uuid())
  tripId          String   @unique
  hotelId         String
  hotelName       String
  hotelData       Json
  checkIn         DateTime
  checkOut        DateTime
  rooms           Int
  totalAmount     Int
  perPersonAmount Int
  affiliateRef    String?  // Tracking for commission
  status          BookingStatus @default(PENDING)
  createdAt       DateTime @default(now())

  trip            Trip     @relation(fields: [tripId], references: [id])
  payments        Payment[]
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
}

// Payment - Individual payments
model Payment {
  id          String   @id @default(uuid())
  bookingId   String
  userId      String
  amount      Int
  status      PaymentStatus @default(PENDING)
  razorpayId  String?
  paidAt      DateTime?
  createdAt   DateTime @default(now())

  booking     Booking  @relation(fields: [bookingId], references: [id])
  user        User     @relation(fields: [userId], references: [id])

  @@unique([bookingId, userId])
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}
```

---

## API Design

### Authentication

```
POST /api/v1/auth/otp/send
  Body: { phone: "+919876543210" }
  Response: { success: true, message: "OTP sent" }

POST /api/v1/auth/otp/verify
  Body: { phone: "+919876543210", otp: "123456" }
  Response: { token: "jwt...", user: {...} }

POST /api/v1/auth/refresh
  Headers: { Authorization: "Bearer refresh_token" }
  Response: { token: "new_jwt..." }
```

### Trips

```
POST /api/v1/trips
  Body: { name: "Goa Trip", destination?: "Goa", dateRange?: {...} }
  Response: { trip: {...}, inviteLink: "https://..." }

GET /api/v1/trips
  Response: { trips: [...] }  // User's trips

GET /api/v1/trips/:id
  Response: { trip: {...}, members: [...], status: {...} }

POST /api/v1/trips/:id/join
  Body: { inviteCode: "abc123" }
  Response: { trip: {...} }

PUT /api/v1/trips/:id
  Body: { name?: "...", status?: "..." }
  Response: { trip: {...} }
```

### Date Voting

```
POST /api/v1/trips/:id/dates/range
  Body: { start: "2026-12-15", end: "2026-12-30" }
  Response: { trip: {...} }

POST /api/v1/trips/:id/dates/vote
  Body: { dates: ["2026-12-20", "2026-12-21", ...] }
  Response: { success: true }

GET /api/v1/trips/:id/dates/results
  Response: { 
    bestDates: [...], 
    availability: { "2026-12-20": { count: 6, users: [...] } }
  }

POST /api/v1/trips/:id/dates/finalize
  Body: { startDate: "2026-12-20", endDate: "2026-12-23" }
  Response: { trip: {...} }
```

### Budget

```
POST /api/v1/trips/:id/budget
  Body: { minBudget: 2000, maxBudget: 4000 }
  Response: { success: true }

GET /api/v1/trips/:id/budget/summary
  Response: { 
    submitted: 6,
    total: 8,
    range: { min: 2500, max: 5000 },
    sweetSpot: { min: 3000, max: 4000 }
  }
```

### Hotels

```
GET /api/v1/trips/:id/hotels
  Query: { page: 1, limit: 20 }
  Response: { hotels: [...], total: 50 }

GET /api/v1/hotels/:hotelId
  Response: { hotel: {...} }  // Detailed info

POST /api/v1/trips/:id/hotels/:hotelId/vote
  Body: { vote: "LIKE" | "DISLIKE" | "SKIP" }
  Response: { success: true }

GET /api/v1/trips/:id/hotels/results
  Response: { 
    topHotels: [...],
    votingProgress: { voted: 6, total: 8 }
  }
```

### Booking

```
POST /api/v1/trips/:id/booking
  Body: { hotelId: "...", rooms: 4 }
  Response: { 
    booking: {...},
    affiliateUrl: "https://makemytrip.com/..." 
  }

GET /api/v1/trips/:id/booking
  Response: { booking: {...}, payments: [...] }

POST /api/v1/trips/:id/booking/payment
  Response: { paymentLink: "https://razorpay.com/..." }
```

---

## Real-time Updates (Socket.io)

### Events

```typescript
// Server -> Client
interface ServerEvents {
  'trip:updated': (trip: Trip) => void;
  'member:joined': (member: TripMember) => void;
  'date:voted': (result: DateVoteResult) => void;
  'budget:updated': (summary: BudgetSummary) => void;
  'hotel:voted': (result: HotelVoteResult) => void;
  'payment:received': (payment: Payment) => void;
}

// Client -> Server
interface ClientEvents {
  'trip:join': (tripId: string) => void;
  'trip:leave': (tripId: string) => void;
}
```

### Implementation

```typescript
// Backend: Socket.io setup
io.on('connection', (socket) => {
  socket.on('trip:join', (tripId) => {
    socket.join(`trip:${tripId}`);
  });

  socket.on('trip:leave', (tripId) => {
    socket.leave(`trip:${tripId}`);
  });
});

// Emit updates when things change
function onDateVote(tripId: string, result: DateVoteResult) {
  io.to(`trip:${tripId}`).emit('date:voted', result);
}
```

---

## External Integrations

### Hotel Search (MakeMyTrip Affiliate)

```typescript
interface HotelSearchParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  priceMin?: number;
  priceMax?: number;
}

interface Hotel {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  images: string[];
  amenities: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  affiliateUrl: string;
}

async function searchHotels(params: HotelSearchParams): Promise<Hotel[]> {
  // Option 1: MakeMyTrip Affiliate API (if available)
  // Option 2: Booking.com Affiliate API
  // Option 3: Scraping (last resort, TOS issues)
}
```

### SMS/OTP (MSG91)

```typescript
async function sendOTP(phone: string): Promise<void> {
  await msg91.sendOTP({
    mobile: phone,
    template_id: process.env.MSG91_TEMPLATE_ID,
  });
}

async function verifyOTP(phone: string, otp: string): Promise<boolean> {
  const result = await msg91.verifyOTP({
    mobile: phone,
    otp: otp,
  });
  return result.type === 'success';
}
```

### Payments (Razorpay)

```typescript
async function createPaymentLink(params: {
  amount: number;
  userId: string;
  bookingId: string;
  userName: string;
}): Promise<string> {
  const paymentLink = await razorpay.paymentLink.create({
    amount: params.amount * 100, // paise
    currency: 'INR',
    description: `Trip payment`,
    customer: { name: params.userName },
    notify: { sms: true },
    callback_url: `${API_URL}/webhooks/razorpay`,
    notes: {
      userId: params.userId,
      bookingId: params.bookingId,
    },
  });
  return paymentLink.short_url;
}
```

---

## Deployment Architecture

### Development

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: tripsquad
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/tripsquad
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
```

### Production

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cloudflare (CDN)                          │
└─────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
            ┌──────────────┐       ┌──────────────┐
            │    Vercel    │       │   Railway    │
            │   (Web PWA)  │       │   (API)      │
            └──────────────┘       └──────────────┘
                                          │
                              ┌───────────┼───────────┐
                              ▼           ▼           ▼
                       ┌──────────┐ ┌──────────┐ ┌──────────┐
                       │ Supabase │ │  Upstash │ │   S3     │
                       │(Postgres)│ │  (Redis) │ │ (Images) │
                       └──────────┘ └──────────┘ └──────────┘
```

### Cost Estimate (MVP)

| Service | Provider | Monthly Cost |
|---------|----------|--------------|
| Database | Supabase Free | ₹0 |
| Redis | Upstash Free | ₹0 |
| API Hosting | Railway | ₹500-1000 |
| Web Hosting | Vercel Free | ₹0 |
| SMS (OTP) | MSG91 | ₹500-1000 |
| Domain | | ₹1000/year |
| **Total** | | **₹1,500-2,500/month** |

---

## Security

### Authentication
- Phone OTP verification
- JWT with 15-min access token, 7-day refresh
- Rate limiting on OTP endpoints

### Data Protection
- Budget entries only visible to user + aggregated
- HTTPS everywhere
- Input validation with Zod

### API Security
- Rate limiting (100 req/min)
- CORS configured
- Request validation
