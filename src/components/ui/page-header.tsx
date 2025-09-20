'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: React.ReactElement;
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 border-b">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
