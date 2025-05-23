import React from 'react';

interface JsonLdBreadcrumbsProps {
  items: Array<{ name: string; href: string }>;
  baseUrl: string;
}

const JsonLdBreadcrumbs: React.FC<JsonLdBreadcrumbsProps> = ({ items, baseUrl }) => {
  if (!items || items.length === 0) return null;

  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.href.startsWith('http')
      ? item.href
      : `${baseUrl}${item.href.startsWith('/') ? '' : '/'}${item.href}`,
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
};

export default JsonLdBreadcrumbs; 