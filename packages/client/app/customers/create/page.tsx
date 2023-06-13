'use client';

// import { useId } from 'react';
import { CustomerForm } from '../../../components';
// import { api } from './api';
// import styles from './page.module.scss';

export default function Index() {
  // const customersQuery = api.getCustomers.useQuery();

  // return <div>{JSON.stringify(customersQuery.data)}</div>;
  return (
    <CustomerForm
      title="Create customer"
      initialName=""
      onSubmit={console.log}
    />
  );
}
