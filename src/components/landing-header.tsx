
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Logo } from './logo';

const navLinks = [
    { name: 'Products', href: '/#pillars' },
    { name: 'Apps', href: '/apps' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Academy', href: '/community/academy' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-auto flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
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
           <Link href="/login">
              <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/login">
              <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
        {/* Mobile menu can be added here if needed */}
      </div>
    </header>
  );
}
