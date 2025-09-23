
'use client';

import React, { useState } from 'react';
import { AssistantChat } from './assistant-chat';
import { cn } from '@/lib/utils';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

type Mode = 'chat' | 'map' | 'search' | 'pilot' | 'support';

export function GlobalIntelligenceSidebar() {
  const [activeMode, setActiveMode] = useState<Mode>('chat');

  const renderContent = () => {
    switch (activeMode) {
      case 'chat':
        return <AssistantChat />;
      // ... other cases for map, search, etc. will go here
      default:
        return <AssistantChat />;
    }
  };

  return (
     <aside className="h-screen max-h-screen border-l bg-background hidden md:flex flex-col">
       {renderContent()}
    </aside>
  );
}
