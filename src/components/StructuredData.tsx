'use client'; // Peut être nécessaire si on utilise des hooks comme useLocale à l'avenir, sinon server component

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

const StructuredData = () => {
  const locale = useLocale();
  const tMetadata = useTranslations('Metadata');
  const tHero = useTranslations('HeroSection'); // Pour le nom du site

  const siteName = tHero("titleVibecodr");
  const pageTitle = tMetadata('title');
  const pageDescription = tMetadata('description');

  // Utilisation de NEXT_PUBLIC_SITE_URL comme défini par l'utilisateur
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai'; // Fallback si jamais la variable d'env n'est pas chargée
  const canonicalUrl = `${baseUrl}/${locale}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo-vibecodr-schema.png`, // IMPORTANT: Créez et placez cette image logo dans /public/
    sameAs: [
      'https://twitter.com/Vibecodr', // Remplacez par vos vrais liens
      'https://www.linkedin.com/company/vibecodr/' // Remplacez par vos vrais liens
    ],
    // Vous pouvez ajouter d'autres détails ici :
    // contactPoint: {
    //   '@type': 'ContactPoint',
    //   telephone: '+33-XXX-XXX-XXX', // Votre numéro de téléphone
    //   contactType: 'Customer Service'
    // }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    description: pageDescription, // Peut aussi être une description plus générale du site
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: organizationSchema.logo,
      },
    },
    // Permet la Sitelinks Search Box dans les résultats Google
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}` // Adaptez si vous avez une fonction de recherche
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: locale,
  };
  
  // Schema pour la page d'accueil actuelle (WebPage)
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: canonicalUrl,
    name: pageTitle, // Titre spécifique de la page d'accueil
    description: pageDescription, // Description spécifique de la page d'accueil
    isPartOf: {
        '@id': websiteSchema.url
    },
    publisher: {
        '@id': organizationSchema['@id']
    },
    inLanguage: locale,
    // datePublished: "2024-01-01T08:00:00+00:00", // Date de publication/mise à jour du contenu principal de la page d'accueil
    // dateModified: "2024-07-28T10:00:00+00:00",
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, websiteSchema, webPageSchema]) }}
    />
  );
};

export default StructuredData; 