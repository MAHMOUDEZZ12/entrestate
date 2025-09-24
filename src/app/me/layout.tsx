'use client';

import React from 'react';
import { WorkspaceHeader } from '@/components/workspace-header';
import { GlobalChat } from '@/components/global-chat';


export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <div className="flex min-h-screen w-full flex-col">
       <WorkspaceHeader />
        <div className="flex-1">
            {children}
        </div>
        <GlobalChat />
    </div>
  );
}
