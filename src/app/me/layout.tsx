
import React from 'react';
import { WorkspaceHeader } from '@/components/workspace-header';
import { GlobalChat } from '@/components/global-chat';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
        {/* The main header for the entire /me section */}
        <WorkspaceHeader />
        <main className="flex-1 overflow-y-auto pt-0">
             {children}
        </main>
        {/* The Analog Bar is persistent across the /me section */}
        <GlobalChat />
    </div>
  );
}
