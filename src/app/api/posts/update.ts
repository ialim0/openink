import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id, title, author, date, readTime, imageUrl, category, isFeatured, slug, content, excerpt, userId } = req.body;

    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: {
          title,
          author,
          date: new Date(date),
          readTime,
          imageUrl,
          category,
          isFeatured,
          slug,
          content,
          excerpt,
          userId,
        },
      });
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ error: 'Error updating blog post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
