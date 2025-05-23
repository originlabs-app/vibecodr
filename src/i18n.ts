import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales, defaultLocale} from './middleware'; // Importer les locales depuis le middleware

// Ces constantes sont la source de vérité pour les locales.
// Elles seront utilisées par le middleware et d'autres parties si nécessaire.
// export const localePrefix = 'as-needed'; // La configuration du préfixe est dans le middleware

export default getRequestConfig(async ({locale}) => {
  // Si la locale est undefined, utiliser la locale par défaut
  const currentLocale = locale || defaultLocale;
  
  // Vérifier si la locale est supportée
  if (!locales.includes(currentLocale)) {
    console.error(`Locale non supportée dans getRequestConfig: ${currentLocale}`);
    return notFound();
  }
  
  try {
    // Charger les messages pour la locale courante
    return {
      locale: currentLocale,
      messages: (await import(`../src/messages/${currentLocale}.json`)).default
    };
  } catch (error) {
    console.error(`ERREUR: Impossible de charger les messages pour la locale "${currentLocale}" depuis ../src/messages/${currentLocale}.json:`, error);
    
    // En cas d'erreur, essayer de charger les messages pour la locale par défaut
    if (currentLocale !== defaultLocale) {
      try {
        return {
          locale: defaultLocale,
          messages: (await import(`../src/messages/${defaultLocale}.json`)).default
        };
      } catch (fallbackError) {
        console.error(`ERREUR CRITIQUE: Impossible de charger les messages pour la locale par défaut:`, fallbackError);
      }
    }
    
    // Si tout échoue, renvoyer une page 404
    return notFound();
  }
}); 