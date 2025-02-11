import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/app/prisma/client';
import ArticleAdmin from '@/components/ArticleAdmin';
import { Button, Text } from '@mantine/core';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { NextResponse } from 'next/server';

export default async function DashboardArticlesPage() {

  // Retrieve user from session
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch all articles regardless of published status for admin management
  const articles = await prisma.article.findMany({
    where: { authorId: session.user.id },
    include: { tags: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <Text size='2.2em' mb='sm'>Manage Articles</Text>
      <Link href="/dashboard/articles/new">
        <Button mb='xl' color='green'>
           Create New article
        </Button>
      </Link>
      {articles.map((article) => (
        <ArticleAdmin key={article.id} article={article} />
      ))}
    </div>
  );
}
