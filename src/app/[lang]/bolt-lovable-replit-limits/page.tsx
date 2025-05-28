import { redirect } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  const title = lang === 'fr' 
    ? "Limites de Bolt, Lovable, Replit : Solutions et Alternatives | VibeCodr"
    : "Bolt, Lovable, Replit Limitations: Solutions & Alternatives | VibeCodr";
    
  const description = lang === 'fr'
    ? "Découvrez les limites de Bolt, Lovable et Replit : backend insuffisant, problèmes de scalabilité, sécurité limitée. VibeCodr offre la solution pour passer en production."
    : "Discover Bolt, Lovable and Replit limitations: insufficient backend, scalability issues, limited security. VibeCodr provides the solution to go to production.";
  
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BoltLovableReplitLimitsPage({ params }: Props) {
  const { lang } = await params;
  redirect(`/${lang}/from-nocode-to-production`);
} 