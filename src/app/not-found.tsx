import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">404 – Page non trouvée</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Oups&nbsp;! La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Button asChild>
        <Link href="/">Retour à la page d&apos;accueil</Link>
      </Button>
    </div>
  );
} 