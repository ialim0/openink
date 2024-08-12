import "prismjs/themes/prism-tomorrow.css";
import { Fragment, cache } from "react";
import Link from "next/link";
import Image from "next/image";
import notion from "@/lib";
import { convertToPost } from "@/functions/convertToPost";
import { getTagFilteredPosts } from "@/functions/articleFilteredPosts";
import { renderBlock } from "@/components/Render";
import TopScrollButton from "@/components/TopScrollButton";
import ArticleList from '@/components/ArticleList';
import SocialshareButtons from "@/components/SocialshareButtons";
import getLocalizedDate from "@/utils/getLocalizedDate";
import { Article } from "@/lib/types";
import { Redis } from "@upstash/redis";
import { ReportView } from './view';
import { LikeButton } from '@/components/LikeButton';
import { Clock, Eye, User, Heart } from 'lucide-react';

interface Block {
  id: string;
  type: string;
  [key: string]: any;
}

const redis = Redis.fromEnv();

const getBlocks = cache(async (blockID: string) => {
  const blockId = blockID.replace(/-/g, '');
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 100,
  });
  return response.results as Block[];
});

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const { id } = searchParams;
  const pageProperties = await notion.pages.retrieve({ page_id: id });
  const postDetails = convertToPost(pageProperties);
  const blocks: Block[] = await getBlocks(id);
  const tagPosts: Article[] = await getTagFilteredPosts({ tags: postDetails.tags || [], slug: String(postDetails.slug || []) });

  if (!blocks) return null;

  const viewsCount = await redis.get<number>(`pageviews:posts:${postDetails.slug}`) || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <ReportView slug={postDetails.slug} />
      
      <header className="mb-12">
        <div className="relative w-full h-96 mb-8">
          <Image
            src={postDetails.coverImage}
            alt={postDetails.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{postDetails.title}</h1>
        
        <div className="flex items-center space-x-6 text-gray-600 mb-6">
          <div className="flex items-center">
            <User size={18} className="mr-2" />
            <span>{postDetails.author}</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="mr-2" />
            <time dateTime={postDetails.date}>{getLocalizedDate(postDetails.date)}</time>
          </div>
          <div className="flex items-center">
            <Eye size={18} className="mr-2" />
            <span>{viewsCount} views</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {postDetails.tags && postDetails.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <article className="prose prose-lg max-w-none mb-12">
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </article>

      <SocialshareButtons
        shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/${postDetails.slug}?id=${postDetails.id}`}
        title={postDetails.title}
      />

      <div className="mt-12 border-t pt-8">
        <div className="flex items-center justify-center space-x-4">
          <Heart size={24} className="text-red-500" />
          <span className="text-lg font-semibold">Enjoyed this post? Show your love!</span>
        </div>
        <div className="mt-4 flex justify-center">
          <LikeButton slug={postDetails.slug} size="large" />
        </div>
        <p className="text-center mt-4 text-gray-600">
          Your appreciation helps us create more great content!
        </p>
      </div>

      <section className="mt-16 border-t pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <Link href="/blog" className="text-blue-600 hover:underline">
            View all articles →
          </Link>
        </div>
        <ArticleList articles={tagPosts} />
      </section>

      <TopScrollButton />
    </div>
  );
}