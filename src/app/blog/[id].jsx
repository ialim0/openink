"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const posts = [
  // Your posts array from the previous code
];

const BlogPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <div className="relative h-96">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-8">
            <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-semibold mb-3">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
              <span>By {post.author} • {post.date}</span>
              <span>{post.readTime} min read</span>
            </div>
            <p className="text-gray-700 mb-6">{post.excerpt}</p>
            {/* Add the full blog post content here */}
            <p className="text-gray-700">
              This is where you would put the full content of the blog post.
              You might want to add more fields to your post objects, like
              `content` or `sections`, to store the full text.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;