
'use client';

import React, { useState } from 'react';
import { Bot, Map, Search, Sparkles, LifeBuoy } from 'lucide-react';
import { AssistantChat } from './assistant-chat';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type SidebarMode = 'chat' | 'search' | 'map' | 'pilot' | 'support';

const modes: { id: SidebarMode; icon: React.ReactNode; label: string }[] = [
    { id: 'chat', icon: <Bot />, label: 'AI Assistant' },
    { id: 'search', icon: <Search />, label: 'Global Search' },
    { id: 'map', icon: <Map />, label: 'Market Map' },
    { id: 'pilot', icon: <Sparkles />, label: 'Auto-Pilots' },
    { id: 'support', icon: <LifeBuoy />, label: 'Support' },
];

export function GlobalIntelligenceSidebar() {
    const [activeMode, setActiveMode] = useState<SidebarMode>('chat');

    const renderContent = () => {
        switch (activeMode) {
            case 'chat':
                return <AssistantChat />;
            default:
                return (
                    <div className="flex h-full flex-col items-center justify-center text-center p-4">
                        <div className="p-4 bg-muted rounded-full mb-4">
                           {modes.find(m => m.id === activeMode)?.icon}
                        </div>
                        <h3 className="font-semibold text-lg">
                            {modes.find(m => m.id === activeMode)?.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            This feature is under development.
                        </p>
                    </div>
                );
        }
    }

    return (
        <aside className="w-96 border-l bg-background flex flex-col h-screen sticky top-0 right-0">
            <div className="flex-1 overflow-hidden">
                {renderContent()}
            </div>
            <div className="border-t p-2">
                <div className="flex justify-around">
                     <TooltipProvider>
                        {modes.map(mode => (
                             <Tooltip key={mode.id}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setActiveMode(mode.id)}
                                        className={cn(
                                            "p-3 rounded-lg hover:bg-muted transition-colors",
                                            activeMode === mode.id ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        )}
                                    >
                                        {React.cloneElement(mode.icon as React.ReactElement, { className: 'h-5 w-5' })}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>{mode.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
            </div>
        </aside>
    );
}
