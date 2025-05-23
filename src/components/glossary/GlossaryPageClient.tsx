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
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-3 border-b border-gray-200 dark:border-gray-800 mb-6">
      {/* Mobile : Menu déroulant */}
      <div className="block sm:hidden">
        <div className="mb-3">
          <select 
            value={selectedLetter || ''} 
            onChange={(e) => setSelectedLetter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">{t('allCategories')}</option>
            {availableLetters.map(letter => (
              <option key={letter} value={letter}>{letter}</option>
            ))}
            {hasOther && <option value="#">#</option>}
          </select>
        </div>
        <div className="flex justify-center">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => { setSelectedLetter(''); setSelectedCategory(t('allCategories')); }}
            className="text-xs px-3 py-1"
          >
            {t('allCategories')}
          </Button>
        </div>
      </div>
      
      {/* Desktop : Boutons en ligne */}
      <div className="hidden sm:flex flex-wrap gap-1">
        {LETTERS.map(letter => (
          <Button 
            key={letter} 
            size="sm" 
            variant={selectedLetter === letter ? 'default' : availableLetters.includes(letter) ? 'outline' : 'ghost'} 
            disabled={!availableLetters.includes(letter)} 
            onClick={() => setSelectedLetter(letter)}
            className="h-8 w-8 p-0 text-xs"
          >
            {letter}
          </Button>
        ))}
        {hasOther && (
          <Button 
            key="#" 
            size="sm" 
            variant={selectedLetter === '#' ? 'default' : 'outline'} 
            onClick={() => setSelectedLetter('#')}
            className="h-8 w-8 p-0 text-xs"
          >
            #
          </Button>
        )}
        <Button 
          size="sm" 
          variant={!selectedLetter && selectedCategory === (t.rich('allCategories') ? t('allCategories') : "All") ? 'default' : 'outline'} 
          onClick={() => { setSelectedLetter(''); setSelectedCategory(t('allCategories')); }}
          className="ml-2 text-xs px-3"
        >
          {t('allCategories')}
        </Button>
      </div>
    </div>
  );

  const CategoryBar = () => (
    <div className="mb-6">
      {/* Mobile : Menu déroulant */}
      <div className="block sm:hidden">
        <select 
          value={selectedCategory || ''} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {categoriesForFilter.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      {/* Desktop : Boutons en ligne */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {categoriesForFilter.map(cat => (
          <Button 
            key={cat} 
            size="sm" 
            variant={selectedCategory === cat ? 'default' : 'outline'} 
            onClick={() => setSelectedCategory(cat)}
            className="text-xs px-3 py-1"
          >
            {cat}
          </Button>
        ))}
      </div>
    </div>
  );

  const LetterPagination = () => totalLetterPages > 1 && (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <Button 
        onClick={() => setCurrentLetterPage(prev => Math.max(1, prev - 1))} 
        disabled={currentLetterPage === 1} 
        variant="outline"
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />{t('previousPage')}
      </Button>
      <span className="text-sm text-gray-700 dark:text-gray-300 px-2 text-center">
        {t('pageInfo', { currentPage: currentLetterPage, totalPages: totalLetterPages })}
      </span>
      <Button 
        onClick={() => setCurrentLetterPage(prev => Math.min(totalLetterPages, prev + 1))} 
        disabled={currentLetterPage === totalLetterPages} 
        variant="outline"
        className="w-full sm:w-auto"
      >
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
         <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 flex justify-center items-center min-h-[50vh]">
           <div className="text-center">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
             <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">Chargement du glossaire...</p>
           </div>
         </div>
      </main>
    );
  }

  return (
    <main className="flex-grow">
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {/* Retrait de la condition isLoading ici, car les données initiales sont synchrones */}
        {/* Le contenu s'affiche si selectedCategory est défini */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
          <Book className="h-6 w-6 sm:h-8 sm:w-8 mr-0 sm:mr-3 text-indigo-600 self-start sm:self-auto" />
          <h1 className="text-2xl sm:text-4xl font-bold">{t('title')}</h1>
        </div>
        <p className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed">{t('description')}</p>
        <CategoryBar />
        <AlphabetBar />
        {selectedLetter ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 break-words">
              {selectedLetter === '#' ? '#' : selectedLetter}
              <span className="ml-2 text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">
                ({groupedByLetter[selectedLetter]?.length || 0} termes)
              </span>
            </h2>
            {termsForSelectedLetter.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{t('noTermsFound')}</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 sm:space-y-4">
                  {termsForSelectedLetter.map(term => {
                    // console.log('[DEBUG] Rendering term for selectedLetter:', term); // Nettoyé
                    return (
                      <GlossaryTerm key={term.id} term={term.term} definition={term.definition} category={term.category} displayCategory={term.displayCategory} />
                    );
                  })}
                </div>
                <LetterPagination />
              </>
            )}
          </>
        ) : (
          <div className="space-y-8 sm:space-y-12">
            {LETTERS.concat(hasOther ? ['#'] : [])
              .filter(letter => groupedByLetter[letter]?.length > 0)
              .map(letter => {
                // console.log(`[DEBUG] Rendering letter section: ${letter}`, groupedByLetter[letter]); // Nettoyé
                return (
                  <div key={letter}>
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 break-words">
                      {letter}
                      <span className="ml-2 text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400">
                        ({groupedByLetter[letter].length} termes)
                      </span>
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
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