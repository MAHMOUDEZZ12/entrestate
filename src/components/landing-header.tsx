
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon, Search, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTheme } from './theme-switcher';
import { CommandMenu } from './ui/command-menu';

const ENTRESTATE_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/mtcmartechgooodstage-456-326b5.firebasestorage.app/o/entrestate.com%20logo-10%20(1).png?alt=media&token=3fda1757-c752-4fae-a7b3-c50e8435b17a';

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = React.useState(false);
  const { setTheme, themes } = useTheme();

  const navLinks = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Apps', href: '/apps' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-auto flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2"> 
                <Image 
                  src={ENTRESTATE_LOGO_URL} 
                  alt="Entrestate Logo" 
                  width={140} 
                  height={32} 
                  className="w-auto h-8 object-contain"
                  priority
                />
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                    <Link key={link.name} href={link.href}>
                      <Button variant="ghost">{link.name}</Button>
                    </Link>
                ))}
              </nav>
          </div>
          <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-muted-foreground"
                onClick={() => setIsCommandMenuOpen(true)}
              >
                <Search className="h-4 w-4" />
                <span>Search...</span>
                <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
               <Link href="/login">
                  <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/signup">
                  <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
          </div>
          <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full">
                   <div className="p-4 flex flex-col h-full">
                       <div className="flex justify-between items-center mb-8">
                          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image 
                              src={ENTRESTATE_LOGO_URL} 
                              alt="Entrestate Logo" 
                              width={140} 
                              height={32} 
                              className="w-auto h-8 object-contain"
                              priority
                            />
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                              <X className="h-6 w-6" />
                               <span className="sr-only">Close menu</span>
                          </Button>
                      </div>
                      <nav className="flex flex-col items-center gap-6 text-center">
                           {navLinks.map((link) => (
                               <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                                  <span className="text-2xl font-semibold text-foreground hover:text-primary transition-colors">{link.name}</span>
                              </Link>
                          ))}
                      </nav>
                       <div className="mt-auto flex flex-col gap-4">
                          <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                              <Button className="w-full text-lg py-6">Get Started</Button>
                          </Link>
                           <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                              <Button className="w-full text-lg py-6" variant="ghost">Log In</Button>
                          </Link>
                      </div>
                   </div>
                </SheetContent>
              </Sheet>
          </div>
        </div>
      </header>
      <CommandMenu open={isCommandMenuOpen} setOpen={setIsCommandMenuOpen} />
    </>
  );
}
