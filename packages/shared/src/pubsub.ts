import { createClient } from 'redis';

const pubClient = createClient({ url: process.env['REDIS_URL'] });
const subClient = createClient({ url: process.env['REDIS_URL'] });

let pubConnectionPromise: Promise<void> | null = null;
let subConnectionPromise: Promise<void> | null = null;

export const getPubClient = async () => {
  if (!pubConnectionPromise) {
    pubConnectionPromise = pubClient.connect();
  }

  await pubConnectionPromise;

  return pubClient;
};

export const getSubClient = async () => {
  if (!subConnectionPromise) {
    subConnectionPromise = subClient.connect();
  }

  await subConnectionPromise;

  return subClient;
};
