import { initTRPC } from '@trpc/server';
import { object, string } from 'zod';
import { db } from './db';
import {
  CHANNEL,
  createCustomerCreatedMessage,
  createCustomerDeletedMessage,
} from './constants';
import { getRedisClient } from './redis';

export const t = initTRPC.create();

export const appRouter = t.router({
  getCustomers: t.procedure.query(() => {
    return db.customer.findMany();
  }),
  getCustomer: t.procedure.input(string()).query(({ input: id }) => {
    return db.customer.findFirst({ where: { id } });
  }),
  deleteCustomer: t.procedure
    .input(string())
    .mutation(async ({ input: id }) => {
      await db.address.deleteMany({ where: { customerId: id } });
      await db.customer.delete({ where: { id } });
      const client = await getRedisClient();
      await client.publish(
        CHANNEL,
        JSON.stringify(createCustomerDeletedMessage(id))
      );
    }),
  createCustomer: t.procedure
    .input(string())
    .mutation(async ({ input: name }) => {
      const customer = await db.customer.create({ data: { name } });
      const client = await getRedisClient();
      await client.publish(
        CHANNEL,
        JSON.stringify(createCustomerCreatedMessage(customer.id))
      );
      return customer;
    }),
  updateCustomer: t.procedure
    .input(object({ id: string(), name: string().optional() }))
    .mutation(({ input: { id, ...payload } }) => {
      return db.customer.update({ where: { id }, data: payload });
    }),
  getAddressesByCustomerId: t.procedure
    .input(string())
    .query(({ input: customerId }) => {
      return db.address.findMany({ where: { customerId } });
    }),
  createAddress: t.procedure
    .input(
      object({
        customerId: string(),
        location: string(),
      })
    )
    .mutation(({ input: { customerId, location } }) => {
      return db.address.create({ data: { customerId, location } });
    }),
});

export type AppRouter = typeof appRouter;
