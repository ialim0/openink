"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// data/posts.ts
export const posts = [
  {
    id: 1,
    title: "Mastering React Hooks",
    excerpt:
      "Dive deep into React Hooks and learn how they revolutionize state management and side effects in functional components.",
    author: "Alimoudine IDRISSOU",
    date: "June 4, 2024",
    readTime: 8,
    imageUrl: "/images/react-hooks.jpg",
    category: "React",
    isFeatured: true,
    slug: "mastering-react-hooks",
  },
  {
    id: 2,
    title: "Blockchain Beyond Crypto",
    excerpt:
      "Explore innovative applications of blockchain technology in supply chain, healthcare, and digital identity.",
    author: "Alimoudine IDRISSOU",
    date: "May 18, 2024",
    readTime: 12,
    imageUrl: "/images/blockchain.jpg",
    category: "Blockchain",
    slug: "blockchain-beyond-crypto",
  },
  {
    id: 3,
    title: "Next.js 14: A New Era",
    excerpt:
      "Uncover the groundbreaking features in Next.js 14 that are setting new standards for React frameworks.",
    author: "Alimoudine IDRISSOU",
    date: "April 30, 2024",
    readTime: 6,
    imageUrl: "/images/nextjs14.jpg",
    category: "Next.js",
    slug: "nextjs-14-a-new-era",
  },
  {
    id: 4,
    title: "AI in Code Review",
    excerpt:
      "Learn how AI is transforming code review processes, making them faster, more thorough, and insightful.",
    author: "Alimoudine IDRISSOU",
    date: "March 22, 2024",
    readTime: 10,
    imageUrl: "/images/ai-code-review.jpg",
    category: "AI",
    slug: "ai-in-code-review",
  },
  // More posts...
];
const PostPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
          {post.title}
        </h1>
        <div className="mb-8">
          <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-semibold mr-2">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm">
            {post.date} • {post.readTime} min read
          </span>
        </div>
        <div className="relative h-96 mb-8">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="prose prose-lg max-w-none">
          {/* Render the post content here */}
          <p>{post.excerpt}</p>
          {/* Add more paragraphs or sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default PostPage;