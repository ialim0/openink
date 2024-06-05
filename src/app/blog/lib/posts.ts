// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getPostContent = (slug: string) => {
  const filePath = path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { data, content };
};

export const generateStaticParams = async () => {
  const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
};