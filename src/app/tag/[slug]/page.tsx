import Search from "@/components/Search";
import { getAllPosts } from "@/functions/getAllPosts";
import { calculateTagFrequency } from "@/functions/getAllTags";
import { getTagFilteredPosts } from "@/functions/tagFilteredPosts";
import { Article } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const decodedSlug = decodeURIComponent(slug); 
  const tagFilteredPosts = await getTagFilteredPosts({ slug: decodedSlug });
  const publishedPosts: Article[] = await getAllPosts();
  const tagFrequencyMap = await calculateTagFrequency({ publishedPosts });

  return (
    <div className="max-w-5xl m-auto p-4 min-h-screen">
      <Search
        publishedPosts={tagFilteredPosts}
        tagFrequencyMap={tagFrequencyMap}
      />
    </div>
  );
}