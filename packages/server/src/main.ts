import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from '@pavel-assignment/shared';
import cors from 'cors';

const app = express();

app.use(cors());


app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);
