'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Button, MultiSelect, Textarea, TextInput } from '@mantine/core';

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  // Article state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Tags state
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<{ value: string; label: string }[]>([]);

  // Fetch the article data, including its tags
  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        const article = response.data;
        setTitle(article.title);
        setContent(article.content);
        // Convert tag IDs to strings in case they're numbers

        console.log("article.tags", article.tags);
        setSelectedTags(
          article.tags?.map((tag: { id: number | string; name: string }) => tag.id.toString()) || []
        );
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    }
    fetchArticle();
  }, [id]);

  // Fetch all available tags from the database
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get('/api/tags');
        // Map the tags to the format needed by Mantine's MultiSelect component
        const tags = response.data.map((tag: { id: number | string; name: string }) => ({
          value: tag.id.toString(), // ensure value is a string
          label: tag.name,
        }));
        setAllTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
    fetchTags();
  }, []);

  // Handle article update with tags
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/articles/${id}`, {
        title,
        content,
        tags: selectedTags, // selected tag IDs as strings
      });
      router.push('/dashboard/articles');
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1>Edit Article</h1>
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
      <MultiSelect
        label="Tags"
        placeholder="Select tags"
        data={allTags}
        value={selectedTags}
        onChange={setSelectedTags}
        searchable
        mb="md"
      />
      <Button type="submit" color="blue">
        Update
      </Button>
    </form>
  );
}
