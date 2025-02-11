'use client';

import { Card, Text, Badge, Group } from '@mantine/core';

interface Tag {
  id: number;
  name: string;
}

interface ArticleData {
  id: number;
  title: string;
  content: string;
  slug: string;
  tags: Tag[];
}

interface ArticleProps {
  article: ArticleData;
}

export default function Article({ article }: ArticleProps) {
  return (
      <Card mb="sm" shadow="sm" padding="lg" radius="md" withBorder>
        <Text w={700} size="xl" mb="md">
          {article.title}
        </Text>
        <Text size="sm" c="dimmed" mb="md">
          {article.content}
        </Text>
        <Group gap="xs">
          {article.tags.map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.name}
            </Badge>
          ))}
        </Group>
      </Card>
  );
}
