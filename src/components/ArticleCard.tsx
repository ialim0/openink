import { Article } from '@/lib/types';
import slugify from 'slugify';
import getLocalizedDate from '@/utils/getLocalizedDate';
import Link from 'next/link';

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  const slug = slugify(article.slug).toLowerCase();
  const formattedDate = getLocalizedDate(article.date);

  return (
    <Link href={`/blog/${slug}?id=${article.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          className="w-full h-48 object-cover"
          src={article.coverImage}
          alt={article.title}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.map(tag => (
              <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <time className="text-sm text-gray-500">{formattedDate}</time>
        </div>
      </div>
    </Link>
  );
}