import {
  ADDRESSES_CHANNEL,
  CUSTOMERS_CHANNEL,
  MessageType,
} from '@pavel-assignment/core';
import {
  db,
  createAddressCreatedMessage,
  getPubClient,
  getSubClient,
} from '@pavel-assignment/shared';

const customerIds = new Set<string>();

async function main() {
  const subClient = await getSubClient();
  const pubClient = await getPubClient();

  subClient.subscribe(CUSTOMERS_CHANNEL, function (rawMessage) {
    const message = JSON.parse(rawMessage);

    if (message.type === MessageType.CustomerCreated) {
      customerIds.add(message.id);
      return;
    }

    if (message.type === MessageType.CustomerDeleted) {
      customerIds.delete(message.id);
      return;
    }
  });

  setInterval(async () => {
    for (const customerId of customerIds) {
      const location = (Math.random() + 1).toString(36).substring(2);
      const address = await db.address.create({
        data: { customerId, location },
      });
      await pubClient.publish(
        ADDRESSES_CHANNEL,
        JSON.stringify(createAddressCreatedMessage(address))
      );
    }
  }, 1_000);
}

main().catch(console.error);
