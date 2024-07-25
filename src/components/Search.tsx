"use client";

import { Input } from "@/components/input";
import { Article, TagFrequencyMap } from "@/lib/types";
import { useState } from "react";
import Tags from "./Tags";
import { useParams } from "next/navigation";
import Feed from "./Feed";

const POSTS_PER_PAGE = 4;

const Search = ({
  publishedPosts,
  tagFrequencyMap,
}: {
  publishedPosts: Article[];
  tagFrequencyMap: TagFrequencyMap;
}) => {
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

  return (
    <div className="space-y-5">
      <Input
        placeholder={slug ? `Search in #${normalizedSlug}` : "Search Articles"}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Tags tagFrequencyMap={tagFrequencyMap} />

      {filteredBlogPosts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found.</p>
      ) : (
        <>
          <Feed articles={paginatedPosts} />

          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-4 py-2 rounded ${currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-blue-600 hover:text-blue-800"}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={`px-4 py-2 rounded ${currentPage === totalPages ? "cursor-not-allowed text-gray-400" : "text-blue-600 hover:text-blue-800"}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
