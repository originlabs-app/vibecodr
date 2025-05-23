import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, defaultLocale } from '../../../../next-intl.config';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const t = await getTranslations({ locale: lang, namespace: 'FaqPageMeta' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  const currentPath = `/faq`;
  const canonical = `${baseUrl}/${lang}${currentPath}`;

  const alternates: Record<string, string> = {};
  locales.forEach((l) => {
    alternates[l] = `${baseUrl}/${l}${currentPath}`;
  });
  alternates['x-default'] = `${baseUrl}/${defaultLocale}${currentPath}`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonical,
      siteName: 'Vibecodr',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description: t('description'),
    },
  };
} 