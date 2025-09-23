
'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { File, Settings, Palette, Database, Bot } from 'lucide-react';
import { useTabManager } from '@/context/TabManagerContext';
import { AssistantChat } from '../assistant-chat';

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function GlobalSearch({ isOpen, setIsOpen }: GlobalSearchProps) {
  const [isDraggable, setIsDraggable] = useState(false);
  const router = useRouter();
  const { addTab } = useTabManager();

  useEffect(() => {
    try {
        const savedValue = localStorage.getItem('isSearchDraggable');
        setIsDraggable(savedValue === 'true');
    } catch (e) {
        // Handle cases where localStorage is not available
    }
  }, [isOpen]);
  
   useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);


  const handleSelect = (href: string, label: string) => {
    addTab({ href, label });
    router.push(href);
    setIsOpen(false);
  };
  
  const handleToolSelect = (tool: Feature) => {
    handleSelect(tool.href, tool.title);
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen} isDraggable={isDraggable}>
        {/* The AssistantChat component now lives inside the dialog and provides the main UI */}
        {/* The CommandInput from the chat will act as the search trigger */}
        <AssistantChat />
    </CommandDialog>
  );
}
