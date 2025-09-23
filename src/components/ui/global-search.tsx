
'use client';

import React, { useState, useEffect } from 'react';
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
import { File, LayoutDashboard, Settings, User, Search, Bot, Sparkles } from 'lucide-react';
import { useTabManager } from '@/context/TabManagerContext';
import { LandingFooter } from '../landing-footer';

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const allTools = tools.filter(t => t.id !== 'superfreetime');

const searchCategories: {title: string, category: string }[] = [
    { title: 'Marketing & Ads', category: 'Marketing' },
    { title: 'Creative Suite', category: 'Creative' },
    { title: 'Sales & CRM', category: 'Sales Tools' },
    { title: 'Market Intelligence', category: 'Market Intelligence' },
];

export function GlobalSearch({ isOpen, setIsOpen }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { addTab } = useTabManager();

  const handleSelect = (href: string, label: string) => {
    addTab({ href, label });
    router.push(href);
    setIsOpen(false);
  };
  
  const handleToolSelect = (tool: Feature) => {
    handleSelect(tool.href, tool.title);
  }

  const filteredTools = query.trim() === ''
    ? allTools
    : allTools.filter(tool =>
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput 
        placeholder="Search for tools, projects, or actions..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Tools">
          {filteredTools.slice(0, 7).map((tool) => (
            <CommandItem key={tool.id} onSelect={() => handleToolSelect(tool)} value={tool.title}>
              <div className="p-1.5 rounded-md text-white mr-2" style={{backgroundColor: tool.color}}>
                {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
              </div>
              <span>{tool.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />
        
        <CommandGroup heading="Navigation">
           <CommandItem onSelect={() => handleSelect('/me/settings', 'Settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
          <CommandItem onSelect={() => handleSelect('/me/brand', 'Brand & Assets')}>
             <File className="mr-2 h-4 w-4" />
             <span>Brand & Assets</span>
           </CommandItem>
            <CommandItem onSelect={() => handleSelect('/me/assistant', 'AI Assistant')}>
              <Bot className="mr-2 h-4 w-4" />
              <span>AI Assistant</span>
            </CommandItem>
         </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
