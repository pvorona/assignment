'use client';

import { useEffect, useRef } from 'react';
import { api } from '../../api';
import { useQueryClient } from '@tanstack/react-query';
import { MessageType } from '@pavel-assignment/core';
import { getQueryKey } from '@trpc/react-query';
import { Address } from '@prisma/client';

export default function Addresses({
  params: { customerId },
}: {
  params: { customerId: string };
}) {
  const customerQuery = api.getCustomer.useQuery(customerId, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const addressesQuery = api.getAddressesByCustomerId.useQuery(customerId, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const clientRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();
  const queryKey = [
    ['getAddressesByCustomerId'],
    { input: customerId, type: 'query' },
  ];

  useEffect(() => {
    const client = new WebSocket(
      `ws://localhost:3000?customerId=${customerId}`
    );
    clientRef.current = client;
    client.addEventListener('message', handleMessage);

    function handleMessage(rawMessage: MessageEvent<string>) {
      const message = JSON.parse(rawMessage.data);

      if (message.type === MessageType.AddressCreated) {
        const { address } = message;

        queryClient.setQueryData(
          queryKey,
          (addresses: Address[] | undefined = []) => [
            ...addresses,
            address as Address,
          ]
        );
      }
    }

    return () => {
      client.removeEventListener('message', handleMessage);
      client.close();
    };
  }, [customerId, queryClient]);

  return (
    <div className="container pt-4">
      <h1 className="mb-4">Addresses of {customerQuery.data?.name}</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: 50 }}>
              #
            </th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {addressesQuery.data?.map((address, index) => (
            <tr key={address.id} className="align-middle">
              <th scope="row">{index + 1}</th>
              <td>{address.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
