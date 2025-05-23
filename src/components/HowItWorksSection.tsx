'use client';

import React from "react";
import { useTranslations, useLocale } from 'next-intl';

const HowItWorksSection = () => {
  const locale = useLocale();
  const t = useTranslations('HowItWorksSection');

  const stepsData = [
    { key: 'defineVision' },
    { key: 'findCoder' },
    { key: 'coPilot' },
    { key: 'launchProduct' },
  ];

  const steps = stepsData.map((step, index) => ({
    number: `0${index + 1}`,
    title: t(`steps.${step.key}.title`),
    description: t(`steps.${step.key}.description`),
  }));

  const whyData = [
    { key: 'synergy' },
    { key: 'madeInFrance' },
    { key: 'transparency' },
    { key: 'noLockIn' },
  ];

  const whyPoints = whyData.map((point, index) => ({
    number: `${index + 1}.`,
    title: t(`whyChooseUs.points.${point.key}.title`),
    description: t(`whyChooseUs.points.${point.key}.description`),
  }));

  const statsData = [
    { key: 'timeToMarket', value: t('stats.timeToMarket.value'), label: t('stats.timeToMarket.label') },
    { key: 'costReduction', value: t('stats.costReduction.value'), label: t('stats.costReduction.label') },
    { key: 'clientSatisfaction', value: t('stats.clientSatisfaction.value'), label: t('stats.clientSatisfaction.label') },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('mainTitle.part1')} <span className="text-gradient">{t('mainTitle.gradient')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('mainSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-xl transition-all"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-300 dark:text-gray-600">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">{t('whyChooseUs.title')}</h3>
              <ul className="space-y-5">
                {whyPoints.map(point => (
                  <li className="flex gap-3" key={point.title}>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">{point.number}</span>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{point.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {point.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-lg"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-full p-8 shadow-xl space-y-4">
                  {statsData.map((stat, index) => (
                    <React.Fragment key={stat.key}>
                      <div className="text-center">
                        <h4 className="text-gray-600 dark:text-gray-300 text-sm font-medium uppercase tracking-wider mb-1">{stat.label}</h4>
                        <p className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</p>
                      </div>
                      {index < statsData.length - 1 && (
                        <div className="w-24 h-px bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-700 dark:to-pink-700 mx-auto my-3"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 