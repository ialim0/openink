import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Likes helpers: guarantee a minimum like count per article
const MIN_LIKES = 25;
const MAX_RANDOM_LIKES = 60;
const randomLikes = () => Math.floor(Math.random() * (MAX_RANDOM_LIKES - MIN_LIKES + 1)) + MIN_LIKES;

let redis: Redis | null = null;
try {
  redis = Redis.fromEnv();
} catch (e) {
  console.warn('Redis env missing or invalid. Using random default likes.');
}
export const runtime = 'edge';

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  let slug: string | undefined = undefined;
  
  if ('slug' in body) {
    slug = body.slug;
  }
  
  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 });
  }

  if (!redis) {
    // No persistence possible, but respond OK to keep UX working
    return new NextResponse(null, { status: 200 });
  }

  const ip = req.headers.get('x-forwarded-for') || 
            req.headers.get('x-real-ip') || 
            req.headers.get('cf-connecting-ip') || 
            req.headers.get('x-client-ip') ||
            req.headers.get('x-forwarded') ||
            req.headers.get('forwarded-for') ||
            req.headers.get('forwarded') ||
            'unknown';

  if (ip && ip !== 'unknown') {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(ip),
    );
    const hash = Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const key = ['likes', hash, slug].join(':');
    const isNew = await redis.set(key, true, {
      nx: true,
      ex: 24 * 60 * 60,
    });

    if (!isNew) {
      return new NextResponse(null, { status: 204 });
    }
  }

  await redis.incr(['likes', 'posts', slug].join(':'));
  return new NextResponse(null, { status: 200 });
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 });
  }

  if (!redis) {
    const likes = randomLikes();
    return new NextResponse(JSON.stringify({ likes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const stored = (await redis.get<number>(['likes', 'posts', slug].join(':'))) || 0;
  const likes = stored >= MIN_LIKES ? stored : randomLikes();
  return new NextResponse(JSON.stringify({ likes }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}