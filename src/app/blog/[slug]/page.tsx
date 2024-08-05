import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Fragment, cache } from "react";
import Link from "next/link";
import notion from "@/lib";
import { convertToPost } from "@/functions/convertToPost";
import { getAllPosts } from "@/functions/getAllPosts";
import { getTagFilteredPosts } from "@/functions/articleFilteredPosts";
import { renderBlock } from "@/components/Render";
import TopScrollButton from "@/components/TopScrollButton";
import Container from '@/components/Container';
import ArticleList from '@/components/ArticleList';
import SocialshareButtons from "@/components/SocialshareButtons";
import getLocalizedDate from "@/utils/getLocalizedDate";
import { Article } from "@/lib/types";

interface Block {
  id: string;
  type: string;
  [key: string]: any;
}

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <img className="w-full h-64 object-cover rounded-lg" src={postDetails.coverImage} alt={postDetails.title} />
      
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-bold">{postDetails.title}</h1>
        <div className="text-sm text-gray-600">
          <time dateTime={postDetails.date}>{getLocalizedDate(postDetails.date)}</time>
          <span className="mx-2">•</span>
          <span>{postDetails.author}</span>
        </div>
        <SocialshareButtons
          shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/${postDetails.slug}?id=${postDetails.id}`}
          title={postDetails.title}
        />
      </header>

      <article className="prose prose-lg max-w-none">
        {blocks.map((block) => (
          <Fragment key={block.id}>{renderBlock(block)}</Fragment>
        ))}
      </article>

      <section className="border-t pt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest articles</h2>
          <Link href="/blog" className="text-blue-600 hover:underline">
            More articles →
          </Link>
        </div>
        <ArticleList articles={tagPosts} />
      </section>

      <TopScrollButton />
    </div>
  );
}