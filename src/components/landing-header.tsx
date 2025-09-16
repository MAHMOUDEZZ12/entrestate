
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Laptop, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from './theme-switcher';

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, themes } = useTheme();
  
  const navLinks = [
    { name: 'Pricing', href: '/pricing' },
    { name: 'Apps', href: '/apps' },
    { name: 'Market', href: '/market' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center gap-6">
            <Logo />
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Button variant="ghost">{link.name}</Button>
                </Link>
              ))}
            </nav>
        </div>
        <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
                <Button>Account</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 {themes.map((t) => (
                    <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                    <t.icon className="mr-2 h-4 w-4" />
                    <span>{t.label}</span>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full">
                 <div className="p-4 flex flex-col h-full">
                     <div className="flex justify-between items-center mb-8">
                        <Logo />
                        <div className="flex items-center">
                             <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                  <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                  <span className="sr-only">Toggle theme</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {themes.map((t) => (
                                    <DropdownMenuItem key={t.value} onClick={() => setTheme(t.value)}>
                                    <t.icon className="mr-2 h-4 w-4" />
                                    <span>{t.label}</span>
                                    </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                <X className="h-6 w-6" />
                                 <span className="sr-only">Close menu</span>
                            </Button>
                        </div>
                    </div>
                    <nav className="flex flex-col items-center gap-6 text-center">
                         {navLinks.map((link) => (
                             <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                                <span className="text-2xl font-semibold text-foreground hover:text-primary transition-colors">{link.name}</span>
                            </Link>
                        ))}
                    </nav>
                     <div className="mt-auto flex flex-col gap-4">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button className="w-full text-lg py-6">Account</Button>
                        </Link>
                    </div>
                 </div>
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
