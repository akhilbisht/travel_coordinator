import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import { config } from './config/index.js';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Plugins
await app.register(cors, {
  origin: [config.webUrl, 'http://localhost:8081'], // Web + Expo
  credentials: true,
});

await app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

// Health check
app.get('/health', async () => {
  return { 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'tripsquad-api',
  };
});

// API routes (to be implemented)
// await app.register(authRoutes, { prefix: '/api/v1/auth' });
// await app.register(tripRoutes, { prefix: '/api/v1/trips' });
// await app.register(hotelRoutes, { prefix: '/api/v1/hotels' });

// Root endpoint
app.get('/', async () => {
  return { 
    message: 'TripSquad API',
    version: '0.1.0',
    docs: '/docs',
  };
});

// Start server
const start = async () => {
  try {
    await app.listen({ port: config.port, host: '0.0.0.0' });
    app.log.info(`🚀 TripSquad API running on port ${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
