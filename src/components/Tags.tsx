import { useParams, useRouter } from "next/navigation";
import { TagFrequencyMap } from "@/lib/types";

const Tags = ({ tagFrequencyMap }: { tagFrequencyMap: TagFrequencyMap }) => {
  const { slug } = useParams();
  const router = useRouter();

  const activeTag = typeof slug === "string" ? decodeURIComponent(slug) : null;

  const sortedTags = Object.entries(tagFrequencyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, number]) => ({ name, number }));

  const goAll = () => router.push("/blog");
  const goTag = (tagName: string) => router.push(`/tag/${encodeURIComponent(tagName)}`);

  const handleTagClick = (tagName: string) => {
    if (activeTag === tagName) {
      goAll();
    } else {
      goTag(tagName);
    }
  };

  const baseBtn =
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500";
  const selectedCls = "bg-gray-900 text-white";
  const unselectedCls = "bg-gray-100 text-gray-700 hover:bg-gray-200";

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        type="button"
        aria-pressed={!activeTag}
        onClick={goAll}
        className={`${baseBtn} ${!activeTag ? selectedCls : unselectedCls}`}
        title={!activeTag ? "Viewing all" : "Show all"}
      >
        All
      </button>

      {sortedTags.map(({ name, number }) => (
        <button
          key={name}
          type="button"
          onClick={() => handleTagClick(name)}
          aria-pressed={activeTag === name}
          className={`${baseBtn} ${activeTag === name ? selectedCls : unselectedCls}`}
          title={activeTag === name ? `Unselect ${name}` : `Select ${name}`}
        >
          {name}
          <span className="ml-1 text-[10px] opacity-75">{number}</span>
        </button>
      ))}
    </div>
  );
};

export default Tags;