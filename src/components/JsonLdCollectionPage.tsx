import React from 'react';

interface CollectionItem {
  '@type': string;
  url: string;
  name: string;
  headline?: string;
  image?: string;
  datePublished?: string;
}

interface JsonLdCollectionPageProps {
  name: string;
  description?: string;
  url: string;
  items: CollectionItem[];
  baseUrl: string;
}

const JsonLdCollectionPage: React.FC<JsonLdCollectionPageProps> = ({ name, description, url, items, baseUrl }) => {
  if (!items || items.length === 0) return null;

  const itemListElement = items.map((item, index) => ({
    '@type': item['@type'] || 'ListItem',
    position: index + 1,
    name: item.name || item.headline,
    url: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    ...(item.headline && { headline: item.headline }),
    ...(item.image && {
      image: item.image.startsWith('http') ? item.image : `${baseUrl}${item.image.startsWith('/') ? '' : '/'}${item.image}`,
    }),
    ...(item.datePublished && { datePublished: item.datePublished }),
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    url: url.startsWith('http') ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`,
    ...(description && { description }),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement,
      numberOfItems: items.length,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default JsonLdCollectionPage; 