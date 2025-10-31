import { getAllPosts } from "@/functions/getAllPosts";
import { Article } from "@/lib/types";
import { Redis } from "@upstash/redis";
import Search from "../../components/Search";
import { calculateTagFrequency } from "@/functions/getAllTags";

// Views helpers: guarantee a minimum view count per article
const MIN_VIEWS = 70;
const MAX_RANDOM_VIEWS = 150;
const randomAtLeastMin = () => Math.floor(Math.random() * (MAX_RANDOM_VIEWS - MIN_VIEWS + 1)) + MIN_VIEWS;

let redis: Redis | null = null;
try {
  redis = Redis.fromEnv();
} catch (e) {
  console.warn("Redis env missing or invalid. Using random default views.");
}

const Articles = async () => {
  const publishedPosts: Article[] = await getAllPosts();
  const tagFrequencyMap = await calculateTagFrequency({ publishedPosts });

  let views: Record<string, number>;
  if (redis) {
    const keys = publishedPosts.map((p) => ['pageviews', 'posts', p.slug].join(':'));
    const currentVals = await redis.mget<number[]>(...keys);
    const toPersist: { key: string; value: number }[] = [];
    views = currentVals.reduce((acc, v, i) => {
      const slug = publishedPosts[i].slug;
      const key = keys[i];
      const val = typeof v === 'number' ? v : undefined;
      const finalVal = val !== undefined && val >= MIN_VIEWS ? val : randomAtLeastMin();
      acc[slug] = finalVal;
      if (val === undefined || val < MIN_VIEWS) {
        toPersist.push({ key, value: finalVal });
      }
      return acc;
    }, {} as Record<string, number>);
  } else {
    views = publishedPosts.reduce((acc, p) => {
      acc[p.slug] = randomAtLeastMin();
      return acc;
    }, {} as Record<string, number>);
  }

  if (redis) {
    const keys = publishedPosts.map((p) => ['pageviews', 'posts', p.slug].join(':'));
    const currentVals = await redis.mget<number[]>(...keys);
    const persistOps: Array<Promise<unknown>> = [];
    currentVals.forEach((v, i) => {
      const val = typeof v === 'number' ? v : undefined;
      const slug = publishedPosts[i].slug;
      if (val === undefined || val < MIN_VIEWS) {
        const key = keys[i];
        const target = views[slug];
        persistOps.push(redis.set(key, target));
      }
    });
    if (persistOps.length) {
      await Promise.all(persistOps);
    }
  }

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
