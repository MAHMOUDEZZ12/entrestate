
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, LayoutDashboard } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Blog', href: '/blog' },
    { name: 'Academy', href: '/academy' },
];

export function LandingHeader() {
  const { user } = useAuth();
  
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
          {user ? (
            <Link href="/me">
              <Button variant="outline"><LayoutDashboard className="mr-2 h-4 w-4" /> Go to Hub</Button>
            </Link>
          ) : (
            <Link href="/me">
              <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          )}
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
                             <SheetClose asChild>
                                {user ? (
                                    <Link href="/me">
                                        <Button variant="outline" className="w-full justify-start text-lg">Go to Hub</Button>
                                    </Link>
                                ) : (
                                     <Link href="/me">
                                        <Button className="w-full justify-start text-lg">Get Started</Button>
                                    </Link>
                                )}
                             </SheetClose>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
