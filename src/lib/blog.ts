import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Post, PostFrontmatter } from '@/types/blog';
import readingTime from 'reading-time'; // Import de la bibliothèque
// ReadingTimeResult peut être importé plus tard si on type plus strictement

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export function getAllPostSlugs(lang: string): string[] {
  const langDirectory = path.join(postsDirectory, lang);
  try {
    // Vérifier si le dossier de langue existe
    if (!fs.existsSync(langDirectory)) {
      // console.warn(`[Blog Lib] Directory not found for lang: ${lang}, path: ${langDirectory}`);
      return [];
    }
    const fileNames = fs.readdirSync(langDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx')) // S'assurer de ne traiter que les fichiers mdx
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error(`[Blog Lib] Error reading directory for lang: ${lang}, path: ${langDirectory}`, error);
    return [];
  }
}

export function getPostBySlug(slug: string, lang: string): Post | null {
  const fullPath = path.join(postsDirectory, lang, `${slug}.mdx`);
  try {
    if (!fs.existsSync(fullPath)) {
      // console.warn(`[Blog Lib] Post not found (getPostBySlug): ${fullPath}`);
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const frontmatter = data as PostFrontmatter;

    const requiredFields: Array<keyof PostFrontmatter> = ['title', 'date', 'description', 'slug', 'lang', 'image', 'author', 'category', 'tags'];
    for (const field of requiredFields) {
      // Convertir field en string explicitement pour la concaténation dans le message d'erreur
      if (!frontmatter[field]) {
        console.error(`[Blog Lib] Missing essential frontmatter field "${String(field)}" for slug: ${slug}, lang: ${lang}. Path: ${fullPath}`);
        // Selon votre stratégie, vous pouvez retourner null ou lever une erreur plus spécifique
        // Pour l'instant, on retourne null pour éviter de bloquer toute la génération si un post est malformé
        return null; 
      }
    }
    
    // S'assurer que le slug du frontmatter correspond au nom de fichier slug (bonne pratique)
    // Ceci est important car le generateMetadata et la page utiliseront le slug de l'URL (nom de fichier)
    if (frontmatter.slug !== slug) {
      console.warn(`[Blog Lib] Frontmatter slug ("${frontmatter.slug}") does not match file slug ("${slug}") for lang: ${lang} in ${fullPath}. Using file slug as canonical.`);
      // On pourrait choisir de forcer frontmatter.slug = slug; ici si on veut que le nom de fichier soit toujours la source de vérité pour le slug.
    }

    return {
      ...frontmatter, // Contient déjà slug et lang du frontmatter
      slug: slug, // Assurer que le slug utilisé est celui du nom de fichier (plus fiable pour le routing)
      lang: lang, // Assurer que la langue est celle du dossier
      content,
    };
  } catch (error) {
    console.error(`[Blog Lib] Error reading or parsing post ${slug} for lang ${lang} from ${fullPath}:`, error);
    return null;
  }
}

export function getAllPosts(lang: string): Post[] {
  const slugs = getAllPostSlugs(lang);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, lang))
    .filter((post): post is Post => post !== null) 
    .sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1)); // Trier par date décroissante
  return posts;
}

export function getTranslatedPosts(translationKey: string, currentSlug: string, currentLang: string): PostFrontmatter[] {
  const allLangs = ['en', 'fr']; // Ou récupérez dynamiquement vos locales depuis votre config
  const translatedPosts: PostFrontmatter[] = [];

  allLangs.forEach(lang => {
    // Ne pas chercher de traduction pour la langue actuelle ou si le translationKey n'est pas défini
    if (lang === currentLang || !translationKey) return;

    const postsInLang = getAllPosts(lang);
    const translatedPost = postsInLang.find(p => p.translationKey === translationKey && p.slug !== currentSlug);
    if (translatedPost) {
      translatedPosts.push(translatedPost);
    }
  });
  return translatedPosts;
}

// Modifie le type de retour de getAllPostsMetadata pour utiliser PostFrontmatter
export function getAllPostsMetadata(lang: string): PostFrontmatter[] {
  const slugs = getAllPostSlugs(lang);
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(postsDirectory, lang, `${slug}.mdx`);
      try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        // Construire l'objet en respectant PostFrontmatter
        const postFrontmatter: PostFrontmatter = {
          slug,
          lang,
          title: data.title || '',
          date: data.date || '',
          description: data.description || '',
          category: data.category || '',
          author: data.author || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          image: data.image || '',
        };
        
        if (data.translationKey) postFrontmatter.translationKey = data.translationKey;
        if (data.lastModified) postFrontmatter.lastModified = data.lastModified;
        
        const stats = readingTime(content);
        postFrontmatter.readingTime = {
          text: stats.text, // La traduction de "read" sera gérée côté composant si besoin
          minutes: stats.minutes,
          time: stats.time,
          words: stats.words,
        };

        return postFrontmatter;
      } catch (error) {
        console.error(`Error reading or parsing MDX file ${fullPath}:`, error);
        return null;
      }
    })
    .filter((post): post is PostFrontmatter => post !== null);

  return posts.sort((post1, post2) => (new Date(post1.date).getTime() > new Date(post2.date).getTime() ? -1 : 1));
}

export function getAllCategories(lang: string): Array<{ name: string; slug: string; count: number }> {
  const posts = getAllPostsMetadata(lang); 
  const categoriesMap = new Map<string, { name: string; count: number }>();

  posts.forEach(post => {
    if (post.category) {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      if (!categoriesMap.has(categorySlug)) {
        categoriesMap.set(categorySlug, { name: post.category, count: 0 });
      }
      const categoryData = categoriesMap.get(categorySlug);
      if (categoryData) {
        categoryData.count++;
      }
    }
  });

  return Array.from(categoriesMap, ([slug, data]) => ({ 
    name: data.name, 
    slug, 
    count: data.count 
  }))
  .filter(category => category.count > 0);
}

export function getPostsByCategory(categorySlug: string, lang: string): PostFrontmatter[] {
  const allPosts = getAllPostsMetadata(lang); // Maintenant, ceci retourne PostFrontmatter[]
  return allPosts.filter(post => {
    if (!post.category) return false;
    const currentCategorySlug = post.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
    return currentCategorySlug === categorySlug;
  });
}

export function getAllTags(lang: string): Array<{ name: string; slug: string; count: number }> {
  const posts = getAllPostsMetadata(lang);
  const tagsMap = new Map<string, { name: string; count: number }>(); 

  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (typeof tag === 'string') { 
          const tagSlug = tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
          if (!tagsMap.has(tagSlug)) {
            tagsMap.set(tagSlug, { name: tag, count: 0 });
          }
          const tagData = tagsMap.get(tagSlug);
          if (tagData) {
            tagData.count++;
          }
        }
      });
    }
  });

  return Array.from(tagsMap, ([slug, data]) => ({ 
    name: data.name, 
    slug, 
    count: data.count 
  }))
  .filter(tag => tag.count > 0);
}

export function getPostsByTag(tagSlug: string, lang: string): PostFrontmatter[] {
  const allPosts = getAllPostsMetadata(lang);
  return allPosts.filter(post => {
    if (!post.tags || !Array.isArray(post.tags)) return false;
    return post.tags.some(tag => {
      const currentTagSlug = tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      return currentTagSlug === tagSlug;
    });
  });
}

/* // Logique de translationKey commentée
export function findPostByTranslationKey(translationKey: string, targetLang: string): PostMetadata | undefined {
  const postsInTargetLang = getAllPostsMetadata(targetLang);
  return postsInTargetLang.find(p => p.translationKey === translationKey);
}
*/ 