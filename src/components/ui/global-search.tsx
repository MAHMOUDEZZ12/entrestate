
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
import { tools, Feature, FilterCategory } from '@/lib/tools-client';
import { File, LayoutDashboard, Settings, User, Search, Bot, Sparkles, Palette, Database } from 'lucide-react';
import { useTabManager } from '@/context/TabManagerContext';

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const allTools = tools.filter(t => t.id !== 'superfreetime');

const navigationItems = [
    { href: '/me/settings', label: 'Settings', icon: <Settings className="mr-2 h-4 w-4" />},
    { href: '/me/brand', label: 'Brand & Assets', icon: <Palette className="mr-2 h-4 w-4" />},
    { href: '/me/assistant', label: 'AI Assistant', icon: <Bot className="mr-2 h-4 w-4" />},
    { href: '/me/tool/projects-finder', label: 'Market Library', icon: <Database className="mr-2 h-4 w-4" />}
];

const categories: FilterCategory[] = ['Marketing', 'Creative', 'Sales Tools', 'Lead Gen', 'Social & Comms', 'Web', 'Editing', 'Ads', 'Market Intelligence', 'CRM', 'Developer'];

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

  const groupedTools = useMemo(() => {
    if (query.trim() === '') {
        return categories.map(category => ({
            category,
            tools: allTools.filter(tool => tool.categories.includes(category))
        })).filter(group => group.tools.length > 0);
    } else {
        const filtered = allTools.filter(tool =>
            tool.title.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase())
        );
        if (filtered.length > 0) {
            return [{ category: 'Search Results', tools: filtered }];
        }
        return [];
    }
  }, [query]);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput 
        placeholder="Search for tools, projects, or actions..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {groupedTools.map(group => (
            <CommandGroup key={group.category} heading={group.category}>
                {group.tools.map((tool) => (
                    <CommandItem key={tool.id} onSelect={() => handleToolSelect(tool)} value={`${tool.title} ${tool.description}`}>
                        <div className="p-1.5 rounded-md text-white mr-2" style={{backgroundColor: tool.color}}>
                            {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                        </div>
                        <span>{tool.title}</span>
                    </CommandItem>
                ))}
            </CommandGroup>
        ))}

        <CommandSeparator />
        
        <CommandGroup heading="Navigation">
           {navigationItems.map(item => (
                <CommandItem key={item.href} onSelect={() => handleSelect(item.href, item.label)}>
                   {item.icon}
                   <span>{item.label}</span>
                </CommandItem>
           ))}
         </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
