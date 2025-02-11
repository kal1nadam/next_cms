import { prisma } from '@/app/prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: parseInt(params.id, 10) },
    include: { tags: true },
  });
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  console.log('This log appears on the server console');
  const data = await request.json();

  const article = await prisma.article.update({
    where: { id: parseInt(params.id, 10) },
    data: {
      title: data.title,
      content: data.content,
      tags: {
        set: data.tags.map((tagId: string) => ({ id: parseInt(tagId, 10) })),
      },
    },
  });
  return NextResponse.json(article);
}
