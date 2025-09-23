
'use client';

import React from 'react';
import { useSensitiveArea } from '@/context/SensitiveAreaContext';

interface SensitiveAreaProps {
  hint: string;
  children: React.ReactNode;
  className?: string;
}

export function SensitiveArea({ hint, children, className }: SensitiveAreaProps) {
  const { setActiveHint, clearActiveHint } = useSensitiveArea();

  return (
    <div
      onMouseEnter={() => setActiveHint(hint)}
      onMouseLeave={clearActiveHint}
      className={className}
    >
      {children}
    </div>
  );
}
