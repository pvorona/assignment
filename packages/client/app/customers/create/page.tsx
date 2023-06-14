'use client';

import { CustomerForm } from '../../../components';
import { api } from '../../api';
import { useRouter } from 'next/navigation';

export default function Index() {
  const router = useRouter();
  const createCustomerMutation = api.createCustomer.useMutation();

  async function handleSubmit(name: string) {
    await createCustomerMutation.mutateAsync(name);
    router.push('/customers');
  }

  return (
    <CustomerForm
      title="Create customer"
      initialName=""
      onSubmit={handleSubmit}
    />
  );
}
