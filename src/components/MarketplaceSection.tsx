'use client';

import React from "react";
import { Button } from "@/components/ui/button"; // Assurez-vous que Button est installé
import { Check, Star } from "lucide-react"; // Assurez-vous que lucide-react est installé
import { useTranslations, useLocale } from 'next-intl'; // Ajout

const MarketplaceSection = () => {
  const locale = useLocale();
  const t = useTranslations('MarketplaceSection');

  return (
    <section id="marketplace" className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">{t('mainTitle.gradient')}</span> {t('mainTitle.rest')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('mainSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Section Pour les Entrepreneurs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            <div className="p-1">
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{t('entrepreneurs.title')}</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('entrepreneurs.feature1.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t('entrepreneurs.feature1.description')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('entrepreneurs.feature2.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t('entrepreneurs.feature2.description')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('entrepreneurs.feature3.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t('entrepreneurs.feature3.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium"
                      role="img"
                      aria-label={t('entrepreneurs.coderProfile.name')}
                    >
                      JB
                    </div>
                    <div>
                      <p className="font-medium">{t('entrepreneurs.coderProfile.name')}</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1 text-gray-600 dark:text-gray-400">{t('entrepreneurs.coderProfile.rating')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-indigo-100 dark:bg-indigo-800/30 px-2 py-1 rounded text-xs font-medium text-indigo-700 dark:text-indigo-300">
                    {t('entrepreneurs.coderProfile.certification')}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('entrepreneurs.coderProfile.skills.react')}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('entrepreneurs.coderProfile.skills.nodejs')}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('entrepreneurs.coderProfile.skills.typescript')}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('entrepreneurs.coderProfile.skills.supabase')}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('entrepreneurs.coderProfile.description')}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">{t('entrepreneurs.ctaButton')}</Button>
              </div>
            </div>
          </div>

          {/* Section Pour les Vibe Coders */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            <div className="p-1">
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{t('coders.title')}</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('coders.feature1.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t('coders.feature1.description')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('coders.feature2.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t('coders.feature2.description')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{t('coders.feature3.title')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {t('coders.feature3.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4">
                  <h4 className="font-medium mb-2">{t('coders.featuredMission.title')}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">{t('coders.featuredMission.missionName')}</span> - {t('coders.featuredMission.missionDescription')}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('coders.featuredMission.skills.react')}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('coders.featuredMission.skills.typescript')}</span>
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">{t('coders.featuredMission.skills.recharts')}</span>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{t('coders.featuredMission.budget')}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{t('coders.featuredMission.duration')}</p>
                    </div>
                    <Button size="sm" variant="outline">{t('coders.featuredMission.ctaButton')}</Button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">{t('coders.ctaButton')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection; 