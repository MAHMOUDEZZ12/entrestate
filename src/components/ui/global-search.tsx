
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
import { File, LayoutDashboard, Settings, User, Search, Bot, Sparkles, Palette, Database, Clock, Star, Plus } from 'lucide-react';
import { useTabManager } from '@/context/TabManagerContext';

interface GlobalSearchProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const allTools = tools.filter(t => t.id !== 'superfreetime');

const shortcutItems = [
    { href: '/me/settings', label: 'Settings', icon: <Settings className="mr-2 h-4 w-4" />},
    { href: '/me/brand', label: 'Brand & Assets', icon: <Palette className="mr-2 h-4 w-4" />},
    { href: '/me/assistant', label: 'AI Assistant', icon: <Bot className="mr-2 h-4 w-4" />},
    { href: '/me/tool/projects-finder', label: 'Market Library', icon: <Database className="mr-2 h-4 w-4" />}
];

const mostSearchedItems = allTools.slice(0, 4);
const recentlyViewedItems = allTools.slice(4, 8);


export function GlobalSearch({ isOpen, setIsOpen }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
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

  const handleSelect = (href: string, label: string) => {
    addTab({ href, label });
    router.push(href);
    setIsOpen(false);
    setQuery('');
  };
  
  const handleToolSelect = (tool: Feature) => {
    handleSelect(tool.href, tool.title);
  }

  const searchResults = useMemo(() => {
    if (query.trim() === '') return [];
    
    return allTools.filter(tool =>
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) setQuery('');
    }} isDraggable={isDraggable && query.length > 0}>
      <CommandInput 
        placeholder="Search for tools, projects, or actions..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        {query.length > 0 ? (
            <>
              <CommandEmpty>No results found for "{query}".</CommandEmpty>
              <CommandGroup heading="Apps & Tools">
                {searchResults.map((tool) => (
                    <CommandItem key={tool.id} onSelect={() => handleToolSelect(tool)} value={`${tool.title} ${tool.description}`}>
                        <div className="p-1.5 rounded-md text-white mr-2" style={{backgroundColor: tool.color}}>
                            {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                        </div>
                        <span>{tool.title}</span>
                    </CommandItem>
                ))}
              </CommandGroup>
            </>
        ) : (
            <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-3">
                    <h4 className="font-semibold text-sm px-2 flex items-center gap-2"><Sparkles className="h-4 w-4" /> Shortcuts</h4>
                    {shortcutItems.map(item => (
                       <CommandItem key={item.href} onSelect={() => handleSelect(item.href, item.label)} className="text-muted-foreground">
                           {item.icon}
                           <span>{item.label}</span>
                       </CommandItem>
                    ))}
                </div>
                <div className="space-y-3">
                     <h4 className="font-semibold text-sm px-2 flex items-center gap-2"><Star className="h-4 w-4" /> Most Searched</h4>
                     {mostSearchedItems.map(tool => (
                        <CommandItem key={tool.id} onSelect={() => handleToolSelect(tool)} className="text-muted-foreground">
                             <div className="p-1.5 rounded-md text-white mr-2" style={{backgroundColor: tool.color}}>
                                {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                            </div>
                           <span>{tool.title}</span>
                       </CommandItem>
                     ))}
                </div>
                 <div className="space-y-3">
                     <h4 className="font-semibold text-sm px-2 flex items-center gap-2"><Clock className="h-4 w-4" /> Recently Viewed</h4>
                      {recentlyViewedItems.map(tool => (
                        <CommandItem key={tool.id} onSelect={() => handleToolSelect(tool)} className="text-muted-foreground">
                             <div className="p-1.5 rounded-md text-white mr-2" style={{backgroundColor: tool.color}}>
                                {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                            </div>
                           <span>{tool.title}</span>
                       </CommandItem>
                     ))}
                </div>
                 <div className="space-y-3">
                     <h4 className="font-semibold text-sm px-2 flex items-center gap-2"><Plus className="h-4 w-4" /> My Prompts</h4>
                     <CommandItem onSelect={() => {}} className="text-muted-foreground">
                        <span>Create new prompt...</span>
                     </CommandItem>
                </div>
            </div>
        )}
      </CommandList>
    </CommandDialog>
  );
}
