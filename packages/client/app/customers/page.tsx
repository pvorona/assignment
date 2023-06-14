'use client';

import Link from 'next/link';
import { api } from '../api';

export default function Customers() {
  const customersQuery = api.getCustomers.useQuery();
  const deleteCustomerMutation = api.deleteCustomer.useMutation();

  async function handleDeleteCustomer(id: string) {
    await deleteCustomerMutation.mutateAsync(id);
    customersQuery.refetch();
  }

  return (
    <div className="container pt-4">
      <div className="d-flex align-items-center">
        <h1 className="mb-4">Customers</h1>
        <Link href={`/customers/create`} className="ms-auto btn btn-primary">
          Create
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: 50 }}>
              #
            </th>
            <th scope="col">Name</th>
            <th scope="col" style={{ width: 300 }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customersQuery.data?.map((customer, index) => (
            <tr key={customer.id} className="align-middle">
              <th scope="row">{index + 1}</th>
              <td>{customer.name}</td>
              <td className="d-flex gap-2">
                <Link
                  href={`customers/${customer.id}`}
                  className="btn btn-primary"
                >
                  View addresses
                </Link>
                <Link
                  href={`customers/${customer.id}/edit`}
                  className="btn btn-success"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
