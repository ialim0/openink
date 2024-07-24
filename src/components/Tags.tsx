import { Button } from "@/components/button";
import { TagFrequencyMap } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";

const Tags = ({ tagFrequencyMap }: { tagFrequencyMap: TagFrequencyMap }) => {
  const params = useParams();
  const { slug } = params;
  const flatTags = Object.entries(tagFrequencyMap).map(([name, number]) => ({ name, number }));
  flatTags.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="gap-2 flex flex-wrap">
      {flatTags.map(({ name, number }, index) => {
        const selected = name === slug;

        return (
          <Button className={selected ? "bg-gray-500" : ""}>

          <Link href={selected ? "/search" : `/tag/${name}`} key={index}>
              {`${name} (${number})`}
          </Link>
          </Button>

        );
      })}
    </div>
  );
};

export default Tags;
