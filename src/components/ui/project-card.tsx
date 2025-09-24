
'use client';

import { Button } from './button';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';
import Image from 'next/image';
import { Building } from 'lucide-react';

export function ProjectCard({
  project, selectable=false, selected=false, onToggle, actions
}: {
  project: {
    id: string;
    badge?: string; name: string; developer: string; area: string;
    priceFrom?: string | number; unitTypes?: string[]; handover?: string; thumbnailUrl?: string;
  };
  selectable?: boolean; selected?: boolean;
  onToggle?: () => void; actions?: React.ReactNode;
}) {
  const cardContent = (
    <>
      <div className="relative w-full h-32 bg-muted">
        <Image 
            src={project.thumbnailUrl || `https://picsum.photos/seed/${project.id}/300/200`}
            alt={project.name}
            fill
            sizes="300px"
            className="object-cover"
            data-ai-hint="building exterior"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        {project.badge && <span className="text-xs rounded-full border px-2 py-0.5 text-muted-foreground w-fit mb-2">{project.badge}</span>}
        <h4 className="font-semibold flex-grow">{project.name}</h4>
        <p className="text-sm text-muted-foreground">{project.developer} • {project.area}</p>
        {project.priceFrom && <p className="mt-1 text-sm">From {project.priceFrom}</p>}
        {actions && <div className="mt-4 flex gap-2 items-center">{actions}</div>}
      </div>
    </>
  );

  const cardContainerClasses = cn(
    "rounded-lg border bg-card text-card-foreground h-full flex flex-col hover:border-primary/50 transition-colors overflow-hidden",
    selected && "border-primary ring-2 ring-primary/50"
  );

  if (selectable) {
    return (
      <button onClick={onToggle} className={cn("w-full text-left h-full", cardContainerClasses)}>
        {cardContent}
      </button>
    );
  }

  return (
    <div className={cardContainerClasses}>
      {cardContent}
    </div>
  );
}
