// src/app/layout.tsx
import { MantineProvider } from '@mantine/core';
import { NavbarMinimalColored } from '@/components/NavbarMinimalColored';
import '@/app/globals.css'; // Your global styles (if any)
import '@mantine/core/styles.css';
import Script from 'next/script';

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
      <head>
       <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "q8maksh7fc");
          `}
         </Script>
      </head>
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
