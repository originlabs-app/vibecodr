'use client';

import React from 'react';
import { useLocale } from 'next-intl'; // useTranslations n'est pas nécessaire ici si tout vient des props

// Assurez-vous que ce chemin d'importation est correct
// et que l'interface PostFrontmatter est définie comme à l'Étape 1.
import type { PostFrontmatter } from '@/types/blog'; 

interface StructuredBlogPostingProps {
  post: PostFrontmatter;
  // lang n'est plus nécessaire ici si déjà dans post.lang et pour l'URL canonique
}

const StructuredBlogPosting: React.FC<StructuredBlogPostingProps> = ({ post }) => {
  const locale = useLocale(); // Pour s'assurer que la langue est correcte pour l'URL canonique
  const siteName = "Vibecodr"; // Ou récupérez-le dynamiquement si vous l'avez dans les traductions globales
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  const articleUrl = `${baseUrl}/${post.lang}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`; // Assurez-vous que post.image commence par / si local
  const organizationLogoUrl = `${baseUrl}/logo-vibecodr-schema.png`; // Doit exister dans /public/

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    headline: post.title,
    name: post.title, // Recommandé d'avoir name en plus de headline
    description: post.description,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      // Idéalement, fournissez width et height si vous les connaissez
      // width: 1200, 
      // height: 630,
    },
    datePublished: new Date(post.date).toISOString(),
    // dateModified: post.lastModified ? new Date(post.lastModified).toISOString() : new Date(post.date).toISOString(),
    author: {
      '@type': (post.author === "VibeCodr" || post.author === "Vibecodr") ? 'Organization' : 'Person',
      name: post.author,
      // Si l'auteur est l'organisation Vibecodr, on peut lier à son @id
      url: (post.author === "VibeCodr" || post.author === "Vibecodr") ? baseUrl : undefined, // Ou une page auteur spécifique si Person
    },
    publisher: {
      '@type': 'Organization',
      name: siteName, // Le nom de votre site/entreprise
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: organizationLogoUrl,
        // width: 200, // Dimensions de votre logo-vibecodr-schema.png
        // height: 60,
      },
    },
    keywords: post.tags ? post.tags.join(', ') : undefined,
    articleSection: post.category,
    inLanguage: post.lang,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
    />
  );
};

export default StructuredBlogPosting; 