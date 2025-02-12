export const dynamic = 'force-dynamic';

import SearchBar from '@/components/SearchBar';
import { prisma } from '../prisma/client';
import Article from '@/components/Article';

type Props = {
  params: Promise<{
    query?: string
  }>
}

export default async function PublicPage({ params }: Props) {
  // Retrieve the search query (if any)
  const resolvedParams = await params;
  const query = resolvedParams.query || '';

  // Fetch published articles filtered by title
  const articles = await prisma.article.findMany({
    where: {
      // published: true,
      title: { contains: query},
    },
    include : {tags: true},
    orderBy: { createdAt: 'desc' },
  }).then(articles => articles.map(article => ({
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  })));

  return (
    <div>
      <h1>Articles</h1>
      <SearchBar initialQuery={query}/>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
}