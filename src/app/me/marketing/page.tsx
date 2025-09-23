
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DeprecatedMarketingPage() {
  const router = useRouter();

  useEffect(() => {
    // This page is deprecated and now redirects to the new /apps page.
    router.replace('/apps');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <p className="ml-4">Redirecting to the new App Store...</p>
    </div>
  );
}
