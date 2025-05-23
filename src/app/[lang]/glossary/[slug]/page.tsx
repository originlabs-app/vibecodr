import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getGlossaryTermBySlug, getAllGlossaryTerms } from '@/lib/glossary'; // getAllGlossaryTerms pour generateStaticParams
import type { GlossaryTerm } from '@/lib/glossary';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLdBreadcrumbs from '@/components/JsonLdBreadcrumbs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
// Possible d'importer locales et defaultLocale si on veut ajouter des alternates plus tard
// import { locales, defaultLocale } from '../../../../../next-intl.config';

interface GlossaryTermPageProps {
  params: {
    lang: string;
    slug: string;
  };
}

// Générer les chemins statiques pour chaque terme du glossaire
export async function generateStaticParams({ params: { lang } }: { params: { lang: string } }) {
  const terms = getAllGlossaryTerms(lang);
  return terms.map(term => ({ slug: term.slug }));
}

// Générer les métadonnées pour la page du terme
export async function generateMetadata({ params }: GlossaryTermPageProps) {
  const { lang, slug } = await params;
  const term = getGlossaryTermBySlug(slug, lang);

  if (!term) {
    return {
      title: 'Terme non trouvé',
      description: 'Ce terme du glossaire n\'existe pas ou a été déplacé.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  const termUrl = `${baseUrl}/${lang}/glossary/${slug}`;

  // TODO: Si les termes du glossaire ont des traductions directes (ex: via un translationKey),
  // ajouter ici la logique pour alternates.languages similaire à celle des articles de blog.
  // Pour l'instant, on définit uniquement le canonical.
  // const alternatesLanguages: { [key: string]: string } = {};
  // locales.forEach((loc: string) => { ... });
  // alternatesLanguages['x-default'] = ...;

  return {
    title: `${term.title} | Glossaire Vibecodr`,
    description: term.shortDefinition, 
    alternates: {
      canonical: termUrl,
      // languages: alternatesLanguages, // Décommenter si les traductions sont gérées
    },
    // keywords: [term.title, term.category, ...], // Optionnel
  };
}

// JSON-LD spécifique pour le DefinedTerm
const JsonLdDefinedTerm: React.FC<{ term: GlossaryTerm; baseUrl: string; lang: string }> = ({ term, baseUrl, lang }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.fullDefinition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Glossaire Vibecodr', // Nom de votre glossaire
      url: `${baseUrl}/${lang}/glossary`,
    },
    url: `${baseUrl}/${lang}/glossary/${term.slug}`,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default async function GlossaryTermPage({ params }: GlossaryTermPageProps) {
  const { lang, slug } = await params;
  const term = getGlossaryTermBySlug(slug, lang);

  if (!term) {
    notFound();
  }

  const tGlobal = await getTranslations({ locale: lang, namespace: 'Global' });
  const tGlossaryPage = await getTranslations({ locale: lang, namespace: 'GlossaryPage' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';

  const breadcrumbItems = [
    { name: tGlobal('homeBreadcrumb'), href: `/${lang}` },
    { name: tGlossaryPage('title'), href: `/${lang}/glossary` },
    { name: term.title, href: `/${lang}/glossary/${term.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header />
      <JsonLdBreadcrumbs items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLdDefinedTerm term={term} baseUrl={baseUrl} lang={lang} />

      <main className="flex-grow container mx-auto px-4 py-12 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href={`/${lang}/glossary`} className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {tGlossaryPage('return')}
            </Link>
          </div>

          <article className="prose dark:prose-invert lg:prose-lg max-w-none">
            <h1>{term.title}</h1>
            {term.category && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tGlossaryPage('categoryLabel')}: {term.category} {/* TODO: Traduire potentiellement la valeur de term.category si ce sont des slugs */}
              </p>
            )}
            <p>{term.fullDefinition}</p>
            {/* Vous pourriez ajouter ici des sections pour les termes liés, etc. */}
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
} 