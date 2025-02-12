'use client';

import { useEffect, useState, useTransition } from 'react';
import TagList from '@/components/TagList';
import { Button, TextInput } from '@mantine/core';

export default function DashboardTagsPage() {
  const [tags, setTags] = useState<{ id: string; name: string }[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [isPending, startTransition] = useTransition();

  async function fetchTags() {
    const response = await fetch('/api/tags');
    const data = await response.json();
    setTags(data);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  async function handleCreateTag(e: React.FormEvent) {
    e.preventDefault();
    if (!newTagName.trim()) return;

    const response = await fetch('/api/tags', {
      method: 'POST',
      body: JSON.stringify({ name: newTagName }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setNewTagName('');
      startTransition(() => fetchTags());
    }
  }

  async function handleDeleteTag(id: string) {
    const response = await fetch(`/api/tags/${id}`, { method: 'DELETE' });

    if (response.ok) {
      startTransition(() => fetchTags());
    }
  }

  return (
    <div>
      <h1>Manage Tags</h1>

      {/* Create New Tag Form */}
      <form onSubmit={handleCreateTag}>
        <TextInput
          w={300}
          type="text"
          placeholder="New tag name"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          disabled={isPending}
        />
        <Button mb='xl' mt='xs' type="submit" disabled={isPending}>
          Create Tag
        </Button>
      </form>

      {/* Tag List Component */}
      <TagList tags={tags} onDelete={handleDeleteTag} />
    </div>
  );
}
