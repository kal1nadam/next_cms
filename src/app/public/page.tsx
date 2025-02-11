
import SearchBar from '@/components/SearchBar';
import { prisma } from '../prisma/client';
import Article from '@/components/Article';

interface PublicPageProps {
  searchParams: { query?: string };
}

export default async function PublicPage({ searchParams }: PublicPageProps) {
  // Retrieve the search query (if any)
  const params = await searchParams;
  const query = params.query || '';

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