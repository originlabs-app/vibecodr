import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import type { PostFrontmatter } from '@/types/blog';
import BlogIndexClient from '@/components/blog/BlogIndexClient';
import JsonLdBreadcrumbs from '@/components/JsonLdBreadcrumbs';
import JsonLdCollectionPage from '@/components/JsonLdCollectionPage';
import Header from '@/components/Header';
import CustomFooter from '@/components/CustomFooter';
import { locales, defaultLocale } from '../../../../../../next-intl.config';

interface TagPageProps {
  params: Promise<{
    lang: string;
    tagSlug: string;
  }>;
}

export async function generateStaticParams({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const tags = getAllTags(lang);
  return tags.map(tag => ({ tagSlug: tag.slug }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { lang, tagSlug } = await params;
  const tags = getAllTags(lang);
  const tag = tags.find(t => t.slug === tagSlug);
  const tagName = tag ? tag.name : tagSlug;

  const t = await getTranslations({ locale: lang, namespace: 'BlogTags' });

  const currentPath = `/blog/tags/${tagSlug}`;
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach((loc: string) => {
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: t('tagTitle', { tagName }),
    description: t('tagDescription', { tagName }),
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { lang, tagSlug } = await params;
  const posts = getPostsByTag(tagSlug, lang);

  const tBlogTags = await getTranslations({ locale: lang, namespace: 'BlogTags' });
  const allTags = getAllTags(lang);
  const currentTag = allTags.find(t => t.slug === tagSlug);
  const tagName = currentTag ? currentTag.name : tagSlug;
  const tagPageDescription = tBlogTags('tagDescription', { tagName });

  const tGlobal = await getTranslations({ locale: lang, namespace: 'Global' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  
  const breadcrumbItems = [
    { name: tGlobal('homeBreadcrumb'), href: `/${lang}` },
    { name: tGlobal('blogBreadcrumb'), href: `/${lang}/blog` },
    { name: tagName, href: `/${lang}/blog/tags/${tagSlug}` },
  ];

  const collectionItems = posts.map(post => ({
    '@type': 'BlogPosting',
    name: post.title,
    headline: post.title,
    url: `/${lang}/blog/${post.slug}`,
    image: post.image,
    datePublished: new Date(post.date).toISOString(),
  }));

  const collectionPageUrl = `/${lang}/blog/tags/${tagSlug}`;

  return (
    <>
      <Header />
      <JsonLdBreadcrumbs items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLdCollectionPage 
        name={tagName} 
        description={tagPageDescription}
        url={collectionPageUrl}
        items={collectionItems} 
        baseUrl={baseUrl} 
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tag: {tagName}</h1>
        <BlogIndexClient posts={posts} lang={lang} />
      </div>
      <CustomFooter />
    </>
  );
} 