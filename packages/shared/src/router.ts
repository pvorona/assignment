import { initTRPC } from '@trpc/server';
import { object, string } from 'zod';
import { db } from './db';

export const t = initTRPC.create();

export const appRouter = t.router({
  getCustomers: t.procedure.query(() => {
    return db.customer.findMany();
  }),
  getCustomer: t.procedure.input(string()).query(({ input: id }) => {
    return db.customer.findFirst({ where: { id } });
  }),
  deleteCustomer: t.procedure.input(string()).query(({ input: id }) => {
    return Promise.all([
      db.address.deleteMany({ where: { customerId: id } }),
      db.customer.delete({ where: { id } }),
    ]);
  }),
  createCustomer: t.procedure.input(string()).mutation(({ input: name }) => {
    return db.customer.create({ data: { name } });
  }),
  updateCustomer: t.procedure
    .input(object({ id: string(), name: string().optional() }))
    .mutation(({ input: { id, ...payload } }) => {
      return db.customer.update({ where: { id }, data: payload });
    }),
  createAddress: t.procedure
    .input(
      object({
        customerId: string(),
        location: string(),
      })
    )
    .mutation(({ input }) => {
      return db.address.create({ data: input });
    }),
});

export type AppRouter = typeof appRouter;