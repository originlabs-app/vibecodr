import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import MvpDevelopmentPage from './MvpDevelopmentPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'MvpDevelopmentPageMeta' });
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vibecodr.ai';
  const url = `${baseUrl}/${lang}/mvp-development`;
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Vibecodr',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-mvp-development.png`,
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-mvp-development.png`],
    },
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/mvp-development`,
        'en': `${baseUrl}/en/mvp-development`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function Page({ params }: Props) {
  return (
    <>
      <Header />
      <MvpDevelopmentPage />
      <Footer />
    </>
  );
} 