// components/Search.tsx

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useDarkMode } from "@/context/DarkModeContext";
import { Input } from "@/components/input";
import Tags from "./Tags";
import Feed from "./Feed";
import Newsletter from "./Newsletter";
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

  const filteredBlogPosts = publishedPosts.filter((post) => {
    const searchContent = `${post.title} ${post.summary} ${post.tags?.join(" ") || ""}`;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const totalPages = Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredBlogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const styles = {
    container: `max-w-4xl mx-auto p-8 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`,
    heading: `text-3xl font-bold mb-6 ${darkMode ? "text-gray-100" : "text-gray-900"}`,
    button: `px-4 py-2 rounded-md font-medium text-white transition duration-150 ease-in-out ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search Articles</h1>
      <Input
        placeholder={slug ? `Search in #${normalizedSlug}` : "Search Articles"}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Tags tagFrequencyMap={tagFrequencyMap} />
      {filteredBlogPosts.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No posts found.</p>
      ) : (
        <>
          <Feed articles={paginatedPosts} />
          <div className="flex justify-between items-center mt-4">
            {currentPage > 1 && (
              <button className={styles.button} onClick={handlePreviousPage}>
                Previous
              </button>
            )}
            <span className={`text-${darkMode ? 'gray-300' : 'gray-500'}`}>Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
              <button className={styles.button} onClick={handleNextPage}>
                Next
              </button>
            )}
          </div>
        </>
      )}

      {/* <Newsletter /> */}
    </div>
  );
};

export default Search;