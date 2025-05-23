import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Assurez-vous que NEXT_PUBLIC_SITE_URL est défini dans vos variables d'environnement
  // et qu'il correspond à l'URL de base de votre site en production.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.votresite.com'; 

  return {
    rules: [ // La propriété 'rules' doit être un tableau d'objets
      {
        userAgent: '*',
        allow: '/',
        // Exemple: pour interdire l'accès à un dossier spécifique
        // disallow: '/admin/', 
      }
      // Vous pouvez ajouter d'autres règles pour des user-agents spécifiques si nécessaire
      // {
      //   userAgent: 'Googlebot-Image',
      //   disallow: ['/images/confidentielles/'],
      // }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // host: siteUrl, // La directive host n'est plus officiellement supportée par Google, mais certains l'utilisent encore.
  }
} 