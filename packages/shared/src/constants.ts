export const CHANNEL = 'CUSTOMERS';

export enum MessageType {
  CustomerCreated = 'CustomerCreated',
  CustomerDeleted = 'CustomerDeleted',
}

export const createCustomerCreatedMessage = (id: string) => ({
  type: MessageType.CustomerCreated,
  id,
});

export const createCustomerDeletedMessage = (id: string) => ({
  type: MessageType.CustomerDeleted,
  id,
});
