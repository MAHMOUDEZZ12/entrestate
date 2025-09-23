
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DeprecatedToolPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/me/tool/listing-manager');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
