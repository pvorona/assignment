import { type Address } from '@prisma/client';
import { MessageType } from '@pavel-assignment/core';

export const createCustomerCreatedMessage = (id: string) => ({
  type: MessageType.CustomerCreated,
  id,
});

export const createCustomerDeletedMessage = (id: string) => ({
  type: MessageType.CustomerDeleted,
  id,
});

export const createAddressCreatedMessage = (address: Address) => ({
  type: MessageType.AddressCreated,
  address,
});
