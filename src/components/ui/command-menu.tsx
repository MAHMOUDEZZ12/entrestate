

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { tools, Feature } from '@/lib/tools-client';
import { File, LayoutDashboard, Settings, User, Sparkles } from 'lucide-react';
import { useSpotlight } from '@/context/SpotlightContext';

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  const router = useRouter();
  const [isDraggable, setIsDraggable] = useState(false);
  const { clearSpotlight } = useSpotlight();

  useEffect(() => {
    try {
        const saved = localStorage.getItem('isSearchDraggable');
        setIsDraggable(saved === 'true');
    } catch(e) {}
  }, [open]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    clearSpotlight();
    command();
  };

  const handleSelectTool = (tool: Feature) => {
    runCommand(() => router.push(tool.href));
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} isDraggable={isDraggable}>
      <CommandInput 
        placeholder="Search for an app or page..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Tools & Apps">
          {tools.map((tool) => (
            <CommandItem key={tool.id} onSelect={() => handleSelectTool(tool)} value={tool.title}>
              {React.cloneElement(tool.icon, { className: 'mr-2 h-4 w-4' })}
              <span>{tool.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => runCommand(() => router.push('/solutions'))}>
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Solutions</span>
          </CommandItem>
           <CommandItem onSelect={() => runCommand(() => router.push('/about'))}>
             <File className="mr-2 h-4 w-4" />
             <span>About</span>
           </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/pricing'))}>
              <File className="mr-2 h-4 w-4" />
              <span>Pricing</span>
            </CommandItem>
         </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
