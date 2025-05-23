'use client';

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from 'next-intl';

interface GlossaryTermProps {
  term: string;
  definition: string;
  category: string;
  displayCategory?: string;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition, category, displayCategory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (rawCategoryKey: string) => {
    const categoryColors: Record<string, string> = {
      "IA": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      "Developpement": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "Producty": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      "Entrepreneuriat": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      "Startup": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
      "GenAI": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      "Vibecodr": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      "General": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    };
    return categoryColors[rawCategoryKey] || categoryColors["General"];
  };

  return (
    <div className="mb-2 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow overflow-hidden rounded-md bg-white dark:bg-gray-800">
      <div 
        className="min-h-[3.5rem] px-3 sm:px-4 py-3 sm:py-0 sm:h-14 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer gap-2 sm:gap-0"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold break-words">{term}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full self-start sm:self-auto flex-shrink-0 ${getCategoryColor(category)}`}>
            {displayCategory || category}
          </span>
        </div>
        <div className="flex-shrink-0 self-end sm:self-auto">
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 p-3 sm:p-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">{definition}</p>
        </div>
      )}
    </div>
  );
};

export default GlossaryTerm; 