import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, author, date, readTime, imageUrl, category, isFeatured, slug, content, excerpt, userId } = req.body;

    try {
      const newPost = await prisma.post.create({
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
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog post' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
