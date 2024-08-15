'use client';

import React, { useState } from 'react';
import slugify from 'slugify';
import Link from 'next/link';
import {  Eye } from 'lucide-react';
import { useDarkMode } from '@/context/DarkModeContext'; 
import getLocalizedDate from '@/utils/getLocalizedDate';
import { Article } from '@/lib/types';
import { LikeButton } from '@/components/LikeButton'; 

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const slug = slugify(article.slug).toLowerCase();
  const formattedDate = getLocalizedDate(article.date);
  const { darkMode } = useDarkMode(); 
  const [hasLiked, setHasLiked] = useState(false);

  const handleLikeStatusChange = (liked: boolean) => {
    setHasLiked(liked);
  };

  return (
    <Link href={`/blog/${slug}?id=${article.id}`} className="block">
      <article 
        className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} transition-colors duration-200`}
      >
<div className="w-full max-h-72 overflow-hidden">
  <img
    className="w-full h-auto object-cover"
    src={article.coverImage}
    alt={article.title}
  />
</div>
        <div className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
          <h2 className={`font-semibold mb-2 line-clamp-2 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
            {article.title}
          </h2>
          <p className={`mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {article.summary}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className={`bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-white' : ''}`}>
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className={`text-gray-500 text-xs ${darkMode ? 'text-gray-400' : ''}`}>
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <span>{formattedDate}</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center">
                <Eye size={14} className="mr-1" />
                {article.viewsCount}
              </span>
              <span className="flex items-center">
                {article.readTime} min read time
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <LikeButton slug={article.slug} onLikeStatusChange={handleLikeStatusChange} />
            {!hasLiked && (
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                If you enjoyed this post, please like it!
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
