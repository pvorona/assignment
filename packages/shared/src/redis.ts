import { createClient } from 'redis';

const redisClient = createClient({ url: process.env['REDIS_URL'] });

let connectionPromise: Promise<void> | null = null;

export const getRedisClient = async () => {
  if (!connectionPromise) {
    connectionPromise = redisClient.connect();
  }

  await connectionPromise;

  return redisClient;
};
