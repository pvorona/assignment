'use client';

import { CustomerForm } from '../../../../components';

export default function Index() {
  return (
    <CustomerForm
      title="Edit customer"
      initialName="Alex"
      onSubmit={console.log}
    />
  );
}
