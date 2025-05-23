import { getAllPostsMetadata } from '@/lib/blog';
import { getTranslations } from 'next-intl/server';
import BlogIndexClient from '@/components/blog/BlogIndexClient';
import JsonLdBreadcrumbs from '@/components/JsonLdBreadcrumbs';
import JsonLdCollectionPage from '@/components/JsonLdCollectionPage';
import { locales, defaultLocale } from '../../../../next-intl.config';

interface BlogIndexPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: BlogIndexPageProps) {
  const { lang } = await params;
  const tPage = await getTranslations({ locale: lang, namespace: 'BlogIndexPage' });

  const currentPath = "/blog";
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach((loc: string) => {
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: tPage('metaTitle'),
    description: tPage('metaDescription'),
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
  };
}

// Composant de page Server Component
export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { lang } = await params;
  const posts = getAllPostsMetadata(lang);
  const tGlobal = await getTranslations({ locale: lang, namespace: 'Global' });
  const tBlogIndex = await getTranslations({ locale: lang, namespace: 'BlogIndex' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  const breadcrumbItems = [
    { name: tGlobal('homeBreadcrumb'), href: `/${lang}` },
    { name: tGlobal('blogBreadcrumb'), href: `/${lang}/blog` },
  ];

  const collectionName = tBlogIndex('title');
  const collectionDescription = tBlogIndex('description');
  const collectionPageUrl = `/${lang}/blog`;

  const collectionItems = posts.map(post => ({
    '@type': 'BlogPosting',
    name: post.title,
    headline: post.title,
    url: `/${lang}/blog/${post.slug}`,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
  }));
  
  return (
    <>
      <JsonLdBreadcrumbs items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLdCollectionPage 
        name={collectionName}
        description={collectionDescription}
        url={collectionPageUrl}
        items={collectionItems}
        baseUrl={baseUrl}
      />
      <BlogIndexClient posts={posts} lang={lang} />
    </>
  );
} 