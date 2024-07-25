import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { TagFrequencyMap } from "@/lib/types";

const Tags = ({ tagFrequencyMap }: { tagFrequencyMap: TagFrequencyMap }) => {
  const { slug } = useParams();
  const router = useRouter();

  const sortedTags = Object.entries(tagFrequencyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, number]) => ({ name, number }));

  const handleTagClick = (tagName: string) => {
    router.push(tagName === slug ? "/search" : `/tag/${tagName}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {sortedTags.map(({ name, number }) => {
        const isSelected = name === slug;
        return (
          <button
            key={name}
            onClick={() => handleTagClick(name)}
            className={`
              px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200
              ${isSelected
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
            `}
          >
            {name}
            <span className="ml-1 text-xs opacity-70">({number})</span>
          </button>
        );
      })}
    </div>
  );
};

export default Tags;