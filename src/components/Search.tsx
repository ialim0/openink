"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDarkMode } from "@/context/DarkModeContext";
import { Input } from "@/components/input";
import Tags from "./Tags";
import Feed from "./Feed";
import { Article, TagFrequencyMap } from "@/lib/types";

const POSTS_PER_PAGE = 4;

const Search = ({
  publishedPosts,
  tagFrequencyMap,
}: {
  publishedPosts: Article[];
  tagFrequencyMap: TagFrequencyMap;
}) => {
  const { darkMode } = useDarkMode();
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { slug } = useParams();

  const normalizedSlug = typeof slug === "string" ? slug.replace(/%20/g, " ") : "";

  const filteredBlogPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const searchContent = `${post.title} ${post.summary} ${post.tags?.join(" ") || ""}`;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [publishedPosts, searchValue]);

  const totalPages = Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredBlogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Explore Articles</h1>
      <Input
        placeholder={"Search articles..."}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={`mb-6 ${
          darkMode
            ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
        }`}
      />
      <Tags tagFrequencyMap={tagFrequencyMap} />
      {filteredBlogPosts.length === 0 ? (
        <p className="text-center mt-8 text-lg">No posts found. Try a different search term.</p>
      ) : (
        <>
          <Feed articles={paginatedPosts} />
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : darkMode
                      ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;