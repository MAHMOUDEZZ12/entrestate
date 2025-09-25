
import React from 'react';

export default function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
        {/* The sidebar is now part of the AppLayout component */}
        {/* The main content area will be rendered here, managed by AppLayout */}
        <div className="flex-1 overflow-y-auto">
            {children}
        </div>
    </div>
  );
}
