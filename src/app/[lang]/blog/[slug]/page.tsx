// src/app/[lang]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image'; // Assurez-vous que cet import est présent

import { getPostBySlug, getAllPostSlugs, getTranslatedPosts } from '@/lib/blog';
import type { Post } from '@/types/blog'; // N'importez que ce qui est utilisé
import StructuredBlogPosting from '@/components/StructuredBlogPosting';
import Header from '@/components/Header';
import CustomFooter from '@/components/CustomFooter';
import { ArrowLeft, Calendar, User } from 'lucide-react'; // Retirez les imports non utilisés
import { Badge } from '@/components/ui/badge';
import JsonLdBreadcrumbs from '@/components/JsonLdBreadcrumbs';

// Importation des composants MDX personnalisés
import { mdxTableComponents } from '@/components/mdx/MdxTable';
import remarkGfm from 'remark-gfm';

// Fonction pour obtenir la couleur de la catégorie (peut être centralisée)
const getCategoryColor = (category: string | undefined): string => {
  if (!category) return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  const categoryKey = category.toLowerCase().replace(/\s+/g, '-');
  const categoryColors: Record<string, string> = {
    "technologie-ia": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "ai-technology": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "stratégie-d'entreprise": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "business-strategy": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "intelligence-artificielle": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "artificial-intelligence": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  };
  return categoryColors[categoryKey] || "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, lang);

  if (!post) {
    return {
      title: "Article non trouvé - Vibecodr Blog",
      description: "L'article que vous cherchez n'existe pas ou a été déplacé.",
    };
  }

  const siteName = "Vibecodr";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  const articleUrl = `${baseUrl}/${lang}/blog/${post.slug}`;
  const imageUrl = post.image && typeof post.image === 'string'
    ? (post.image.startsWith('http') ? post.image : `${baseUrl}${post.image.startsWith('/') ? post.image : '/' + post.image}`)
    : `${baseUrl}/og-image-default.jpg`;

  const alternates: { [key: string]: string } = {};
  if (post.translationKey) {
    const translatedPosts = getTranslatedPosts(post.translationKey, post.slug, post.lang);
    translatedPosts.forEach(translatedPost => {
      if (translatedPost && translatedPost.lang && translatedPost.slug) {
        alternates[translatedPost.lang] = `${baseUrl}/${translatedPost.lang}/blog/${translatedPost.slug}`;
      }
    });
  }

  return {
    title: `${post.title} | ${siteName}`,
    description: post.description,
    keywords: post.tags?.join(', '),
    alternates: {
      canonical: articleUrl,
      languages: Object.keys(alternates).length > 0 ? alternates : undefined,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: articleUrl,
      siteName: siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: post.lastModified ? new Date(post.lastModified).toISOString() : new Date(post.date).toISOString(),
      authors: post.author ? [{ name: post.author }] : undefined,
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      // site: '@Vibecodr',
      // creator: '@auteurHandle',
    },
  };
}

export async function generateStaticParams({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const slugs = getAllPostSlugs(lang);
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug, lang);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale: lang, namespace: 'BlogPost' });
  const tGlobal = await getTranslations({ locale: lang, namespace: 'Global' });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';

  // Construction des miettes de pain
  const breadcrumbItems = [
    { name: tGlobal('homeBreadcrumb'), href: `/${lang}` },
    { name: tGlobal('blogBreadcrumb'), href: `/${lang}/blog` },
  ];
  if (post.category) {
    breadcrumbItems.push({
      name: post.category,
      href: `/${lang}/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`,
    });
  }
  breadcrumbItems.push({ name: post.title, href: `/${lang}/blog/${post.slug}` });

  return (
    <>
      <Header />
      <StructuredBlogPosting post={post} />
      <JsonLdBreadcrumbs items={breadcrumbItems} baseUrl={baseUrl} />
      
      <main className="flex-grow bg-white dark:bg-gray-950 pt-8 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href={`/${lang}/blog`} className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors font-medium">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('backToBlog')}
              </Link>
            </div>
            
            <article>
              <header className="mb-8">
                {post.category && (
                  <Link href={`/${lang}/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:no-underline mb-3 inline-block">
                    <Badge variant="outline" className={`text-xs font-medium ${getCategoryColor(post.category)} border-current px-2.5 py-1`}>
                      {post.category}
                    </Badge>
                  </Link>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight tracking-tight">
                  {post.title}
                </h1>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {post.author && (
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                    <span>{new Date(post.date).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  {/* A décommenter si vous implémentez readingTime dans lib/blog.ts et l'ajoutez à PostFrontmatter/Post
                  {post.readingTime && readingTimeText && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-gray-400 dark:text-gray-500" />
                      <span>{readingTimeText}</span>
                    </div>
                  )} */}
                </div>
              </header>
              
              {post.image && (
                <div className="my-8 overflow-hidden rounded-xl shadow-2xl aspect-[16/9] relative">
                  <Image
                    src={post.image.startsWith('http')
                      ? post.image
                      : post.image.startsWith('/')
                        ? post.image
                        : `/${post.image}`}
                    alt={post.title}
                    fill // Utiliser fill pour le responsive avec aspect ratio
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px" // Tailles pour un conteneur max-w-3xl
                    priority // L'image principale de l'article doit être prioritaire
                  />
                </div>
              )}

              <div className="prose dark:prose-invert lg:prose-lg max-w-none mx-auto 
                            prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white 
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 
                            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:underline 
                            prose-strong:text-gray-800 dark:prose-strong:text-gray-100 
                            prose-blockquote:border-indigo-500 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300
                            prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:p-0.5 prose-code:px-1.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono
                            prose-li:marker:text-indigo-500">
                <MDXRemote
                  source={post.content}
                  components={mdxTableComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">{t('tags')}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/${lang}/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`} // Assurez-vous que cette route/logique de page de tag existe
                        className="inline-block bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 transition-colors">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {/* Vous pouvez ajouter une section Articles Similaires ici */}
            </article>
          </div>
        </div>
      </main>
      <CustomFooter />
    </>
  );
}