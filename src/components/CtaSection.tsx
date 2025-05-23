'use client'; // Nécessaire pour useParams

import React from "react";
import { Button } from "@/components/ui/button"; // Assurez-vous que Button est installé
import Link from "next/link";
import { useParams } from 'next/navigation'; // Pour préfixer les liens avec la langue
import { useTranslations } from 'next-intl'; // Ajout

const CtaSection = () => {
  const params = useParams();
  const currentLang = params.lang as string || 'fr';
  const t = useTranslations('CtaSection'); // Initialisation

  return (
    <section className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900/20 dark:to-gray-900">
      <div className="container mx-auto">
        <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-300 opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={`/${currentLang}/auth?tab=signup`}>
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8">
                  {t('ctaButton1')}
                </Button>
              </Link>
              <Link href={`/${currentLang}/auth`}>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-8">
                  {t('ctaButton2')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 