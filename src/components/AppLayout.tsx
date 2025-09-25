
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/app/landing-footer';

const publicRoutes = ['/', '/about', '/pricing', '/blog', '/solutions', '/login', '/support', '/status', '/technology', '/privacy', '/terms', '/cookies', '/marketplace', '/superfreetime', '/sx3-mindmap', '/gem', '/resources/flows', '/academy', '/solutions/instagram-ad-value'];
const publicPrefixes = ['/blog/', '/solutions/', '/gem/'];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname) || 
                        publicPrefixes.some(prefix => pathname.startsWith(prefix)) ||
                        pathname === '/discover/search';

  if (!isPublicRoute) {
      return <>{children}</>;
  }

  // Render the public layout with a header and footer.
  return (
      <div className="flex flex-col min-h-screen">
        <LandingHeader />
        <main className="flex-1">
            {children}
        </main>
        <LandingFooter />
      </div>
  );
}
