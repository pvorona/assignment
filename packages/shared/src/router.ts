import { initTRPC } from '@trpc/server';
import { object, string } from 'zod';
import { db } from './db';

export const t = initTRPC.create();

const customerIds = new Set<string>();

setInterval(async () => {
  for (const customerId of customerIds) {
    const location = (Math.random() + 1).toString(36).substring(2);
    const address = await db.address.create({ data: { customerId, location } });
    console.log('Created address', JSON.stringify(address));
  }
}, 1_000);

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
      customerIds.delete(id);
    }),
  createCustomer: t.procedure
    .input(string())
    .mutation(async ({ input: name }) => {
      const customer = await db.customer.create({ data: { name } });
      customerIds.add(customer.id);
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
