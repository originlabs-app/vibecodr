'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import GlossaryTerm from '@/components/glossary/GlossaryTerm';
import { Book, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { GlossaryTerm as GlossaryTermTypeFromLib } from '@/lib/glossary';

interface GlossaryTermDataClient {
  id: string;
  slug: string;
  term: string;
  definition: string;
  category: string;
  displayCategory?: string;
}

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const TERMS_PER_LETTER_PAGE = 20;

interface GlossaryPageClientProps {
  initialTerms: GlossaryTermTypeFromLib[];
}

const GlossaryPageClient: React.FC<GlossaryPageClientProps> = ({ initialTerms }) => {
  const t = useTranslations('GlossaryPage');
  // const locale = useLocale(); // Plus nécessaire si on ne fetch plus côté client

  const [allTermsClient, setAllTermsClient] = useState<GlossaryTermDataClient[]>(() =>
    initialTerms.map(term => ({
      id: term.slug,
      slug: term.slug,
      term: term.title ?? term.slug,
      definition: term.fullDefinition,
      category: term.category || 'General',
    }))
  );
  // isLoading n'est plus vraiment nécessaire pour le chargement initial des termes
  // On pourrait le garder pour des actions futures, mais pour l'instant on peut le simplifier
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [currentLetterPage, setCurrentLetterPage] = useState(1);

  useEffect(() => {
    if (t.rich('allCategories')) {
      setSelectedCategory(t('allCategories'));
    } else {
      // Fallback si la clé de traduction n'est pas trouvée
      setSelectedCategory('All'); 
    }
  }, [t]);

  // Le useEffect pour fetchGlossaryData est supprimé car les données viennent d'initialTerms
  /*
  useEffect(() => {
    setIsLoading(true);
    async function fetchGlossaryData() {
      try {
        const response = await fetch(`/api/glossary/${locale}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch glossary data: ${response.statusText}`);
        }
        const termsData: any[] = await response.json();
        const processedTerms: GlossaryTermDataClient[] = termsData.map(raw => ({
          id: raw.id,
          slug: raw.id,
          term: raw.term ?? raw.id,
          definition: raw.definition,
          category: raw.category || 'General',
        }));
        setAllTermsClient(processedTerms);
      } catch (error) {
        console.error('[GlossaryPageClient] Error fetching glossary data:', error);
        setAllTermsClient([]);
      }
      setIsLoading(false);
    }
    fetchGlossaryData();
  }, [locale]);
  */

  useEffect(() => {
    setCurrentLetterPage(1);
  }, [selectedLetter, selectedCategory]);

  const translatedCategory = (categoryKey: string) => {
    if (!categoryKey) return categoryKey;
    try {
      const cleanKey = String(categoryKey).replace(/\s+/g, '');
      return t(`categories.${cleanKey}`);
    } catch {
      return categoryKey;
    }
  };

  const processedTermsForDisplay = useMemo(() =>
    allTermsClient.map(term => ({ ...term, displayCategory: translatedCategory(term.category) }))
  , [allTermsClient, t]);

  const categoriesForFilter = useMemo(() => {
    const categoryKeys = new Set<string>();
    allTermsClient.forEach(term => { if (term.category) categoryKeys.add(term.category); });
    const translatedKeys = Array.from(categoryKeys).map(key => translatedCategory(key)).sort();
    const allCat = t.rich('allCategories') ? t('allCategories') : 'All';
    return [allCat, ...translatedKeys];
  }, [allTermsClient, t]);

  const filteredTerms = useMemo(() => {
    // Si selectedCategory n'est pas encore initialisé (avant le premier useEffect), 
    // retourner un tableau vide pour éviter les erreurs ou un affichage non désiré.
    if (!selectedCategory) return []; 
    const allCat = t.rich('allCategories') ? t('allCategories') : 'All';
    return processedTermsForDisplay.filter(term => {
      const matchesCategory = selectedCategory === allCat || term.displayCategory === selectedCategory;
      const safeTermForLetterTest = term.term ?? '';
      const matchesLetter = !selectedLetter || (selectedLetter === '#'
        ? !/^[A-Z]/i.test(safeTermForLetterTest.charAt(0))
        : safeTermForLetterTest.charAt(0).toUpperCase() === selectedLetter);
      return matchesCategory && matchesLetter;
    });
  }, [selectedCategory, selectedLetter, processedTermsForDisplay, t]);

  const groupedByLetter = useMemo(() => {
    const groups: Record<string, GlossaryTermDataClient[]> = {};
    filteredTerms.forEach(term => {
      const safeText = term.term ?? '';
      const firstLetter = safeText && /^[A-Z]/i.test(safeText.charAt(0)) ? safeText.charAt(0).toUpperCase() : '#';
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const availableLetters = useMemo(() => LETTERS.filter(l => groupedByLetter[l]?.length), [groupedByLetter]);
  const hasOther = groupedByLetter['#']?.length > 0;

  const termsForSelectedLetter = useMemo(() => {
    if (!selectedLetter) return [];
    const terms = groupedByLetter[selectedLetter] || [];
    const startIndex = (currentLetterPage - 1) * TERMS_PER_LETTER_PAGE;
    const slicedTerms = terms.slice(startIndex, startIndex + TERMS_PER_LETTER_PAGE);
    // console.log('[DEBUG] termsForSelectedLetter (inside useMemo):', slicedTerms); // Nettoyé
    return slicedTerms;
  }, [groupedByLetter, selectedLetter, currentLetterPage]);

  const totalLetterPages = useMemo(() => {
    if (!selectedLetter) return 1;
    const terms = groupedByLetter[selectedLetter] || [];
    return Math.max(1, Math.ceil(terms.length / TERMS_PER_LETTER_PAGE));
  }, [groupedByLetter, selectedLetter]);

  const AlphabetBar = () => (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-2 border-b border-gray-200 dark:border-gray-800 flex flex-wrap gap-1 mb-8">
      {LETTERS.map(letter => (
        <Button key={letter} size="sm" variant={selectedLetter === letter ? 'default' : availableLetters.includes(letter) ? 'outline' : 'ghost'} disabled={!availableLetters.includes(letter)} onClick={() => setSelectedLetter(letter)}>
          {letter}
        </Button>
      ))}
      {hasOther && <Button key="#" size="sm" variant={selectedLetter === '#' ? 'default' : 'outline'} onClick={() => setSelectedLetter('#')}>
        #
      </Button>}
      <Button size="sm" variant={!selectedLetter && selectedCategory === (t.rich('allCategories') ? t('allCategories') : "All") ? 'default' : 'outline'} onClick={() => { setSelectedLetter(''); setSelectedCategory(t('allCategories')); }}>
        {t('allCategories')}
      </Button>
    </div>
  );

  const CategoryBar = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {categoriesForFilter.map(cat => (
        <Button key={cat} size="sm" variant={selectedCategory === cat ? 'default' : 'outline'} onClick={() => setSelectedCategory(cat)}>{cat}</Button>
      ))}
    </div>
  );

  const LetterPagination = () => totalLetterPages > 1 && (
    <div className="mt-6 flex justify-center items-center space-x-4">
      <Button onClick={() => setCurrentLetterPage(prev => Math.max(1, prev - 1))} disabled={currentLetterPage === 1} variant="outline">
        <ChevronLeft className="h-4 w-4 mr-2" />{t('previousPage')}
      </Button>
      <span className="text-sm text-gray-700 dark:text-gray-300">{t('pageInfo', { currentPage: currentLetterPage, totalPages: totalLetterPages })}</span>
      <Button onClick={() => setCurrentLetterPage(prev => Math.min(totalLetterPages, prev + 1))} disabled={currentLetterPage === totalLetterPages} variant="outline">
        {t('nextPage')}<ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  // Si selectedCategory n'est pas encore défini (avant le premier useEffect), 
  // ou si on voulait un état de chargement initial explicite (bien que les données soient maintenant synchrones via initialTerms)
  // if (isLoading || !selectedCategory) { // isLoading est false par défaut maintenant
  if (!selectedCategory) { // Attendre que selectedCategory soit initialisé par le useEffect
    return (
      <main className="flex-grow">
         <div className="container mx-auto py-12 px-4 md:px-6 flex justify-center items-center"><p className="text-xl">Loading glossary...</p></div>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container mx-auto py-12 px-4 md:px-6">
        {/* Retrait de la condition isLoading ici, car les données initiales sont synchrones */}
        {/* Le contenu s'affiche si selectedCategory est défini */}
        <div className="flex items-center mb-8"><Book className="h-8 w-8 mr-3 text-indigo-600" /><h1 className="text-4xl font-bold">{t('title')}</h1></div>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">{t('description')}</p>
        <CategoryBar />
        <AlphabetBar />
        {selectedLetter ? (
          <>
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">{selectedLetter === '#' ? '#' : selectedLetter}<span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">({groupedByLetter[selectedLetter]?.length || 0} termes)</span></h2>
            {termsForSelectedLetter.length === 0 ? <div className="text-center py-12"><p className="text-lg text-gray-600 dark:text-gray-400">{t('noTermsFound')}</p></div> : (<><div className="space-y-4">
              {termsForSelectedLetter.map(term => {
                // console.log('[DEBUG] Rendering term for selectedLetter:', term); // Nettoyé
                return (
                  <GlossaryTerm key={term.id} term={term.term} definition={term.definition} category={term.category} displayCategory={term.displayCategory} />
                );
              })}
              </div><LetterPagination /></>)}
          </>
        ) : (
          <div className="space-y-12">
            {LETTERS.concat(hasOther ? ['#'] : [])
              .filter(letter => groupedByLetter[letter]?.length > 0)
              .map(letter => {
                // console.log(`[DEBUG] Rendering letter section: ${letter}`, groupedByLetter[letter]); // Nettoyé
                return (
                  <div key={letter}>
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      {letter}
                      <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">({groupedByLetter[letter].length} termes)</span>
                    </h2>
                    <div className="space-y-4">
                      {groupedByLetter[letter].map(termData => {
                        // console.log(`[DEBUG] Rendering term for letter ${letter} in all-letters view:`, termData); // Nettoyé
                        return (
                          <GlossaryTerm
                            key={termData.id}
                            term={termData.term}
                            definition={termData.definition}
                            category={termData.category}
                            displayCategory={termData.displayCategory}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
};

export default GlossaryPageClient; 