'use client'; // Nécessaire pour useParams

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface FooterLink {
  key: string; // Pour la traduction du nom
  href: string;
  isExternal?: boolean;
  disabled?: boolean; // Ajout pour gérer les liens non actifs
}

interface FooterProps {
  additionalLinks?: FooterLink[];
}

type TranslateFn = (key: string, vars?: Record<string, string | number | Date>) => string;

const FooterNavLinks: React.FC<{ title: string; links: FooterLink[]; currentLang: string; t: TranslateFn }> = ({ title, links, currentLang, t }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.key}>
          {link.disabled ? (
            <span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">{t(link.key)} (bientôt)</span>
          ) : link.isExternal || link.href.startsWith('#') && link.href !== '#' ? (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              {t(link.key)}
            </a>
          ) : link.href === '#' ? (
             <span className="text-gray-400 dark:text-gray-500 cursor-not-allowed">{t(link.key)} (bientôt)</span>
          ) : (
            <Link href={`/${currentLang}${link.href}`} className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
              {t(link.key)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC<FooterProps> = ({ additionalLinks = [] }) => {
  const params = useParams();
  const currentLang = params.lang as string || 'fr';
  const t = useTranslations('Footer');

  const productLinks: FooterLink[] = [
    { key: "product.visionFirst", href: "#vision-first" },
    { key: "product.marketplace", href: "#", disabled: true },
    { key: "product.pricing", href: "#", disabled: true },
    { key: "product.testimonials", href: "#", disabled: true },
    { key: "product.faq", href: "/faq" },
    ...additionalLinks.map(link => ({ ...link, key: `additional.${link.key}`})),
  ];

  const resourceLinks: FooterLink[] = [
    { key: "resources.blog", href: "/blog" },
    { key: "resources.glossary", href: "/glossary" },
    { key: "resources.knowledgeBase", href: "#", disabled: true },
    { key: "resources.community", href: "#", disabled: true },
    { key: "resources.support", href: "#", disabled: true },
    { key: "resources.apiDocs", href: "#", disabled: true },
  ];

  const companyLinks: FooterLink[] = [
    { key: "company.about", href: "#", disabled: true },
    { key: "company.careers", href: "#", disabled: true },
    { key: "company.partners", href: "#", disabled: true },
    { key: "company.contact", href: "#", disabled: true },
    { key: "company.legal", href: "/legal" },
  ];

  // Mettez vos vraies URLs ici
  const twitterUrl = "#"; // Exemple: "https://twitter.com/vibecodr";
  const linkedinUrl = "#"; // Exemple: "https://linkedin.com/company/vibecodr";

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-border">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Link href={`/${currentLang}`} className="flex items-center">
                <span className="text-2xl font-bold text-gradient">vibecodr</span>
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('tagline')}
            </p>
            <div className="flex space-x-4">
              {twitterUrl !== "#" ? (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label={t('socials.twitter')} className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                  <span className="sr-only">{t('socials.twitter')}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              ) : (
                <span className="text-gray-400 dark:text-gray-500 cursor-not-allowed" aria-label={t('socials.twitter') + " (bientôt disponible)"}>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </span>
              )}
              {linkedinUrl !== "#" ? (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={t('socials.linkedin')} className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                  <span className="sr-only">{t('socials.linkedin')}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              ) : (
                <span className="text-gray-400 dark:text-gray-500 cursor-not-allowed" aria-label={t('socials.linkedin') + " (bientôt disponible)"}>
                   <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </span>
              )}
            </div>
          </div>
          <FooterNavLinks title={t('navSections.product')} links={productLinks} currentLang={currentLang} t={t} />
          <FooterNavLinks title={t('navSections.resources')} links={resourceLinks} currentLang={currentLang} t={t} />
          <FooterNavLinks title={t('navSections.company')} links={companyLinks} currentLang={currentLang} t={t} />
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={`/${currentLang}/legal`} className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
              {t('legal.notice')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 