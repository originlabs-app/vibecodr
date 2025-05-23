'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  title: string;
  // L'URL sera récupérée côté client
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const t = useTranslations('BlogPost');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // S'assurer que window est défini (côté client)
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopyLink = () => {
    if (currentUrl) {
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          toast.success(t('linkCopied'));
        })
        .catch(err => {
          console.error('Failed to copy link: ', err);
          toast.error(t('linkCopyFailed'));
        });
    }
  };

  if (!currentUrl) {
    return null; // Ou un placeholder de chargement
  }

  return (
    <div className="my-8 py-6 border-t border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4 text-center">{t('shareArticleTitle')}</h3>
      <div className="flex justify-center items-center space-x-3">
        <TwitterShareButton url={currentUrl} title={title}>
          <TwitterIcon size={36} round />
        </TwitterShareButton>

        <FacebookShareButton url={currentUrl} title={title} hashtag={`#${title.split(' ').join('')}`}>
          <FacebookIcon size={36} round />
        </FacebookShareButton>

        <LinkedinShareButton url={currentUrl} title={title} summary={title}> {/* summary peut être la description de l'article si disponible */}
          <LinkedinIcon size={36} round />
        </LinkedinShareButton>

        <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label={t('copyLinkTooltip')}>
          <Copy className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
} 