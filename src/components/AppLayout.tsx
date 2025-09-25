
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/app/landing-footer';
import { WorkspaceHeader } from './workspace-header';
import { GlobalChat } from './global-chat';

const publicRoutes = ['/', '/about', '/pricing', '/blog', '/solutions', '/login', '/support', '/status', '/technology', '/privacy', '/terms', '/cookies', '/marketplace', '/superfreetime', '/sx3-mindmap', '/gem', '/resources/flows'];
const publicPrefixes = ['/blog/', '/solutions/', '/gem/'];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if the current route is a public-facing page
  const isPublicRoute = publicRoutes.includes(pathname) || 
                        publicPrefixes.some(prefix => pathname.startsWith(prefix)) ||
                        pathname === '/discover/search';

  // Specific layout for auth pages like login or onboarding
  const isAuthRoute = pathname === '/login' || pathname === '/onboarding';

  if (isAuthRoute) {
    return (
      <>
        <LandingHeader />
        {children}
      </>
    );
  }
  
  if (isPublicRoute) {
      return (
          <>
            <LandingHeader />
            {children}
            <LandingFooter />
          </>
      )
  }

  // Default layout for the authenticated workspace
  return (
    <>
        <WorkspaceHeader />
        <main className="flex-1 overflow-y-auto pb-24 pt-0">
             {children}
        </main>
        <GlobalChat />
    </>
  );
}
