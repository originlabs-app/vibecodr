import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Définir les locales supportées et la locale par défaut
export const locales = ['fr', 'en'];
export const defaultLocale = 'en';
export const localePrefix = 'as-needed'; // 'always', 'never' ou 'as-needed'

// Créer le middleware d'internationalisation
export default createMiddleware({
  // Locales supportées
  locales,
  
  // Locale par défaut
  defaultLocale,
  
  // Configuration du préfixe de locale
  localePrefix
});

// Configurer les chemins à intercepter par le middleware
export const config = {
  // Matcher pour les chemins internationaux
  // Exclut les chemins API, _next, etc.
  matcher: [
    // Matcher tous les chemins sauf ceux qui commencent par:
    '/((?!api|_next|_vercel|.*\\..*).*)' 
  ]
}; 