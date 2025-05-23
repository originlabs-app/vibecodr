'use client';

import React, { ReactNode } from 'react';
import { WaitingListModal } from '@/components/WaitingListModal';
import { useWaitingListModal } from '@/hooks/useWaitingListModal';

interface LayoutWaitingListProps {
  children: ReactNode;
}

export function LayoutWaitingList({ children }: LayoutWaitingListProps) {
  const { isOpen, closeModal } = useWaitingListModal();

  return (
    <>
      {children}
      <WaitingListModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}

// Créer un contexte global pour accéder à openModal depuis n'importe quel composant
import { createContext, useContext } from 'react';

interface WaitingListContextType {
  openModal: () => void;
}

const WaitingListContext = createContext<WaitingListContextType | null>(null);

export function WaitingListProvider({ children }: LayoutWaitingListProps) {
  const modalControls = useWaitingListModal();
  
  return (
    <WaitingListContext.Provider value={{ openModal: modalControls.openModal }}>
      {children}
      <WaitingListModal isOpen={modalControls.isOpen} onClose={modalControls.closeModal} />
    </WaitingListContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useWaitingList() {
  const context = useContext(WaitingListContext);
  
  if (!context) {
    throw new Error('useWaitingList must be used within a WaitingListProvider');
  }
  
  return context;
} 