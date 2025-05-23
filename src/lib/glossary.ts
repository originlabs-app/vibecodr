import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';

export interface GlossaryTerm {
  slug: string;
  title: string;
  shortDefinition: string;
  fullDefinition: string;
  lang: string;
  category?: string; // Optionnel, si vous catégorisez vos termes de glossaire
  // d'autres champs si nécessaire, ex: relatedTerms: string[]
}

// Interface pour correspondre à la structure de vos fichiers glossary.{lang}.json
interface RawGlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
}

const DATA_DIR = path.join(process.cwd(), 'src', 'messages');

/**
 * Récupère tous les termes du glossaire pour une langue donnée.
 * Les données sont lues depuis les fichiers JSON dans src/messages.
 */
export const getAllGlossaryTerms = cache((lang: string): GlossaryTerm[] => {
  const filePath = path.join(DATA_DIR, `glossary.${lang}.json`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rawTerms = JSON.parse(fileContent) as RawGlossaryTerm[];

    return rawTerms.map(rawTerm => ({
      slug: rawTerm.id,
      title: rawTerm.term,
      shortDefinition: rawTerm.definition, // Utilise la définition complète pour shortDefinition
      fullDefinition: rawTerm.definition,
      lang: lang,
      category: rawTerm.category,
    }));
  } catch (error) {
    console.error(`Error reading or parsing glossary file for lang "${lang}":`, error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
});

/**
 * Récupère un terme spécifique du glossaire par son slug et sa langue.
 * Les données sont lues depuis les fichiers JSON dans src/messages.
 */
export function getGlossaryTermBySlug(slug: string, lang:string): GlossaryTerm | null {
  const terms = getAllGlossaryTerms(lang);
  const term = terms.find(t => t.slug === slug);
  return term || null;
}

/**
 * (Optionnel) Récupère toutes les catégories uniques du glossaire pour une langue donnée.
 * Utile pour generateStaticParams si vous avez des pages de catégories de glossaire.
 */
export function getAllGlossaryCategories(lang: string): Array<{ name: string; slug: string }> {
  const terms = getAllGlossaryTerms(lang);
  const categories = new Map<string, string>();
  terms.forEach(term => {
    if (term.category) {
      // Le slug de la catégorie peut être généré de manière plus robuste si nécessaire
      const categorySlug = term.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      if (!categories.has(categorySlug)) {
        categories.set(categorySlug, term.category);
      }
    }
  });
  return Array.from(categories, ([slug, name]) => ({ name, slug }));
} 