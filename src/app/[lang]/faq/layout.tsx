import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, defaultLocale } from '../../../../next-intl.config'; // Ajustez le chemin si nécessaire

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'FaqPage' }); // Assurez-vous que ce namespace et les clés existent

  const currentPath = "/faq";
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach(loc => {
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: t('metaTitle'), // ex: "FAQ - Vibecodr" ou traduit depuis vos fichiers json
    description: t('metaDescription'), // ex: "Trouvez les réponses à vos questions fréquentes sur Vibecodr." ou traduit
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
  };
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Layout simple qui passe juste les enfants
} 