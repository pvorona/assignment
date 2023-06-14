import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import {
  appRouter,
  createAddressCreatedMessage,
  getSubClient,
} from '@pavel-assignment/shared';
import cors from 'cors';
import { ADDRESSES_CHANNEL, MessageType } from '@pavel-assignment/core';
import { WebSocket, WebSocketServer } from 'ws';

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const host = 'localhost';
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}/`);
});
server.on('error', console.error);

const webSocketServer = new WebSocketServer({ server });

const clientsByCustomerId = new Map<string, Set<WebSocket>>();

webSocketServer.on('connection', (client, message) => {
  const url = `ws://${host}:${port}/${message.url}`;
  const { searchParams } = new URL(url);
  const customerId = searchParams.get('customerId');

  if (!customerId) {
    console.log(`Connection attempt without customer id`);

    client.close();
    return;
  }

  if (!clientsByCustomerId.has(customerId)) {
    clientsByCustomerId.set(customerId, new Set());
  }

  (clientsByCustomerId.get(customerId) as Set<WebSocket>).add(client);

  client.on('close', () => {
    (clientsByCustomerId.get(customerId) as Set<WebSocket>).delete(client);
  });
});

async function main() {
  const subClient = await getSubClient();
  subClient.subscribe(ADDRESSES_CHANNEL, (rawMessage) => {
    const message = JSON.parse(rawMessage);

    if (message.type === MessageType.AddressCreated) {
      const { customerId } = message.address;

      if (clientsByCustomerId.has(customerId)) {
        for (const client of clientsByCustomerId.get(
          customerId
        ) as Set<WebSocket>) {
          client.send(
            JSON.stringify(createAddressCreatedMessage(message.address))
          );
        }
      }
    }
  });
}

main().catch(console.error);
