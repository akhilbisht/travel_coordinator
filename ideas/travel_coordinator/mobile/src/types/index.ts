// Core types for TripSquad app

export interface User {
  id: string;
  phone: string;
  name?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Trip {
  id: string;
  name: string;
  destination?: string;
  inviteCode: string;
  status: TripStatus;
  dateRangeStart?: string;
  dateRangeEnd?: string;
  startDate?: string;
  endDate?: string;
  budgetMin?: number;
  budgetMax?: number;
  members: TripMember[];
  createdAt: string;
}

export type TripStatus =
  | 'PLANNING'
  | 'DATES_VOTING'
  | 'DATES_SET'
  | 'BUDGET_SET'
  | 'HOTEL_VOTING'
  | 'HOTEL_CHOSEN'
  | 'BOOKED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface TripMember {
  id: string;
  tripId: string;
  userId: string;
  user: User;
  role: MemberRole;
  joinedAt: string;
}

export type MemberRole = 'ORGANIZER' | 'MEMBER';

export interface DateVote {
  id: string;
  tripId: string;
  userId: string;
  date: string;
  available: boolean;
}

export interface DateVoteResult {
  date: string;
  count: number;
  percentage: number;
  users: Pick<User, 'id' | 'name'>[];
}

export interface BudgetEntry {
  id: string;
  tripId: string;
  userId: string;
  minBudget: number;
  maxBudget: number;
}

export interface BudgetSummary {
  submitted: number;
  total: number;
  range: {
    min: number;
    max: number;
  };
  sweetSpot: {
    min: number;
    max: number;
  };
}

export interface Hotel {
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

export interface HotelVote {
  id: string;
  tripId: string;
  userId: string;
  hotelId: string;
  vote: VoteType;
}

export type VoteType = 'LIKE' | 'DISLIKE' | 'SKIP';

export interface HotelVoteResult {
  hotel: Hotel;
  likes: number;
  total: number;
  percentage: number;
  likedBy: Pick<User, 'id' | 'name'>[];
}

export interface Booking {
  id: string;
  tripId: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  totalAmount: number;
  perPersonAmount: number;
  status: BookingStatus;
  payments: Payment[];
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  user: User;
  amount: number;
  status: PaymentStatus;
  paidAt?: string;
}

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  PhoneInput: undefined;
  OTPVerify: { phone: string };
  CreateTrip: undefined;
  TripDetails: { tripId: string };
  JoinTrip: { inviteCode: string };
  DateVoting: { tripId: string };
  BudgetEntry: { tripId: string };
  HotelBrowse: { tripId: string };
  HotelDetails: { tripId: string; hotelId: string };
  BookingDetails: { tripId: string };
};

export type MainTabParamList = {
  Trips: undefined;
  Profile: undefined;
};
