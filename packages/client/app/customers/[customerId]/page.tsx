'use client';

const addresses = [
  { id: '1', location: 'Minsk' },
  { id: '2', location: 'Melbourne' },
];
const customer = {
  id: '1',
  name: 'Lex',
};

export default function Addresses() {
  return (
    <div className="container pt-4">
      <h1 className="mb-4">Addresses of {customer.name}</h1>
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
          {addresses.map((address, index) => (
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
