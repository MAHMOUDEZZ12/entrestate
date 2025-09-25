
import React from 'react';
import { WorkspaceSidebar } from '@/components/workspace-sidebar';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full overflow-hidden">
        <WorkspaceSidebar />
        <div className="flex-1 overflow-y-auto">
            {children}
        </div>
    </div>
  );
}
