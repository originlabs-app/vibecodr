'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { PostFrontmatter } from '@/types/blog';
import { useTranslations } from 'next-intl';
import BlogCard from '@/components/blog/BlogCard';
import { FileText, Search, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlogIndexClientProps {
  posts: PostFrontmatter[];
  lang: string;
  customTitle?: string;
  showMainTitle?: boolean;
}

const ITEMS_PER_PAGE = 6;

export default function BlogIndexClient({ posts, lang, customTitle, showMainTitle = true }: BlogIndexClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'latest' | 'all'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [filteredAndSortedPosts, setFilteredAndSortedPosts] = useState<PostFrontmatter[]>(posts);
  const [paginatedPosts, setPaginatedPosts] = useState<PostFrontmatter[]>([]);

  const t = useTranslations('BlogIndex');
  const tCard = useTranslations('BlogCard');
  
  const categories = Array.from(new Set(posts.map(post => post.category).filter(Boolean))) as string[];
  
  useEffect(() => {
    let processedPosts = [...posts];
    
    if (selectedCategory) {
      processedPosts = processedPosts.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      processedPosts = processedPosts.filter(
        post => post.title.toLowerCase().includes(term) || 
               (post.description && post.description.toLowerCase().includes(term))
      );
    }
    
    if (activeFilter === 'latest') {
      processedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    setFilteredAndSortedPosts(processedPosts);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, activeFilter, posts]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedPosts(filteredAndSortedPosts.slice(startIndex, endIndex));
  }, [currentPage, filteredAndSortedPosts]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? null : value);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {showMainTitle && (
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            {t('titleStart')} <span className="text-gradient">vibecodr</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>
      )}
      {customTitle && (
        <h1 className="text-3xl font-bold mb-8">{customTitle}</h1>
      )}

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mt-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchPlaceholder')}
            onChange={handleSearch}
            value={searchTerm}
            className="pl-9"
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder={t('allCategories')} />
            </SelectTrigger>
            <SelectContent className="min-w-[200px]">
              <SelectItem value="all">{t('allCategories')}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category || ""}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 sm:gap-0">
          <div className="flex gap-2 overflow-x-auto py-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              {t('all')}
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="flex items-center border rounded-lg overflow-hidden self-start sm:self-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-3 py-1 rounded-none ${activeFilter === 'latest' ? 'bg-muted' : ''}`}
              onClick={() => setActiveFilter('latest')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t('recent')}
            </Button>
          </div>
        </div>
      )}

      {/* Liste des posts */}
      {paginatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 mt-8">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} lang={lang} readMoreText={tCard('readArticle')} />
          ))}
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm rounded-lg mt-8">
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">{t('noArticlesFoundTitle')}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t('noArticlesFoundDescription')}
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedCategory(null); }}>
              {t('resetFilters')}
            </Button>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label={t('previousPage')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {t('pageInfo', { currentPage, totalPages })}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label={t('nextPage')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
} 