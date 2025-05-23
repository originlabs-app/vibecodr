import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Clock } from "lucide-react";
import { PostMetadata } from "@/lib/blog"; // Notre interface PostMetadata
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: PostMetadata;
  lang: string; // Pour construire le lien correctement
  readMoreText: string; // Nouvelle prop pour le texte traduit
}

// Fonction pour obtenir la couleur de la catégorie (comme dans vibe-code-factory)
const getCategoryColor = (category: string | undefined) => {
  if (!category) return "";
  
  const categoryColors: Record<string, string> = {
    "Development": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Design": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "Business": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Innovation": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    "Tutorial": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "Développement": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "Tutoriel": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
  
  return categoryColors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
};

const BlogCard: React.FC<BlogCardProps> = ({ post, lang, readMoreText }) => {
  const blogLink = `/${lang}/blog/${post.slug}`;

  // Utilisation de toLocaleDateString pour la simplicité, date-fns serait mieux pour un formatage avancé
  const formattedDate = post.date ? new Date(post.date).toLocaleDateString(lang, {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : "Date inconnue";

  // Construire le texte du temps de lecture pour la locale actuelle (simplifié)
  const readingTimeText = post.readingTime 
    ? `${Math.ceil(post.readingTime.minutes)} ${lang === 'fr' ? 'min de lecture' : 'min read'}` 
    : null;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-lg border dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden group rounded-lg">
      {post.image && (
        <Link href={blogLink} className="block aspect-video overflow-hidden relative">
          <Image
            src={post.image}
            alt={post.title || "Blog post image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </Link>
      )}
      <CardHeader className={`pb-4 ${post.image ? 'pt-4' : 'pt-6'}`}>
        <div className="flex justify-between items-center space-x-2 mb-2">
          {post.category && (
            <Badge variant="outline" className={`text-xs ${getCategoryColor(post.category)}`}>
              {post.category}
            </Badge>
          )}
          {post.date && (
            <div className={`text-xs text-muted-foreground flex items-center ${post.category ? '' : 'ml-auto'}`}>
              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
        {readingTimeText && (
          <div className="text-xs text-muted-foreground flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{readingTimeText}</span>
          </div>
        )}
        <CardTitle className="text-xl mt-3 group-hover:text-primary transition-colors">
          <Link href={blogLink} className="hover:underline underline-offset-4">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        {/* Utilisation directe de post.description de notre frontmatter */}
        <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
          {post.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2 pb-4 px-4 flex items-center justify-between border-t dark:border-gray-700/50">
        {post.author && (
          <div className="flex items-center text-xs text-muted-foreground">
            <User className="h-3 w-3 mr-1.5 flex-shrink-0" />
            <span>{post.author}</span>
          </div>
        )}
        <Button variant="ghost" size="sm" className={`${post.author ? 'ml-auto' : 'w-full justify-end'} text-primary hover:text-primary/80`} asChild>
          <Link href={blogLink} className="flex items-center text-sm">
            {readMoreText}
            <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard; 