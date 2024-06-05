import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { readFileSync } from "fs";
import { join } from "path";

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
  {
    id: 2,
    title: "Blockchain Beyond Crypto",
    author: "Alimoudine IDRISSOU",
    date: "May 18, 2024",
    readTime: 12,
    imageUrl: "/images/blockchain.jpg",
    category: "Blockchain",
    slug: "blockchain-beyond-crypto",
    contentFilePath: "content/posts/blockchain-beyond-crypto.md",
  },
  {
    id: 3,
    title: "Next.js 14: A New Era",
    author: "Alimoudine IDRISSOU",
    date: "April 30, 2024",
    readTime: 6,
    imageUrl: "/images/nextjs14.jpg",
    category: "Next.js",
    slug: "nextjs-14-a-new-era",
    contentFilePath: "content/posts/nextjs-14-a-new-era.md",
  },
];

const PostPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800">Post not found</h1>
      </div>
    );
  }

  const content = readFileSync(join(process.cwd(), post.contentFilePath), "utf8");

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center mb-6">
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
            {post.category}
          </span>
          <span className="text-gray-600 text-sm">{post.date}</span>
          <span className="text-gray-600 text-sm mx-1">•</span>
          <span className="text-gray-600 text-sm">{post.readTime} min read</span>
        </div>
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="prose prose-lg max-w-none text-gray-800">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="flex justify-center mt-8">
          <a
            href={`https://www.linkedin.com/sharing/share/?url=https://example.com/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-3"
          >
            <i className="fab fa-linkedin mr-2"></i> Share on LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${post.title}&url=https://example.com/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-full mr-3"
          >
            <i className="fab fa-twitter mr-2"></i> Share on Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://example.com/${post.slug}&title=${post.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-full"
          >
            <i className="fab fa-facebook mr-2"></i> Share on Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
