import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLdBreadcrumbs from '@/components/JsonLdBreadcrumbs';
import JsonLdCollectionPage from '@/components/JsonLdCollectionPage';
import { getAllGlossaryTerms } from '@/lib/glossary';
import type { GlossaryTerm as GlossaryTermTypeFromLib } from '@/lib/glossary';
import { getTranslations } from 'next-intl/server';
import GlossaryPageClient from '@/components/glossary/GlossaryPageClient';
import { locales, defaultLocale } from '../../../../next-intl.config';

// ==============================================
// METADATA GENERATION (SERVER)
// ==============================================
interface GlossaryPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: GlossaryPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'GlossaryPage' });

  const currentPath = "/glossary";
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach((loc: string) => {
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: t('title') + " | Vibecodr",
    description: t('description'),
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
  };
}

// ==============================================
// SERVER COMPONENT (Wrapper)
// ==============================================
export default async function GlossaryPage({ params: paramsPromise }: { params: Promise<GlossaryPageProps['params']> }) {
  const { lang } = await paramsPromise;
  const termsFromLib = getAllGlossaryTerms(lang);
  
  const tGlobal = await getTranslations({ locale: lang, namespace: 'Global' });
  const tGlossaryPage = await getTranslations({ locale: lang, namespace: 'GlossaryPage' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';

  const breadcrumbItems = [
    { name: tGlobal('homeBreadcrumb'), href: `/${lang}` },
    { name: tGlossaryPage('title'), href: `/${lang}/glossary` },
  ];

  const collectionItems = termsFromLib.map((term: GlossaryTermTypeFromLib) => ({
    '@type': 'DefinedTerm',
    name: term.title,
    description: term.shortDefinition,
    url: `/${lang}/glossary/${term.slug}`,
  }));

  const collectionPageUrl = `/${lang}/glossary`;
  const collectionName = tGlossaryPage('title');
  const collectionDescription = tGlossaryPage('description');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header />
      <JsonLdBreadcrumbs items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLdCollectionPage 
        name={collectionName}
        description={collectionDescription}
        url={collectionPageUrl}
        items={collectionItems} 
        baseUrl={baseUrl} 
      />
      <GlossaryPageClient initialTerms={termsFromLib} />
      <Footer />
    </div>
  );
} 