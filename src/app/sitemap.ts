import { MetadataRoute } from 'next';
// L'importation suivante suppose que next-intl.config.ts est à la racine de votre projet
// et que ce fichier sitemap.ts est dans src/app/
import { locales, defaultLocale } from '../../next-intl.config'; 
import { getAllPostsMetadata, getAllCategories, getAllTags } from '@/lib/blog'; // Assurez-vous que les fonctions pour tags/categories existent
import { getAllGlossaryTerms } from '@/lib/glossary'; // Ajout de l'import pour le glossaire

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  // On ne liste que les pages statiques réellement prêtes et avec du contenu
  const staticPagesReady = [
    '', // Page d'accueil
    '/vision-first',
    '/mvp-development', // Nouvelle page MVP Development
    '/from-nocode-to-production', // Nouvelle page pour les développeurs no-code
    '/bolt-lovable-replit-limits', // Page de redirection SEO
    '/faq',
    '/glossary',
    '/legal' // Page légale maintenant prête
    // '/contact', // Exclue temporairement
    // '/legal'    // Exclue temporairement
    // Si /marketplace a une page dédiée vide, l'exclure aussi.
    // Si /marketplace est juste une section de la page d'accueil, pas besoin de la lister ici.
  ]; 
  const blogPage = '/blog'; // On suppose que l'index du blog est toujours prêt

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Pages statiques prêtes et page principale du blog pour chaque langue
  locales.forEach((lang: string) => {
    staticPagesReady.forEach(page => { // Utilise staticPagesReady
      sitemapEntries.push({
        url: `${BASE_URL}/${lang}${page}`,
        lastModified: new Date(), 
        changeFrequency: page === '' || page === '/glossary' ? 'weekly' : 'monthly', 
        priority: page === '' ? 1 : (page === '/mvp-development' || page === '/from-nocode-to-production' ? 0.9 : (page === '/glossary' || page === '/bolt-lovable-replit-limits' ? 0.8 : 0.7)),
      });
    });
    // Page principale du blog
    sitemapEntries.push({
      url: `${BASE_URL}/${lang}${blogPage}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Articles de blog pour chaque langue
  locales.forEach((lang: string) => {
    const posts = getAllPostsMetadata(lang);
    posts.forEach(post => {
      sitemapEntries.push({
        url: `${BASE_URL}/${lang}/blog/${post.slug}`,
        lastModified: post.lastModified ? new Date(post.lastModified) : new Date(post.date),
        changeFrequency: 'yearly', // Ou 'never' si le contenu est très statique après publication
        priority: 0.7,
      });
    });
  });

  // Pages de catégories pour chaque langue
  locales.forEach((lang: string) => {
    const categories = getAllCategories(lang);
    categories.forEach(category => {
      sitemapEntries.push({
        url: `${BASE_URL}/${lang}/blog/categories/${category.slug}`,
        lastModified: new Date(), // Pourrait être la date du dernier post de la catégorie
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });
  });

  // Pages de tags pour chaque langue
  locales.forEach((lang: string) => {
    const tags = getAllTags(lang);
    tags.forEach(tag => {
      sitemapEntries.push({
        url: `${BASE_URL}/${lang}/blog/tags/${tag.slug}`,
        lastModified: new Date(), // Pourrait être la date du dernier post avec ce tag
        changeFrequency: 'weekly',
        priority: 0.5,
      });
    });
  });

  // Termes du glossaire pour chaque langue
  locales.forEach((lang: string) => {
    const terms = getAllGlossaryTerms(lang);
    terms.forEach(term => {
      sitemapEntries.push({
        url: `${BASE_URL}/${lang}/glossary/${term.slug}`,
        lastModified: new Date(), // Idéalement, la date de dernière modification du terme si disponible
        changeFrequency: 'yearly', // Les définitions changent moins souvent
        priority: 0.6, 
      });
    });
  });

  // Gestion de la page par défaut (ex: / -> /fr)
  // Si votre middleware redirige déjà / vers /${defaultLocale}, 
  // vous pourriez ne pas avoir besoin d'une entrée distincte pour BASE_URL seul.
  // Cependant, il est souvent bon d'avoir une entrée pour la racine.
  sitemapEntries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    // Si vous utilisez hreflang dans le sitemap (plus complexe, Next.js le gère via generateMetadata)
    // alternates: {
    //   languages: locales.reduce((acc, lang) => {
    //     acc[lang] = `${BASE_URL}/${lang}`;
    //     return acc;
    //   }, {} as Record<string, string>)
    // }
  });

  return sitemapEntries;
} 