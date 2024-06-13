"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { posts } from "./data/postsData";
import { FaSearch } from "react-icons/fa";



const categories: string[] = [];
posts.forEach((post) => {
  if (!categories.includes(post.category)) {
    categories.push(post.category);
  }
});

const linkStyles =
  "text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 flex justify-center items-center mb-6";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const featuredPosts = posts.filter((post) => post.isFeatured);
  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !post.isFeatured
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <Link href="/" className={linkStyles}>
          Go Back to Home
        </Link>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 text-center">
          Thoughts on Tech & Innovation
        </h1>
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Featured Posts
            </h2>
            <div
              className={`${featuredPosts.length > 1
                ? "flex overflow-x-auto space-x-4 snap-x snap-mandatory"
                : ""
                }`}
            >
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`relative text-white rounded-xl overflow-hidden ${featuredPosts.length > 1
                    ? "min-w-[300px] sm:min-w-[400px] md:min-w-[500px] snap-start"
                    : "w-full"
                    }`}
                >
                  <div className="relative h-48">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      Featured
                    </span>
                    <h2 className="text-xl font-bold mb-2 transition-transform duration-500 hover:translate-x-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-200 mb-4 transition-transform duration-500 hover:-translate-x-2">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="inline-block bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-100 transition-colors duration-200 transition-transform duration-500 hover:rotate-3">
                        Read More
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 flex justify-center items-center">
          <div className="relative w-full max-w-md group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-500 transition-transform duration-300 transform group-hover:scale-125 group-hover:text-indigo-600" />
            </span>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-600 outline-none transition-shadow duration-300 shadow-md focus:shadow-lg bg-white group-hover:bg-indigo-50"
            />
            {searchQuery && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 transition-opacity duration-300 opacity-100">
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  Clear
                </button>
              </span>
            )}
          </div>
        </div>



        <div className="mb-12 text-center">
          <h3 className="text-xl font-semibold mb-4 relative">
            Filter by Category:
            <span className="absolute -bottom-1 left-0 w-16 h-1 bg-blue-500"></span>
          </h3>
          <div className="flex justify-center flex-wrap gap-4">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === "All"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
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
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Link href={`/blog/${post.slug}`}>
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500 opacity-50 transition-opacity duration-500 hover:opacity-75"></div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold mb-3">
                      {post.category}
                    </span>
                    <h2 className="text-xl font-bold mb-3 text-gray-800 transition-transform duration-500 hover:translate-x-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm transition-transform duration-500 hover:-translate-x-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <div className="flex items-center mt-4 relative group">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3 transition-transform duration-500 hover:rotate-12">
                        <span className="text-white text-sm font-bold">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">By {post.author}</span>
                      <div className="absolute -top-8 left-0 transform -translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-opacity duration-300 bg-gray-900 text-white text-xs rounded py-1 px-2">
                        {post.author}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
