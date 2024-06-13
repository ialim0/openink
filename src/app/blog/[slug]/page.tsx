import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { posts } from "../data/postsData";
import Link from "next/link";

const postsDirectory = join(process.cwd(), "content/posts");

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  if (!post.contentFilePath) {
    notFound();
  }

  const content = readFileSync(join(postsDirectory, post.contentFilePath), "utf8");

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full py-12 px-6">
        <Link href="/blog" className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300 mb-4">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 00-.707 1.707l5.5 5.5H3a1 1 0 000 2h11.793l-5.5 5.5A1 1 0 1010 18l7-7-7-7A1 1 0 0010 2z" /></svg>
          Go Back
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{post.title}</h1>
        <div className="flex items-center mb-8 text-sm text-gray-600 space-x-3">
          <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-semibold">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="flex items-center bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-lg shadow-lg">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-sm">
            <Image
              src="/images/profile.png"
              alt={post.author}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <p className="text-xl font-semibold text-gray-900">{post.author}</p>
            <p className="text-sm text-gray-500">Author</p>
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <a
            href={`https://www.linkedin.com/sharing/share/?url=https://example.com/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077b5] hover:bg-[#005582] text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:translate-y-1"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${post.title}&url=https://example.com/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2] hover:bg-[#0d95e8] text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:translate-y-1"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://example.com/${post.slug}&title=${post.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] hover:bg-[#145dbf] text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:translate-y-1"
          >
            <FaFacebook size={24} />
          </a>
        </div>
      </div>
    </div>



  );
};

export default PostPage;
