'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export function LikeButton({ slug }: { slug: string }) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/like?slug=${slug}`)
      .then(res => res.json())
      .then(data => setLikes(data.likes));
  }, [slug]);

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
    }
  };

  return (
    <button 
      onClick={handleLike} 
      className={`flex items-center space-x-2 ${hasLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
    >
      <Heart size={20} fill={hasLiked ? 'currentColor' : 'none'} />
      <span>{likes}</span>
    </button>
  );
}