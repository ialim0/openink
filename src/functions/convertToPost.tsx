import { Article } from "@/lib/types";

interface NotionItem {
  id: string;
  properties: {
    title: { title: [{ text: { content: string } }] };
    date: { date: { start: string } };
    type: { select: { name: string } };
    slug: { rich_text: [{ text: { content: string } }] };
    status: { select: { name: string } };
    tags: { multi_select: { name: string }[] };
    summary: { rich_text: { text: { content: string } }[] };
    coverImage?: { files: [{ file: { url: string } }] };
    author: { created_by: { name: string } };
  };
}

export const convertToPost = (item: NotionItem): Article => ({
  id: item.id,
  title: item.properties.title.title[0].text.content,
  date: item.properties.date.date.start,
  type: item.properties.type.select.name,
  slug: item.properties.slug.rich_text[0].text.content,
  status: item.properties.status.select.name,
  tags: item.properties.tags.multi_select.map((tag) => tag.name),
  summary: item.properties.summary.rich_text.map((textObj) => textObj.text.content),
  coverImage: item.properties.coverImage?.files[0]?.file?.url ?? '',
  author: item.properties.author.created_by.name,
  wordCount: 0,
  readTime: undefined
});