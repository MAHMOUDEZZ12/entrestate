
'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactElement;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, icon, children }: PageHeaderProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 border-b">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1 hidden sm:block">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
              {description}
            </p>
          </div>
        </div>
        {children && <div className="mt-4 md:mt-0 flex-shrink-0">{children}</div>}
      </div>
    </div>
  );
}

    