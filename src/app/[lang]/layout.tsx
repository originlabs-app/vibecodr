import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css"; // Ajustement du chemin vers globals.css
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { locales, defaultLocale } from '../../../next-intl.config';
import ClientProviders from "@/components/ClientProviders";
import StructuredData from "@/components/StructuredData";
import '../../styles/markdown-tables.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'Metadata' });
  const common = await getTranslations({ locale: lang, namespace: 'HeroSection' }); // Pour le nom du site si besoin
  const siteName = common("titleVibecodr"); // Utilise "vibecodr" du HeroSection comme nom de site
  const title = t('title');
  const description = t('description');
  // console.log(`[generateMetadata] Titre pour ${lang}: ${title}`);
  // console.log(`[generateMetadata] Description pour ${lang}: ${description}`);

  const currentPath = ""; // Pour la page d'accueil
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach(loc => {
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  const defaultOgImage = "/og-image-default.jpg"; // Changé en .jpg selon votre nom de fichier
  // Utiliser la même image pour Twitter Card
  const defaultTwitterImage = defaultOgImage; 

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai'),
    title: title,
    description: description,
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
    openGraph: {
      title: title,
      description: description,
      url: `/${lang}${currentPath}`,
      siteName: siteName, 
      images: [
        {
          url: defaultOgImage, 
          width: 1024, // Mis à jour
          height: 1024, // Mis à jour
          alt: `${siteName} - Open Graph Image`,
        },
      ],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US', // Format spécifique OG
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      // site: '@Vibecodr', // Décommentez et remplacez par votre pseudo Twitter
      // creator: '@YourCreatorHandle', // Décommentez et remplacez
      images: [defaultTwitterImage], // Utilise maintenant la même image que OG
    },
  };
}

// Générer les versions statiques pour chaque locale
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LangLayout({
  children,
  params: paramsProp, // Renommer le prop pour éviter la confusion
}: {
  children: React.ReactNode;
  params: { lang: string }; // La signature du type reste pour le prop tel que défini par Next.js
}) {
  // Attendre la résolution de l'objet params avant d'accéder à ses propriétés
  // Ceci est basé sur le message d'erreur de Next.js
  const resolvedParams = await paramsProp;
  const { lang } = resolvedParams;
  
  // Vérifier si la locale est valide
  if (!locales.includes(lang)) {
    console.error(`Tentative d'accès avec une locale invalide ou undefined: ${lang}`);
    throw new Error(`Locale non supportée: ${lang}`);
  }
  
  const messages = await getMessages({locale: lang});
  if (process.env.NODE_ENV === 'development') {
    console.warn('Messages chargés pour la locale', lang);
  }

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <StructuredData />
      <ClientProviders>
        {/* Optionnel: ajouter un div si besoin de styler spécifiquement le contenu de LangLayout */}
        {/* <div className="h-full"> */}
        {children}
        {/* </div> */}
      </ClientProviders>
    </NextIntlClientProvider>
  );
}
