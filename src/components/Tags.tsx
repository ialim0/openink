import { useParams, useRouter } from "next/navigation";
import { TagFrequencyMap } from "@/lib/types";

const Tags = ({ tagFrequencyMap }: { tagFrequencyMap: TagFrequencyMap }) => {
  const { slug } = useParams();
  const router = useRouter();

  const sortedTags = Object.entries(tagFrequencyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, number]) => ({ name, number }));

  const handleTagClick = (tagName: string) => {
    router.push(`/tag/${tagName}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sortedTags.map(({ name, number }) => {
        return (
          <button
            key={name}
            onClick={() => handleTagClick(name)}
            className={`
              px-2 py-1 text-sm
         
            `}
          >
            {name}
            <span className="ml-1 text-xs text-gray-400">({number})</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tags;