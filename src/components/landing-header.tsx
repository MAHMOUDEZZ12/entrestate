
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, LayoutDashboard, LogOut, Menu, Settings, Users2, Workflow } from 'lucide-react';
import { Logo } from './logo';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useAuth } from '@/hooks/useAuth';
import { auth } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from './ui/avatar';


const navLinks = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Apps', href: '/apps' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Community', href: '/community' },
];

export function LandingHeader() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await auth?.signOut();
  }

  const AuthNav = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">My Account</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/me"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/me/settings"><Settings className="mr-2 h-4 w-4" /> Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  const PublicNav = () => (
     <>
        <Link href="/login">
            <Button variant="ghost">Log In</Button>
        </Link>
        <Link href="/login">
            <Button>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
     </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-auto flex">
          <div className="mr-6 flex items-center space-x-2">
            <Logo href={user ? "/me" : "/"} />
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
          {!loading && (user ? <AuthNav /> : <PublicNav />)}
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
                        <Logo href={user ? "/me" : "/"} />
                        <nav className="mt-8 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <SheetClose asChild key={link.name}>
                                    <Link href={link.href}>
                                        <Button variant="ghost" className="w-full justify-start text-lg">{link.name}</Button>
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                         <div className="mt-8 pt-8 border-t border-border/40 flex flex-col gap-4">
                           {!loading && user ? (
                               <SheetClose asChild>
                                 <Link href="/me">
                                    <Button className="w-full">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </Link>
                               </SheetClose>
                           ) : (
                             <>
                                <SheetClose asChild>
                                 <Link href="/login">
                                    <Button variant="outline" className="w-full">Log In</Button>
                                </Link>
                               </SheetClose>
                               <SheetClose asChild>
                                 <Link href="/login">
                                    <Button className="w-full">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </Link>
                               </SheetClose>
                             </>
                           )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

      </div>
    </header>
  );
}
