import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredFAQProps {
  faqs: FAQItem[];
  lang: string;
}

const StructuredFAQ: React.FC<StructuredFAQProps> = ({ faqs, lang }) => {
  if (!faqs || faqs.length === 0) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibecodr.ai';
  const pageUrl = `${baseUrl}/${lang}/faq`;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
};

export default StructuredFAQ; 