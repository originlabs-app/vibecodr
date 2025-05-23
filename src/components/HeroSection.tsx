'use client'; // Pour useParams et potentiellement d'autres hooks si ajoutés

import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, MessageSquare, Users, LineChart } from "lucide-react";
import { useTranslations } from 'next-intl'; // Ajout
// import { useParams } from 'next/navigation'; // Plus nécessaire si lang n'est pas utilisé directement ici pour les liens
import { useWaitingList } from '@/components/LayoutWaitingList'; // Importer le hook pour ouvrir la modal

const HeroSection = () => {
  const t = useTranslations('HeroSection');
  // const params = useParams();
  // const currentLang = params.lang as string || 'fr';
  
  // On utilise notre hook pour accéder à la méthode openModal
  const { openModal } = useWaitingList();

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter break-words">
                {t('titlePart1')}<span className="text-gradient">{t('titleVibecodr')}</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-[600px]">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* TODO: Ajouter Link pour ces boutons si ce sont des navigations */}
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 w-full sm:w-auto"
                onClick={openModal} // Utiliser openModal au lieu d'un lien
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {t('ctaCommencer')}
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg w-full sm:w-auto">
                <MessageSquare className="mr-2 h-4 w-4" />
                {t('ctaComment')}
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              {t('joinUs')}
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="relative w-full max-w-md aspect-[4/3] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-1 border border-gray-100 dark:border-gray-700/50 overflow-hidden transition-shadow hover:shadow-3xl mx-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Titre principal */}
                <div className="flex items-center space-x-2 mb-2">
                  <span className="h-3 w-3 bg-red-400 rounded-full"></span>
                  <span className="h-3 w-3 bg-yellow-400 rounded-full"></span>
                  <span className="h-3 w-3 bg-green-400 rounded-full"></span>
                  <h4 className="ml-4 text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-300 truncate">{t('interfaceMockup.title')}</h4>
                </div>
                {/* Ligne de titre */}
                <div className="flex justify-between items-center gap-2">
                  <div className="h-6 flex-1 bg-gray-100 dark:bg-gray-700 rounded-md"></div>
                  <div className="flex gap-1">
                    <div className="p-1 bg-indigo-100 dark:bg-indigo-800/40 rounded">
                      <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded">
                      <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </div>
                {/* Tags */}
                <div className="flex gap-1 sm:gap-2 my-3 flex-wrap">
                  <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs text-purple-600 dark:text-purple-300 font-medium shadow-sm hover:bg-purple-200 transition">{t('interfaceMockup.tagVisionFirst')}</span>
                  <span className="px-2 sm:px-3 py-1 bg-pink-100 dark:bg-pink-900/30 rounded-full text-xs text-pink-600 dark:text-pink-300 font-medium shadow-sm hover:bg-pink-200 transition">{t('interfaceMockup.tagSaaS')}</span>
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-xs text-blue-600 dark:text-blue-300 font-medium shadow-sm hover:bg-blue-200 transition">{t('interfaceMockup.tagMVP')}</span>
                </div>
                {/* Bloc d'analyse IA */}
                <div className="h-40 sm:h-48 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800/30 p-3 sm:p-4 flex flex-col justify-between shadow-inner">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm flex items-center gap-1">
                      <LineChart className="h-4 w-4" />
                      <span className="truncate">{t('interfaceMockup.iaAnalysisTitle')}</span>
                    </span>
                  </div>
                  <div className="space-y-2 flex-grow">
                    <div className="h-3 bg-indigo-100/80 dark:bg-indigo-800/40 rounded w-full"></div>
                    <div className="h-3 bg-indigo-100/80 dark:bg-indigo-800/40 rounded w-5/6"></div>
                    <div className="h-3 bg-indigo-100/80 dark:bg-indigo-800/40 rounded w-4/6"></div>
                    <div className="h-3 bg-indigo-100/80 dark:bg-indigo-800/40 rounded w-5/6"></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-center text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-medium truncate">{t('interfaceMockup.iaAnalysisSubtitle')}</span>
                    {/* Badge animé pour le score */}
                    <span className="relative flex items-center">
                      <span className="bg-indigo-200 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-200 text-xs font-bold px-3 py-1 rounded-full animate-pulse">95%</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 