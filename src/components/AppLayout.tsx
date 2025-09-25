
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/app/landing-footer';

// This component handles the distinction between public and authenticated layouts.
// The authenticated layout is now handled by the layout.tsx files within the /me directory structure.

const publicRoutes = ['/', '/about', '/pricing', '/blog', '/solutions', '/login', '/support', '/status', '/technology', '/privacy', '/terms', '/cookies', '/marketplace', '/superfreetime', '/sx3-mindmap', '/gem', '/resources/flows', '/academy'];
const publicPrefixes = ['/blog/', '/solutions/', '/gem/'];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname) || 
                        publicPrefixes.some(prefix => pathname.startsWith(prefix)) ||
                        pathname === '/discover/search';

  // If it's not a public route, it's an authenticated route, and its layout is handled by its own layout.tsx file.
  if (!isPublicRoute) {
      return <>{children}</>;
  }

  // Render the public layout with a header and footer.
  return (
      <>
        <LandingHeader />
        <main className="flex-1">
            {children}
        </main>
        <LandingFooter />
      </>
  );
}
