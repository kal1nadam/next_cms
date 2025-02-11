// src/app/dashboard/layout.tsx
// Layout for the dashboard section.
// This layout checks for user authentication and provides navigation.
// (Assuming you use NextAuth or a similar library for auth)

import { getSession } from '@/auth/auth';
import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is authenticated
  const session = await getSession();
  if (!session) {
    // Redirect unauthenticated users to the login page
    redirect('/pages/auth');
  }

  return (
    <div>
      <nav style={{ marginBottom: '1rem' }}>
        <Group gap="md">
          <Link href="/dashboard/articles">
            <Button variant="outline">
              Articles
            </Button>
          </Link>
          <Link href="/dashboard/tags">
            <Button variant="outline">
              Tags
            </Button>
          </Link>
        </Group>
      </nav>
      <main>{children}</main>
    </div>
  );
}
