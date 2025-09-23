

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        // This layout is deprecated and now redirects to the new /me layout.
        // We replace the current history entry to avoid breaking the back button.
        router.replace('/me');
    }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
