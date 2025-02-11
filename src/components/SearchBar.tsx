'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Group, TextInput } from '@mantine/core';

interface SearchBarProps {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect with the new query parameter (adjust URL structure as needed)
    router.push(`/public?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <Group mb='sm' gap="sm">
        <TextInput
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <Button type="submit">Search</Button>
      </Group>
    </form>
  );
}
