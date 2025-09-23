
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Check, Zap } from 'lucide-react';
import type { Feature } from '@/lib/tools-client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

interface DashboardServiceCardProps {
    tool: Feature;
    isAdded: boolean;
    setIsAdded: (isAdded: boolean) => void;
    connectionRequired?: string;
    paymentRequired?: boolean;
}

export const DashboardServiceCard = ({ tool, isAdded, setIsAdded, connectionRequired, paymentRequired }: DashboardServiceCardProps) => {
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(true);
    toast({
      title: `${tool.title} Added!`,
      description: `The "${tool.title}" app is now available in your workspace.`,
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdded(false);
    toast({
      title: `${tool.title} Removed`,
      description: `The app has been removed from your workspace.`,
      variant: 'destructive',
    });
  };

  const actionButton = isAdded ? (
    <Button variant="outline" size="sm" onClick={handleRemove} className="w-full">
      <Check className="mr-2 h-4 w-4" /> Added
    </Button>
  ) : (
    <Button size="sm" onClick={handleAdd} className="w-full">
      <Plus className="mr-2 h-4 w-4" /> Add to Workspace
    </Button>
  );

  return (
    <Link href={tool.href} className="block group">
        <Card className="h-full flex flex-col hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
                <div className="flex justify-between items-start">
                     <div className="p-3 rounded-lg text-white mb-4" style={{ backgroundColor: tool.color }}>
                        {React.cloneElement(tool.icon, { className: 'h-6 w-6' })}
                    </div>
                    {tool.badge && <Badge variant={tool.badge === 'DEPRECATED' ? 'destructive' : 'default'}>{tool.badge}</Badge>}
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
                <div className="w-full space-y-2">
                    {connectionRequired && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Zap className="h-3 w-3 text-amber-500" />
                            Requires {connectionRequired} connection
                        </div>
                    )}
                    {actionButton}
                </div>
            </CardFooter>
        </Card>
    </Link>
  );
};
