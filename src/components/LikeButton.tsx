'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  slug: string;
  size?: 'small' | 'large';
}

export function LikeButton({ slug, size = 'small' }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetchLikes();
    const hasLiked = localStorage.getItem(`liked_${slug}`);
    if (hasLiked) setHasLiked(true);
  }, [slug]);

  const fetchLikes = async () => {
    const response = await fetch(`/api/like?slug=${slug}`);
    const data = await response.json();
    setLikes(data.likes);
  };

  const handleLike = async () => {
    if (hasLiked) return;

    const res = await fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });

    if (res.ok) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem(`liked_${slug}`, 'true');
    }
  };

  const buttonClass = size === 'large' 
    ? 'p-4 text-xl'
    : 'p-2 text-sm';

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-2 ${buttonClass} ${
        hasLiked ? 'text-red-500' : 'text-gray-500'
      } hover:text-red-500 transition-colors duration-200`}
      disabled={hasLiked}
    >
      <Heart fill={hasLiked ? 'currentColor' : 'none'} />
      <span>{likes}</span>
    </button>
  );
}