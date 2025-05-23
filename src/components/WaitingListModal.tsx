'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckIcon, XIcon, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WaitingListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitingListModal({ isOpen, onClose }: WaitingListModalProps) {
  const t = useTranslations('WaitingListModal');
  const locale = useLocale();
  
  // États du formulaire
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isConsenting, setIsConsenting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!email || !isConsenting) {
      setErrorMessage(t('errorValidation'));
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Appel Edge Function Supabase
      const response = await fetch('https://lcyucxccfekersehfcmb.supabase.co/functions/v1/quick-processor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name: name || undefined,
          locale,
          isConsenting,
          timestamp: new Date().toISOString(),
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || t('errorGeneric'));
      }
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : t('errorGeneric'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Réinitialiser le formulaire quand la modal se ferme
  const handleClose = () => {
    if (!isSubmitting) {
      // Si la soumission a réussi, on réinitialise tout
      if (submitStatus === 'success') {
        setEmail('');
        setName('');
        setIsConsenting(false);
        setSubmitStatus('idle');
        setErrorMessage('');
      }
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-[calc(100vw-2rem)] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-xl p-4 sm:p-6 mx-auto">
        {submitStatus !== 'success' ? (
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
                {t('title')}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center sm:text-left">
                {t('subtitle')}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 py-2 sm:py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                    {t('emailLabel')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                    {t('nameLabel')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-start space-x-3 pt-1">
                  <Checkbox
                    id="consent"
                    checked={isConsenting}
                    onCheckedChange={(checked) => setIsConsenting(checked as boolean)}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <Label htmlFor="consent" className="text-xs sm:text-sm font-normal leading-relaxed text-gray-700 dark:text-gray-300 cursor-pointer">
                    {t('consentText')}
                  </Label>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {errorMessage || t('errorGeneric')}
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-11 sm:h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-300 text-sm sm:text-base"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                  >
                    <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    {isSubmitting ? t('submitting') : t('submit')}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
                  {t('privacyNote')}
                </p>
              </div>
            </form>

            <div className="mt-4 sm:mt-6">
              <Card className="bg-gray-50 dark:bg-gray-800/30 border-none shadow-none">
                <CardContent className="p-3 sm:p-4">
                  <h4 className="font-semibold mb-3 text-gray-900 dark:text-white text-sm sm:text-base">
                    {t('benefitsTitle')}
                  </h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {['benefit1', 'benefit2', 'benefit3'].map((key) => (
                      <li key={key} className="flex items-start space-x-2 sm:space-x-3">
                        <span className="bg-green-100 dark:bg-green-900/30 p-0.5 sm:p-1 rounded-full text-green-700 dark:text-green-400 mt-0.5 flex-shrink-0">
                          <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                        </span>
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {t(key)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 sm:py-8 text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 sm:p-4 rounded-full text-green-700 dark:text-green-400 mb-4">
              <CheckIcon className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              {t('successTitle')}
            </h3>
            <p className="mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300 px-2 leading-relaxed max-w-sm">
              {t('successMessage')}
            </p>
            <Button 
              onClick={handleClose} 
              size="lg" 
              className="h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg transition-all duration-300 text-sm sm:text-base"
            >
              {t('closeButton')}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
} 