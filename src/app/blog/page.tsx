import { getAllPosts } from "@/functions/getAllPosts";
import { Article } from "@/lib/types";
import { Redis } from "@upstash/redis";
import Search from "../../components/Search";
import { calculateTagFrequency } from "@/functions/getAllTags";

const redis = Redis.fromEnv();

const Articles = async () => {
  const publishedPosts: Article[] = await getAllPosts();
  const tagFrequencyMap = await calculateTagFrequency({ publishedPosts });

  const views = (
    await redis.mget<number[]>(
      ...publishedPosts.map((p) => ['pageviews', 'posts', p.slug].join(':')),
    )
  ).reduce(
    (acc, v, i) => {
      acc[publishedPosts[i].slug] = v ?? 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  const articlesWithViews = publishedPosts.map((article) => ({
    ...article,
    viewsCount: views[article.slug] || 0,
  }));

  return (
    <div className="max-w-5xl m-auto p-4 min-h-screen">
      <Search
        publishedPosts={articlesWithViews}
        tagFrequencyMap={tagFrequencyMap}
      />
    </div>
  );
};

export default Articles;
