import { AppRouter } from '@pavel-assignment/shared';
import { createTRPCReact } from '@trpc/react-query';

export const api = createTRPCReact<AppRouter>();
