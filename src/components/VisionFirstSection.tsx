'use client'; // Nécessaire pour useParams

import React from "react";
import { CodeIcon, BookTextIcon, RocketIcon, ShieldCheckIcon, LayoutIcon } from "lucide-react"; 
// Assurez-vous que Card, CardContent, Button sont correctement installés via shadcn/ui
import { Card, CardContent } from "@/components/ui/card"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation'; // Pour préfixer les liens avec la langue
import { useTranslations } from 'next-intl'; // Ajout

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
  link?: string;
  currentLang: string; // Ajout pour i18n
  exploreText: string; // Ajout pour le texte du bouton
}

const FeatureCard = ({ icon, title, description, number, link, currentLang, exploreText }: FeatureCardProps) => (
  <Card className="relative border-gray-100 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300">
    <CardContent className="p-6">
      <div className="mb-4 rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <div className="absolute bottom-4 right-4 text-4xl font-bold text-gray-100 dark:text-gray-800">{number}</div>
      {link && (
        <div className="mt-4">
          <Button variant="outline" asChild size="sm" className="w-full">
            <Link href={`/${currentLang}${link}`}>{exploreText}</Link> 
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);

const VisionFirstSection = () => {
  const params = useParams();
  const currentLang = params.lang as string || 'fr';
  const t = useTranslations('VisionFirstSection'); // Initialisation

  const featuresData = [
    { key: 'codeGuide', icon: <CodeIcon className="h-6 w-6" />, link: "/dashboard/codeguide" },
    { key: 'wireframeGenerator', icon: <LayoutIcon className="h-6 w-6" />, link: "/dashboard/codeguide" },
    { key: 'projectBlueprint', icon: <BookTextIcon className="h-6 w-6" />, link: "/dashboard/blueprint" },
    { key: 'visionValidator', icon: <ShieldCheckIcon className="h-6 w-6" />, link: "/dashboard/vision-validator" },
    { key: 'launchReadiness', icon: <RocketIcon className="h-6 w-6" />, link: "/dashboard/launch-readiness" },
  ];

  const features = featuresData.map((feature, index) => ({
    icon: feature.icon,
    title: t(`features.${feature.key}.title`),
    description: t(`features.${feature.key}.description`),
    number: index + 1,
    link: feature.link,
    exploreText: t('features.exploreText') // Texte commun pour le bouton Explorer
  }));

  return (
    <section id="vision-first" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">{t('mainTitle.gradient')}</span> {t('mainTitle.rest')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('mainSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} currentLang={currentLang} />
          ))}
        </div>

        {/* ... (le reste de la section CodeGuide en action, à adapter de la même manière) ... */}
        {/* Pour l'instant, je vais omettre cette partie pour simplifier, nous y reviendrons */}
        <div className="mt-16 p-8 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700/50">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">{t('codeGuideInAction.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t('codeGuideInAction.description')}
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <p className="text-sm italic text-gray-700 dark:text-gray-300">
                  {t('codeGuideInAction.testimonial.text')}
                </p>
                <p className="text-sm font-semibold mt-2">{t('codeGuideInAction.testimonial.author')}</p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-lg">
              <div className="bg-white dark:bg-gray-800 p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-400 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{t('codeGuideInterface.title')}</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-indigo-50 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-700 dark:text-gray-200">
                    {t('codeGuideInterface.userQuery')}
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 rounded-lg text-sm border border-purple-100 dark:border-purple-800/20 text-gray-700 dark:text-gray-200">
                    <p className="mb-2">{t('codeGuideInterface.aiResponse.intro')}</p>
                    <ol className="list-decimal ml-5 space-y-1">
                      <li>{t('codeGuideInterface.aiResponse.step1')}</li>
                      <li>{t('codeGuideInterface.aiResponse.step2')}</li>
                      <li>{t('codeGuideInterface.aiResponse.step3')}</li>
                      <li>{t('codeGuideInterface.aiResponse.step4')}</li>
                    </ol>
                    <p className="mt-2">{t('codeGuideInterface.aiResponse.followUp')}</p>
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

export default VisionFirstSection; 