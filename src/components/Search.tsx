"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/input";
import Tags from "./Tags";
import Feed from "./Feed";
import { Article, TagFrequencyMap } from "@/lib/types";

const POSTS_PER_PAGE = 1;

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
            {currentPage > 1 && (
              <button
                className="px-4 py-2 rounded text-blue-600 hover:text-blue-800"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            )}
            <span className="text-gray-500">Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
              <button
                className="px-4 py-2 rounded text-blue-600 hover:text-blue-800"
                onClick={handleNextPage}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
