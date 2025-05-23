import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { locales, defaultLocale } from '../../../../next-intl.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LegalPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'LegalPage' });

  const currentPath = "/legal";
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach((loc: string) => {
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'LegalPage' });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">
              {t('title')}
            </h1>
            
            {/* Mentions légales */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t('legal.title')}</h2>
              
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3>{t('legal.publisher.title')}</h3>
                <p>
                  <strong>{t('legal.publisher.company')}:</strong> Vibecodr<br />
                  <strong>{t('legal.publisher.status')}:</strong> {t('legal.publisher.statusValue')}<br />
                  <strong>{t('legal.publisher.address')}:</strong> France<br />
                  <strong>{t('legal.publisher.email')}:</strong> contact@vibecodr.ai
                </p>

                <h3>{t('legal.hosting.title')}</h3>
                <p>
                  <strong>{t('legal.hosting.provider')}:</strong> Vercel Inc.<br />
                  <strong>{t('legal.hosting.address')}:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                  <strong>{t('legal.hosting.website')}:</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
                </p>

                <h3>{t('legal.intellectual.title')}</h3>
                <p>{t('legal.intellectual.content')}</p>

                <h3>{t('legal.liability.title')}</h3>
                <p>{t('legal.liability.content')}</p>
              </div>
            </section>

            {/* Politique de confidentialité */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t('privacy.title')}</h2>
              
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h3>{t('privacy.intro.title')}</h3>
                <p>{t('privacy.intro.content')}</p>

                <h3>{t('privacy.dataCollection.title')}</h3>
                <p>{t('privacy.dataCollection.content')}</p>
                <ul>
                  <li>{t('privacy.dataCollection.email')}</li>
                  <li>{t('privacy.dataCollection.name')}</li>
                  <li>{t('privacy.dataCollection.preferences')}</li>
                </ul>

                <h3>{t('privacy.dataUsage.title')}</h3>
                <p>{t('privacy.dataUsage.content')}</p>
                <ul>
                  <li>{t('privacy.dataUsage.newsletter')}</li>
                  <li>{t('privacy.dataUsage.updates')}</li>
                  <li>{t('privacy.dataUsage.improvements')}</li>
                </ul>

                <h3>{t('privacy.dataSharing.title')}</h3>
                <p>{t('privacy.dataSharing.content')}</p>

                <h3>{t('privacy.rights.title')}</h3>
                <p>{t('privacy.rights.content')}</p>
                <ul>
                  <li>{t('privacy.rights.access')}</li>
                  <li>{t('privacy.rights.rectification')}</li>
                  <li>{t('privacy.rights.deletion')}</li>
                  <li>{t('privacy.rights.portability')}</li>
                </ul>

                <h3>{t('privacy.contact.title')}</h3>
                <p>{t('privacy.contact.content')}</p>
              </div>
            </section>

            <div className="text-sm text-muted-foreground">
              <p>{t('lastUpdated', { date: new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US') })}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 