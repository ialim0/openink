'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  slug: string;
  size?: 'small' | 'large';
  onLikeStatusChange?: (hasLiked: boolean) => void;
}

export function LikeButton({ slug, size = 'small', onLikeStatusChange }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLikes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/like?slug=${slug}`);
        if (!response.ok) throw new Error('Failed to fetch likes');
        const data = await response.json();
        if (isMounted) setLikes(data.likes);
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLikes();
    const stored = localStorage.getItem(`liked_${slug}`);
    const initialHasLiked = stored === 'true';
    if (initialHasLiked) setHasLiked(true);
    if (onLikeStatusChange) onLikeStatusChange(initialHasLiked);

    return () => {
      isMounted = false;
    };
  }, [slug, onLikeStatusChange]);

  const handleLike = async () => {
    if (hasLiked || loading) return;

    try {
      setLoading(true);
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });

      if (!res.ok) throw new Error('Failed to like the post');
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem(`liked_${slug}`, 'true');
      if (onLikeStatusChange) onLikeStatusChange(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    } finally {
      setLoading(false);
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
      disabled={hasLiked || loading}
      aria-label="Like this post"
      role="button"
    >
      <Heart fill={hasLiked ? 'currentColor' : 'none'} />
      <span>{likes}</span>
      {loading && <span className="ml-2 text-gray-500">Loading...</span>}
    </button>
  );
}
