import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FromNocodeToProductionPage from './FromNocodeToProductionPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getMessages } from 'next-intl/server';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'FromNocodeToProductionPageMeta' });
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vibecodr.ai';
  const url = `${baseUrl}/${lang}/from-nocode-to-production`;
  
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
          url: `${baseUrl}/og-from-nocode-to-production.png`,
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
      images: [`${baseUrl}/og-from-nocode-to-production.png`],
    },
    alternates: {
      languages: {
        'fr': `${baseUrl}/fr/from-nocode-to-production`,
        'en': `${baseUrl}/en/from-nocode-to-production`,
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
  const { lang } = await params;
  const messages = await getMessages({ locale: lang });
  const faqTranslations = messages.FromNocodeToProduction?.faq?.items as Record<string, { question: string; answer: string }> | undefined;

  const faqItems = faqTranslations 
    ? Object.keys(faqTranslations).map(key => ({
        question: faqTranslations[key].question,
        answer: faqTranslations[key].answer,
      }))
    : [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      }
    }))
  };

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <FromNocodeToProductionPage />
      <Footer />
    </>
  );
} 