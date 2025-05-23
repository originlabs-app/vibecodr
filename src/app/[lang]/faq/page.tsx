'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, AlertCircle } from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import "./faq-styles.css"; // Import des styles personnalisés
import StructuredFAQ from '@/components/StructuredFAQ';

interface FaqItemData {
  id: string;
  categoryKey: string; // Clé de catégorie standardisée (ex: "General", "Features")
  question: string;
  answer: string;
  displayCategory?: string; // Catégorie traduite pour affichage
}

// Fonction utilitaire pour obtenir les classes de couleur du badge selon la catégorie
function getCategoryColor(categoryKey: string) {
  const map: Record<string, string> = {
    General: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
    Features: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Marketplace: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    Quality: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Billing: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    Support: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
    Technical: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
  };
  return `ml-2 px-2 py-0.5 rounded-full text-xs category-badge ${map[categoryKey] ?? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"}`;
}

export default function FaqPage() {
  const t = useTranslations('FaqPage');
  const locale = useLocale();

  const [allFaqs, setAllFaqs] = useState<FaqItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("allCategories"); // Clé de traduction pour "Toutes les catégories"

  // Charger les données FAQ
  useEffect(() => {
    async function fetchFaqData() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/faq/${locale}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch FAQ data: ${response.statusText}`);
        }
        const faqData: FaqItemData[] = await response.json();
        if (!Array.isArray(faqData)) {
          throw new Error('FAQ data is not an array');
        }
        setAllFaqs(faqData);
      } catch (e) {
        console.error('[DEBUG] FaqPage - Error fetching FAQ data:', e);
        setError(e instanceof Error ? e.message : 'An unknown error occurred');
        setAllFaqs([]);
      }
      setIsLoading(false);
    }
    fetchFaqData();
  }, [locale]);

  // Gérer la catégorie active initiale basée sur la traduction
  useEffect(() => {
    setActiveTab(t('allCategories'));
  }, [t]);

  // Préparer les FAQs pour l'affichage (avec catégorie traduite)
  const processedFaqsForDisplay = useMemo(() => {
    return allFaqs.map(faq => ({
      ...faq,
      // Traduire la catégorie à partir de la clé
      displayCategory: t(`categories.${faq.categoryKey}`)
    }));
  }, [allFaqs, t]);

  // Extraire les catégories uniques pour les onglets
  const availableCategories = useMemo(() => {
    // Obtenir les clés de catégorie uniques des FAQs
    const uniqueCategoryKeys = [...new Set(allFaqs.map(faq => faq.categoryKey))];
    
    // Traduire ces clés pour l'affichage
    const translatedCategories = uniqueCategoryKeys.map(key => ({
      key,
      label: t(`categories.${key}`)
    }));
    
    // Ajouter "Toutes les catégories" en premier
    return [
      { key: 'allCategories', label: t('allCategories') },
      ...translatedCategories
    ];
  }, [allFaqs, t]);

  // Filtrer les FAQs
  const filteredFaqs = useMemo(() => {
    let faqs = [...processedFaqsForDisplay];
    const allCatLabel = t('allCategories');

    // Filtrer par catégorie active
    if (activeTab !== allCatLabel) {
      // Trouver la clé de catégorie correspondant à l'étiquette active
      const activeCategoryKey = availableCategories.find(cat => cat.label === activeTab)?.key;
      if (activeCategoryKey && activeCategoryKey !== 'allCategories') {
        faqs = faqs.filter(faq => faq.categoryKey === activeCategoryKey);
      }
    }

    // Filtrer par terme de recherche
    if (searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      faqs = faqs.filter(
        item => item.question.toLowerCase().includes(lowerSearchTerm) || 
               item.answer.toLowerCase().includes(lowerSearchTerm)
      );
    }
    return faqs;
  }, [activeTab, searchTerm, processedFaqsForDisplay, availableCategories, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-xl">Loading FAQs...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center items-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{t('noResultsTitle')}</h2>
          <p className="text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-10">
        <div className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold">{t('title')}</h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="pl-9 py-2 text-base"
              aria-label={t('searchPlaceholder')}
            />
          </div>

          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-5">
                <TabsList className="bg-gray-100 dark:bg-gray-800 rounded-md p-1 w-full md:w-auto overflow-x-auto flex">
                  {availableCategories.map((category) => (
                    <TabsTrigger 
                      key={category.key} 
                      value={category.label} 
                      className="px-3 py-1.5 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-gray-900/70 dark:data-[state=active]:text-indigo-400 transition-colors whitespace-nowrap"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-3">
                {filteredFaqs.length > 0 ? (
                  <Card className="shadow-md border dark:border-gray-800 overflow-hidden">
                    <CardContent className="p-0">
                      <Accordion type="single" collapsible className="w-full faq-accordion">
                        {filteredFaqs.map((faq) => (
                          <AccordionItem key={faq.id} value={faq.id} className="border-b last:border-b-0 dark:border-gray-800">
                            <AccordionTrigger className="text-left hover:no-underline py-2 px-4 text-base font-medium accordion-trigger">
                              <div className="flex items-center">
                                <span>{faq.question}</span>
                                <Badge className={getCategoryColor(faq.categoryKey)}>
                                  {faq.displayCategory}
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground px-4 pb-2 pt-0">
                              <div className="prose prose-sm prose-gray dark:prose-invert max-w-none accordion-content-inner" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="shadow-md border dark:border-gray-800">
                    <CardHeader className="text-center py-8">
                      <AlertCircle className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                      <CardTitle className="text-xl font-semibold">{t('noResultsTitle')}</CardTitle>
                      <CardDescription className="text-base">
                        {t('noResultsDescription')}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
      {filteredFaqs.length > 0 && <StructuredFAQ faqs={filteredFaqs} lang={locale} />}
    </div>
  );
} 