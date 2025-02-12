import { prisma } from '@/app/prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/utils/auth.options';

export async function POST(request: Request) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  const article = await prisma.article.create({
    data: {
      title: data.title,
      content: data.content,
      // For simplicity, generate a slug from the title
      slug: data.title.toLowerCase().replace(/ /g, '-'),
      author: { connect: { id: (session as any).user.id } },
    },
  });
  return NextResponse.json(article);
}
