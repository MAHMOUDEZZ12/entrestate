

'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { tools, Feature } from '@/lib/tools-client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ToolPlaceholderProps {
  toolId: string;
}

export function ToolPlaceholder({ toolId }: ToolPlaceholderProps) {
  const tool = tools.find(t => t.id === toolId);

  if (!tool) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full p-8">
        <h1 className="text-4xl font-bold font-heading mb-4">Tool Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          The tool you are looking for does not exist or may have been moved.
        </p>
        <Link href="/me/marketing">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title={tool.title}
        description={tool.longDescription}
        icon={React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
      />
      <div className="p-4 md:p-6">
        <Card className="bg-card/80 backdrop-blur-lg h-[calc(100vh-300px)] flex items-center justify-center">
          <CardContent className="text-center">
            <h3 className="text-2xl font-bold font-heading mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              The interactive UI for the "{tool.title}" tool is currently in development.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    