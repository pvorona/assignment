'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { api } from './api';
import { useState } from 'react';

import './global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [apiClient] = useState(() =>
    api.createClient({
      links: [httpBatchLink({ url: 'http://localhost:3000/trpc' })],
    })
  );

  return (
    <html lang="en" className="h-100">
      <api.Provider client={apiClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <body className="h-100">{children}</body>
        </QueryClientProvider>
      </api.Provider>
    </html>
  );
}
