// src/app/layout.tsx
import { MantineProvider } from '@mantine/core';
import { NavbarMinimalColored } from '@/components/NavbarMinimalColored';
import '@/app/globals.css'; // Your global styles (if any)
import '@mantine/core/styles.css';

export const metadata = {
  title: 'My CMS Application',
  description: 'A Next.js CMS Application using Mantine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the app in MantineProvider to enable Mantine styles and theme */}
        <MantineProvider>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Navbar that appears on every page */}
            <NavbarMinimalColored />
            {/* Main content area */}
            <main style={{ flex: 1, padding: '20px' }}>
              {children}
            </main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
