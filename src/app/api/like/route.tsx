import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
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

  const ip = req.ip;
  if (ip) {
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

  const likes = await redis.get<number>(['likes', 'posts', slug].join(':')) || 0;
  return new NextResponse(JSON.stringify({ likes }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}