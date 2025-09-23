
'use client';

import * as React from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { Sun, Moon, Laptop, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Re-export ThemeProvider from next-themes
export { ThemeProvider } from 'next-themes';

export function useTheme() {
    const { setTheme, resolvedTheme, themes: nextThemes } = useNextTheme();
    return {
        theme: resolvedTheme,
        setTheme,
        themes: [ // Keep your original theme definitions for the UI
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Laptop },
            { value: 'theme-pinkpurple', label: 'Pink/Purple', icon: Bot },
        ]
    };
}

export function ThemeSwitcher() {
  const { setTheme } = useNextTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => setTheme('theme-pinkpurple')}>
          <Bot className="mr-2 h-4 w-4" />
          <span>Pink/Purple</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
