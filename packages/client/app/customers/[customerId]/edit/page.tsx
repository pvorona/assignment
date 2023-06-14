'use client';

import { api } from '../../../api';
import { CustomerForm } from '../../../../components';
import { useRouter } from 'next/navigation';

export default function EditCustomer({
  params: { customerId },
}: {
  params: { customerId: string };
}) {
  const router = useRouter();
  const updateCustomerMutation = api.updateCustomer.useMutation();
  const customerQuery = api.getCustomer.useQuery(customerId);

  async function handleSubmit(name: string) {
    await updateCustomerMutation.mutateAsync({ name, id: customerId });
    router.push('/customers');
  }

  return (
    <CustomerForm
      title="Edit customer"
      initialName={customerQuery.data?.name ?? ''}
      onSubmit={handleSubmit}
    />
  );
}
