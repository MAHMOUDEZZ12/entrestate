
'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ToolRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const toolId = params.toolId as string;

  useEffect(() => {
    if (toolId) {
      router.replace(`/me/tool/${toolId}`);
    }
  }, [router, toolId]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
