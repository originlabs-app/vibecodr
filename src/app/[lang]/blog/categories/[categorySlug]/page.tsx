import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAllCategories, getPostsByCategory } from '@/lib/blog';
import type { PostFrontmatter } from '@/types/blog';
import BlogIndexClient from '@/components/blog/BlogIndexClient'; // Réutilisation pour l'affichage
import JsonLdBreadcrumbs from '@/components/JsonLdBreadcrumbs';
import JsonLdCollectionPage from '@/components/JsonLdCollectionPage';
import Header from '@/components/Header';
import CustomFooter from '@/components/CustomFooter';
import { locales, defaultLocale } from '../../../../../../next-intl.config'; // Ajout de cet import

interface CategoryPageProps {
  params: Promise<{
    lang: string;
    categorySlug: string;
  }>;
}

export async function generateStaticParams({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const categories = getAllCategories(lang);
  return categories.map(category => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { lang, categorySlug } = await params;
  const categories = getAllCategories(lang); // Pour retrouver le nom original de la catégorie
  const category = categories.find(cat => cat.slug === categorySlug);
  const categoryName = category ? category.name : categorySlug; // Fallback au slug si nom non trouvé

  const t = await getTranslations({ locale: lang, namespace: 'BlogCategories' });
  // Prévoyez des traductions comme categoryTitle: "Articles sur {categoryName}"
  // et categoryDescription: "Parcourez tous les articles sur {categoryName} sur le blog Vibecodr."

  const currentPath = `/blog/categories/${categorySlug}`;
  const alternatesLanguages: { [key: string]: string } = {};
  locales.forEach((loc: string) => { 
    alternatesLanguages[loc] = `/${loc}${currentPath}`;
  });
  alternatesLanguages['x-default'] = `/${defaultLocale}${currentPath}`;

  return {
    title: t('categoryTitle', { categoryName }),
    description: t('categoryDescription', { categoryName }),
    alternates: {
      canonical: `/${lang}${currentPath}`,
      languages: alternatesLanguages,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, categorySlug } = await params;
  const posts = getPostsByCategory(categorySlug, lang);

  // Récupérer la description pour CollectionPage (similaire à generateMetadata)
  const tBlogCategories = await getTranslations({ locale: lang, namespace: 'BlogCategories' });
  const allCategories = getAllCategories(lang);
  const currentCategory = allCategories.find(cat => cat.slug === categorySlug);
  const categoryName = currentCategory ? currentCategory.name : categorySlug;
  const categoryPageDescription = tBlogCategories('categoryDescription', { categoryName });

  const tGlobal = await getTranslations({ locale: lang, namespace: 'Global' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  
  const breadcrumbItems = [
    { name: tGlobal('homeBreadcrumb'), href: `/${lang}` },
    { name: tGlobal('blogBreadcrumb'), href: `/${lang}/blog` },
    { name: categoryName, href: `/${lang}/blog/categories/${categorySlug}` },
  ];

  // Préparer les items pour JsonLdCollectionPage
  const collectionItems = posts.map(post => ({
    '@type': 'BlogPosting', // Chaque item est un article de blog
    name: post.title,
    headline: post.title, // Peut être identique au titre pour un article
    url: `/${lang}/blog/${post.slug}`,
    image: post.image, // Assurez-vous que post.image est une URL absolue ou relative au baseUrl
    datePublished: new Date(post.date).toISOString(),
    // description: post.description, // Optionnel, peut rendre le JSON-LD très grand
  }));

  const collectionPageUrl = `/${lang}/blog/categories/${categorySlug}`;

  return (
    <>
      <Header />
      <JsonLdBreadcrumbs items={breadcrumbItems} baseUrl={baseUrl} />
      <JsonLdCollectionPage 
        name={categoryName} 
        description={categoryPageDescription}
        url={collectionPageUrl}
        items={collectionItems} 
        baseUrl={baseUrl} 
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        <BlogIndexClient posts={posts} lang={lang} />
      </div>
      <CustomFooter />
    </>
  );
} 