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

    const isNew = await redis.set(['deduplicate', hash, slug].join(':'), true, {
      nx: true,
      ex: 24 * 60 * 60,
    });
    if (!isNew) {
      return new NextResponse(null, { status: 202 });
    }
  }
  
  console.log("test 1")
  await redis.incr(['pageviews', 'posts', slug].join(':'));
  return new NextResponse(null, { status: 202 });
}