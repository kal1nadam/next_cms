'use client';

import { Button, Group, Stack, Text } from '@mantine/core';
import { useTransition } from 'react';

interface Tag {
  id: string;
  name: string;
}

interface TagListProps {
  tags: Tag[];
  onDelete: (id: string) => void;
}

export default function TagList({ tags, onDelete }: TagListProps) {
  const [isPending, startTransition] = useTransition();

return (
    <Stack gap="xs">
        {tags.map((tag) => (
            <Group key={tag.id} gap="apart" p="xs" bg="gray.1" style={{ borderRadius: 8 }}>
                <Text>{tag.name}</Text>
                <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    onClick={() => startTransition(() => onDelete(tag.id))}
                    disabled={isPending}
                    loading={isPending}
                >
                    Delete
                </Button>
            </Group>
        ))}
    </Stack>
);
}
