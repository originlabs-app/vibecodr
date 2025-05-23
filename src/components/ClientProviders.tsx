'use client';

import React, { ReactNode } from 'react';
import { WaitingListProvider } from '@/components/LayoutWaitingList';
import { Toaster } from '@/components/ui/sonner';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <WaitingListProvider>
      {children}
      <Toaster richColors position="top-right" />
    </WaitingListProvider>
  );
} 