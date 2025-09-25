
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Check, Zap, ArrowRight } from 'lucide-react';
import type { Feature } from '@/lib/tools-client';
import { useToast } from '@/hooks/use-toast';
import { Badge } from './badge';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSpotlight } from '@/context/SpotlightContext';


interface DashboardServiceCardProps {
    tool: Feature;
    isAdded: boolean;
    setIsAdded: (isAdded: boolean) => void;
    connectionRequired?: string;
    paymentRequired?: boolean;
    className?: string;
    iconContainerClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export const DashboardServiceCard = ({ 
    tool, 
    isAdded, 
    setIsAdded, 
    connectionRequired, 
    paymentRequired, 
    className, 
    iconContainerClassName, 
    titleClassName, 
    descriptionClassName,
    buttonVariant = "outline"
}: DashboardServiceCardProps) => {
  const { toast } = useToast();
  const { setSpotlight, clearSpotlight } = useSpotlight();
  const icon = tool.icon;

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
    <Button size="sm" onClick={handleAdd} className="w-full" variant={buttonVariant || "default"}>
      <Plus className="mr-2 h-4 w-4" /> Add to Workspace
    </Button>
  );

  return (
    <Dialog>
        <DialogTrigger asChild>
            <div 
                className="block group cursor-pointer h-full"
                onMouseEnter={() => setSpotlight(tool)}
                onMouseLeave={clearSpotlight}
            >
                <Card 
                    className={cn(
                        "h-full flex flex-col hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-b-4",
                        className
                    )}
                    style={{'--card-border-color': tool.color, borderBottomColor: 'var(--card-border-color)'} as React.CSSProperties}
                >
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div className={cn("p-3 rounded-lg text-white mb-4", iconContainerClassName)} style={{ backgroundColor: iconContainerClassName ? undefined : tool.color }}>
                                {React.cloneElement(icon, { className: 'h-6 w-6' })}
                            </div>
                            {tool.badge && <Badge variant={tool.badge === 'DEPRECATED' ? 'destructive' : 'default'}>{tool.badge}</Badge>}
                        </div>
                        <CardTitle className={cn("text-lg", titleClassName)}>{tool.title}</CardTitle>
                        <CardDescription className={cn("text-xs line-clamp-2", descriptionClassName)}>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-auto">
                         <div className="w-full space-y-2">
                            {connectionRequired && (
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Zap className="h-3 w-3 text-amber-500" />
                                    Requires {connectionRequired} connection
                                </div>
                            )}
                            <Button variant={buttonVariant || "outline"} className="w-full" size="sm">
                                Details
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                     <div className="p-3 rounded-lg text-white" style={{ backgroundColor: tool.color }}>
                        {React.cloneElement(icon, { className: 'h-6 w-6' })}
                    </div>
                    <div>
                        <DialogTitle className="text-2xl">{tool.title}</DialogTitle>
                         {tool.badge && <Badge variant={tool.badge === 'DEPRECATED' ? 'destructive' : 'default'} className="mt-1">{tool.badge}</Badge>}
                    </div>
                </div>
                <DialogDescription className="text-base text-foreground/80">
                  {tool.longDescription}
                </DialogDescription>
            </DialogHeader>
             <DialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
                {actionButton}
                 <Link href={`/me/tool/${tool.id}`} className="w-full">
                    <Button variant="secondary" className="w-full">
                       Go to Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  );
};
