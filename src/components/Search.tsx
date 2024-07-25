"use client";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
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
  const paginatedPosts = filteredBlogPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <Input
        className="mb-5"
        placeholder={slug ? `Search in #${normalizedSlug}` : "Search Articles"}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Tags tagFrequencyMap={tagFrequencyMap}/>

      {filteredBlogPosts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found.</p>
      ) : (
        <>
          <Feed articles={paginatedPosts} />
          
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Search;