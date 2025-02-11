'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Textarea, TextInput, Title } from '@mantine/core';

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // POST the new article data to the API
    await axios.post('/api/articles', { title, content });
    // Redirect back to the articles management page after creation
    router.push('/dashboard/articles');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title order={1} mb="md">Create New Article</Title>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        mb="md"
      />
      <Textarea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        minRows={4}
        mb="md"
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
