

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Menu } from 'lucide-react';
import { Logo } from './logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
    { name: 'Apps', href: '/me/marketing' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Community', href: '/me/community' },
];

export function LandingHeader() {
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-auto flex">
          <div className="mr-6 flex items-center space-x-2">
            <Logo href="/" />
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <Button variant="ghost">{link.name}</Button>
                </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
           <Link href="/login">
              <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/login">
              <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="p-6">
                        <Logo href="/" />
                        <nav className="mt-8 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <SheetClose asChild key={link.name}>
                                    <Link href={link.href}>
                                        <Button variant="ghost" className="w-full justify-start text-lg">{link.name}</Button>
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
