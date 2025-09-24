
'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactElement;
  children?: React.ReactNode;
  simulation?: React.ReactNode;
}

export function PageHeader({ title, description, icon, children, simulation }: PageHeaderProps) {
  return (
    <div className="border-b">
        <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      {icon && (
                          <div className="p-3 bg-primary/10 text-primary rounded-lg mt-1 hidden sm:block">
                          {icon}
                          </div>
                      )}
                      <div>
                          <h1 className="text-2xl md:text-3xl font-bold font-heading tracking-tight">
                          {title}
                          </h1>
                          {description && 
                              <p className="mt-1 text-md text-muted-foreground max-w-3xl">
                              {description}
                              </p>
                          }
                      </div>
                    </div>
                     {children && <div className="flex-shrink-0">{children}</div>}
                </div>
                {simulation && (
                    <div className="row-start-1 md:col-start-2">
                        {simulation}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
