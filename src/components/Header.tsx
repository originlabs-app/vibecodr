'use client'; // Nécessaire car utilise useState et des interactions client

import React from 'react';
import Link from 'next/link'; // Changement ici
import { Button } from '@/components/ui/button'; // Assurez-vous que ce chemin est correct après installation de shadcn/ui
import { Menu, X, BookOpen, Store, MessageSquare, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Assurez-vous que ce chemin est correct
import { useParams, useRouter, usePathname } from 'next/navigation'; // usePathname ajouté
import { useTranslations } from 'next-intl'; // Ajout de useTranslations

// TODO: Déplacer les constantes de liens dans un fichier de configuration ou de constantes
const navLinks = [
  { href: '/vision-first', labelKey: 'visionFirst', icon: null },
  // { href: '/marketplace', labelKey: 'marketplace', icon: Store }, // Mis en attente
  // { href: '/academy', labelKey: 'academy', icon: BookOpen }, // Mis en attente
  { href: '/blog', labelKey: 'blog', icon: null },
  { href: '/faq', labelKey: 'faq', icon: MessageSquare },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); // Pour obtenir le chemin actuel sans la locale
  const t = useTranslations('Header'); // Initialisation de useTranslations pour le namespace "Header"

  const currentLang = params.lang as string || 'fr';

  const changeLanguage = (newLang: string) => {
    let currentPathWithoutLocale = pathname;
    if (pathname.startsWith(`/${currentLang}`)) {
      currentPathWithoutLocale = pathname.substring(`/${currentLang}`.length) || '/';
    }

    // Si nous sommes sur une page d'article de blog, rediriger vers la page principale du blog de la nouvelle langue
    if (currentPathWithoutLocale.startsWith('/blog/') && currentPathWithoutLocale.length > '/blog/'.length) { // Vérifie qu'on est sur un article et non /blog/
      router.push(`/${newLang}/blog${window.location.search}`);
    } else {
      router.push(`/${newLang}${currentPathWithoutLocale}${window.location.search}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 py-2 bg-transparent">
        <div className="flex items-center">
          <Link href={`/${currentLang}`} className="flex items-center">
            <span className="text-2xl font-bold text-gradient">vibecodr</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.labelKey}
              href={`/${currentLang}${link.href}`}
              className="text-sm font-medium text-foreground/70 hover:text-primary dark:text-foreground/70 dark:hover:text-primary transition-colors flex items-center gap-1"
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {t(link.labelKey)} {/* Utilisation de la traduction */}
            </Link>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {currentLang.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32"> {/* Augmentation légère de la largeur */}
              <DropdownMenuItem onClick={() => changeLanguage('fr')} className={currentLang === 'fr' ? 'font-semibold bg-muted' : ''}>
                FR Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={currentLang === 'en' ? 'font-semibold bg-muted' : ''}>
                EN English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center gap-2">
            <Link href={`/${currentLang}/auth`}>
              <Button variant="outline" size="sm">{t('login')}</Button>
            </Link>
            <Link href={`/${currentLang}/auth?tab=signup`}>
              <Button size="sm">{t('signup')}</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" aria-label={t('languageSelector')}>
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => changeLanguage('fr')} className={currentLang === 'fr' ? 'font-semibold bg-muted' : ''}>
                FR Français
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('en')} className={currentLang === 'en' ? 'font-semibold bg-muted' : ''}>
                EN English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="h-9 w-9"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 right-0 z-40 bg-background shadow-lg py-4 flex flex-col space-y-1 border-b border-border md:hidden">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.labelKey}`}
              href={`/${currentLang}${link.href}`}
              className="px-6 py-3 text-foreground/90 hover:bg-muted hover:text-primary flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="flex flex-col space-y-2 px-6 pt-3 mt-2 border-t border-border">
            <Link href={`/${currentLang}/auth`} onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">{t('login')}</Button>
            </Link>
            <Link href={`/${currentLang}/auth?tab=signup`} onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">{t('signup')}</Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header; 