import { prisma } from '@/app/prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

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
      author: { connect: { id: session.user.id } },
    },
  });
  return NextResponse.json(article);
}
