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
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full py-12 px-6">
   
        <h1 className="text-4xl font-extrabold  mb-6">{post.title}</h1>
        <div className="flex items-center mb-8 text-sm  space-x-3">
          <span className=" px-3 py-1 rounded-full font-semibold">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="prose prose-lg max-w-none  mb-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="flex items-center p-6 rounded-lg ">
          {/* <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 ">
            <Image
              src="/images/profile.png"
              alt={post.author}
              width={64}
              height={64}
              className="object-cover"
            />
          </div> */}
          <div className="ml-4">
            <p className="text-xl font-semibold ">{post.author}</p>
            <p className="text-sm ">Author</p>
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
