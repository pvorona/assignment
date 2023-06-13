'use client';

import Link from 'next/link';

const customers = [
  { id: '1', name: 'Alex' },
  { id: '2', name: 'John' },
];

export default function Customers() {
  function handleDeleteCustomer(id: string) {
    console.log(id);
  }

  return (
    <div className="container pt-4">
      <h1 className="mb-4">Customers</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: 50 }}>
              #
            </th>
            <th scope="col">Name</th>
            <th scope="col" style={{ width: 220 }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id} className="align-middle">
              <th scope="row">{index + 1}</th>
              <td>{customer.name}</td>
              <td className="d-flex gap-2">
                <Link
                  href={`customers/${customer.id}`}
                  className="btn btn-primary"
                >
                  View
                </Link>
                <Link
                  href={`customers/${customer.id}/edit`}
                  className="btn btn-info"
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
