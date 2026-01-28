import 'dotenv/config';

export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  webUrl: process.env.WEB_URL || 'http://localhost:3001',
  appScheme: process.env.APP_SCHEME || 'tripsquad',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'development-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // MSG91 (OTP)
  msg91: {
    authKey: process.env.MSG91_AUTH_KEY || '',
    templateId: process.env.MSG91_TEMPLATE_ID || '',
    senderId: process.env.MSG91_SENDER_ID || 'TRIPSQ',
  },

  // Hotel API
  hotelApi: {
    apiKey: process.env.HOTEL_API_KEY || '',
    affiliateId: process.env.HOTEL_AFFILIATE_ID || '',
  },

  // Razorpay
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  },
} as const;

// Validate required config in production
if (config.nodeEnv === 'production') {
  const required = ['databaseUrl', 'jwt.secret'];
  for (const key of required) {
    const value = key.split('.').reduce((obj: any, k) => obj?.[k], config);
    if (!value || value.includes('change-me')) {
      throw new Error(`Missing or invalid required config: ${key}`);
    }
  }
}
