"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const posts = [
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

const categories: string[] = [];
posts.forEach((post) => {
  if (!categories.includes(post.category)) {
    categories.push(post.category);
  }
});

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const featuredPost = posts.find((post) => post.isFeatured);
  const filteredPosts =
    selectedCategory === "All"
      ? posts.filter((post) => !post.isFeatured)
      : posts.filter(
          (post) => post.category === selectedCategory && !post.isFeatured
        );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
          Thoughts on Tech & Innovation
        </h1>

        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-indigo-700 text-white rounded-xl shadow-xl mb-16 overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 relative h-64 md:h-auto md:w-1/2">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-none md:rounded-l-lg"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <span className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  Featured
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-indigo-100 mb-6">{featuredPost.excerpt}</p>
                <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold hover:bg-indigo-100 transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Filter by Category:</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedCategory === "All"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-semibold mb-3">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readTime} min read</span>
                </div>
                <button
                  onClick={() => {
                    // Navigate to the post page with the slug
                    window.location.href = `/blog/${post.slug}`;
                  }}
                  className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold hover:bg-indigo-100 transition-colors duration-200 mt-4"
                >
                  Read
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No posts found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
