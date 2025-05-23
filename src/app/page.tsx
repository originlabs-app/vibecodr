import { redirect } from 'next/navigation';
import { defaultLocale } from '../middleware';

// Rediriger vers la locale par défaut
export default function RootPage() {
  redirect(`/${defaultLocale}`);
} 