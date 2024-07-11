"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import Head from "next/head";
import { useDarkMode } from '@/context/DarkModeContext';
import { posts } from "./data/postsData";

const categories: string[] = [...new Set(posts.map(post => post.category))];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { darkMode } = useDarkMode();

  const filteredPosts = posts.filter(post =>
    (selectedCategory === "All" || post.category === selectedCategory) &&
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !post.isFeatured
  );

  const linkStyles = `inline-flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-semibold transition-colors duration-300`;

  return (
    <>
      <Head>
        <title>Blog - My Posts</title>
        <meta name="description" content="Explore my blog posts on various topics. Filter by category or search for specific posts." />
      </Head>
      <div className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} min-h-screen`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <Link href="/" className={linkStyles}>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 00-.707 1.707l5.5 5.5H3a1 1 0 000 2h11.793l-5.5 5.5A1 1 0 1010 18l7-7-7-7A1 1 0 0010 2z" />
            </svg>
            Go Back to Home
          </Link>

          <div className="mb-8 flex justify-center items-center">
            <div className="relative w-full max-w-md group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className={`${darkMode ? 'text-gray-400 group-hover:text-indigo-400' : 'text-gray-500 group-hover:text-indigo-600'} transition-transform duration-300 transform group-hover:scale-125`} />
              </span>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-10 py-3 rounded-full border ${darkMode ? 'border-gray-700 focus:ring-indigo-400 bg-gray-800 text-gray-100' : 'border-gray-300 focus:ring-indigo-600 bg-white text-gray-900'} focus:ring-2 outline-none transition-shadow duration-300 shadow-md focus:shadow-lg group-hover:bg-indigo-50`}
                aria-label="Search posts"
              />
              {searchQuery && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-300 opacity-100">
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                </span>
              )}
            </div>
          </div>

          <div className="mb-8 text-center">
            <h3 className={`text-xl font-semibold mb-4 relative ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Filter by Category:
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-blue-500"></span>
            </h3>
            <div className="flex justify-center flex-wrap gap-4">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === "All"
                    ? "bg-blue-500 text-white"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label="Show all posts"
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-label={`Show posts in category ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              >
                <Link href={`/blog/${post.slug}`} className="block"  aria-label={`Read more about ${post.title}`}>
                    <div className="relative h-60 overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500 opacity-75"></div>
                    </div>
                    <div className="p-6">
                      <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold mb-3">
                        {post.category}
                      </span>
                      <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-800'} transition-transform duration-500 hover:translate-x-2`}>
                        {post.title}
                      </h2>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 text-sm transition-transform duration-500 hover:-translate-x-2`}>
                        {post.excerpt}
                      </p>
                      <div className={`flex justify-between items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>{post.date}</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      <div className="flex items-center mt-4 relative group">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 transition-transform duration-500 hover:rotate-12">
                          <span className="text-white text-sm font-bold">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>By {post.author}</span>
                        <div className={`absolute -top-8 left-0 transform -translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-900'} text-white text-xs rounded py-1 px-2`}>
                          {post.author}
                        </div>
                      </div>
                    </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-8`}>
              No posts found in this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
