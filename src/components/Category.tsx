import React from 'react';
import { Check } from 'lucide-react';

interface CategoryProps {
  setSelectedTag: (tag: string | null) => void;
  tag: string;
  selectedTag: string | null;
}

export default function Category({ setSelectedTag, tag, selectedTag }: CategoryProps) {
  const handleTagClick = (clickedTag: string) => {
    if (selectedTag === clickedTag) {
      return setSelectedTag(null);
    }
    return setSelectedTag(clickedTag);
  };

  return (
    <button
      key={tag}
      type="button"
      onClick={() => handleTagClick(tag)}
      aria-pressed={selectedTag === tag}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
        ${selectedTag === tag
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}
      title={selectedTag === tag ? `Unselect ${tag}` : `Select ${tag}`}
    >
      {selectedTag === tag && <Check size={14} aria-hidden="true" />}
      <span>{tag || 'All'}</span>
    </button>
  );
}
