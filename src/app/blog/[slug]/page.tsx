import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const postsDirectory = join(process.cwd(), "content/posts");

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  readTime: number;
  imageUrl: string;
  category: string;
  isFeatured?: boolean;
  slug: string;
  contentFilePath: string;
}

const posts: Post[] = [
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
    contentFilePath: "mastering-react-hooks.md",
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
    contentFilePath: "blockchain-beyond-crypto.md",
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
    contentFilePath: "nextjs-14-a-new-era.md",
  },
];

export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: `${post.title} by ${post.author}`,
  };
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const content = readFileSync(join(postsDirectory, post.contentFilePath), "utf8");

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{post.title}</h1>
        <div className="flex items-center mb-6">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mr-3">
            {post.category}
          </span>
          <span className="text-gray-600 text-sm">{post.date}</span>
          <span className="text-gray-600 text-sm mx-1">•</span>
          <span className="text-gray-600 text-sm">{post.readTime} min read</span>
        </div>
        <div className="relative h-96 mb-8 rounded-lg overflow-hidden shadow-md">
          <Image
            src={post.imageUrl}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-lg shadow-sm animate-slide-in-left">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src="/images/profile.png"
              alt={post.author}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-800">{post.author}</p>
            <p className="text-sm text-gray-600">Author</p>
          </div>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <a
            href={`https://www.linkedin.com/sharing/share/?url=https://example.com/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${post.title}&url=https://example.com/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <FaTwitter />
            <span>Twitter</span>
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=https://example.com/${post.slug}&title=${post.title}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1"
          >
            <FaFacebook />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
