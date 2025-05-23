'use client';

import { useState, useEffect, useCallback } from 'react';

// Nom de la clé où on stocke le fait que l'utilisateur a fermé la modal
const MODAL_CLOSED_KEY = 'vibecodr_waitinglist_modal_closed';
// Délai avant d'afficher automatiquement la modal (30 secondes)
const AUTO_SHOW_DELAY_MS = 30000;

export function useWaitingListModal() {
  // État d'ouverture de la modal
  const [isOpen, setIsOpen] = useState(false);
  // Indicateur que le délai d'attente est écoulé
  const [timeElapsed, setTimeElapsed] = useState(false);
  // États pour suivre si l'utilisateur a déjà vu/fermé la modal
  const [hasClosedBefore, setHasClosedBefore] = useState(false);

  // Vérifier si la modal a été fermée précédemment (au chargement du hook)
  useEffect(() => {
    // Ne pas exécuter côté serveur
    if (typeof window === 'undefined') return;
    
    const hasBeenClosed = localStorage.getItem(MODAL_CLOSED_KEY) === 'true';
    setHasClosedBefore(hasBeenClosed);
    
    // Timer pour l'affichage automatique après 30 secondes
    const timer = setTimeout(() => {
      setTimeElapsed(true);
      // On n'affiche automatiquement que si l'utilisateur n'a jamais fermé la modal
      if (!hasBeenClosed) {
        setIsOpen(true);
      }
    }, AUTO_SHOW_DELAY_MS);
    
    return () => clearTimeout(timer);
  }, []);

  // Ouvrir la modal (manuellement, par exemple via un clic sur CTA)
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Fermer la modal et mémoriser que l'utilisateur l'a fermée
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Mémoriser que l'utilisateur a fermé la modal pour ne pas la réafficher automatiquement
    localStorage.setItem(MODAL_CLOSED_KEY, 'true');
    setHasClosedBefore(true);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    timeElapsed,
    hasClosedBefore,
  };
} 