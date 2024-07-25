import { Button } from "@/components/button";
import { TagFrequencyMap } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";

const Tags = ({ tagFrequencyMap }: { tagFrequencyMap: TagFrequencyMap }) => {
  const { slug } = useParams();

  const sortedTags = Object.entries(tagFrequencyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, number]) => ({ name, number }));

  return (
    <div className="flex flex-wrap gap-2">
      {sortedTags.map(({ name, number }) => {
        const isSelected = name === slug;
        return (
          <Link 
            key={name} 
            href={isSelected ? "/search" : `/tag/${name}`}
          >
            <Button 
              className={isSelected ? "bg-gray-500" : ""}
            >
              {`${name} (${number})`}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Tags;