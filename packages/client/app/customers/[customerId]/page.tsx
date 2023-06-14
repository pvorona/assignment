'use client';

import { api } from '../../api';

export default function Addresses({
  params: { customerId },
}: {
  params: { customerId: string };
}) {
  const customerQuery = api.getCustomer.useQuery(customerId);
  const addressesQuery = api.getAddressesByCustomerId.useQuery(customerId);

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
