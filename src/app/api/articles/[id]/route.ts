import { prisma } from '@/app/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function GET(req: NextRequest, { params }: Props) {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { id: parseInt(resolvedParams.id, 10) },
    include: { tags: true },
  });
  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(article);
}

export async function PUT(request: NextRequest, { params }: Props) {
  console.log('This log appears on the server console');
  const data = await request.json();
  const resolvedParams = await params;

  const article = await prisma.article.update({
    where: { id: parseInt(resolvedParams.id, 10) },
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
