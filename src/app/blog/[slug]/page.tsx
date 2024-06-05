import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { readFileSync } from "fs";
import { join } from "path";

// data/posts.ts
const posts = [
  {
    id: 1,
    title: "Mastering React Hooks",
    author: "Alimoudine IDRISSOU",
    date: "June 4, 2024",
    readTime: 8,
    imageUrl: "/images/react-hooks.jpg",
    category: "React",
    isFeatured: true,
    slug: "mastering-react-hooks",
    contentFilePath: "content/posts/mastering-react-hooks.md",
  },
  // ... other posts
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

  const content = readFileSync(join(process.cwd(), post.contentFilePath), "utf8");

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
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostPage;