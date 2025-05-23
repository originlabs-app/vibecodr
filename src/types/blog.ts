// src/types/blog.ts
export interface PostFrontmatter {
  title: string;
  date: string; // Format 'YYYY-MM-DD'
  description: string;
  category: string;
  author: string; 
  tags: string[];
  image: string; // Chemin relatif à /public ou URL absolue (ex: /images/blog/mon-image.jpg)
  slug: string;
  lang: string;
  translationKey?: string;
  lastModified?: string; // Optionnel: Format 'YYYY-MM-DD'
  readingTime?: {
    text: string; // ex: "5 min read"
    minutes: number;
    time: number;
    words: number;
  };
}

export interface Post extends PostFrontmatter {
  content: string; // Contenu MDX brut après le frontmatter
} 