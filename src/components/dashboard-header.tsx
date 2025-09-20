'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';
import { GlobalSearch } from '@/components/ui/global-search';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href="/dashboard" className="font-bold text-lg">WhatsMAP</Link>
            <Link href="/dashboard/marketing" className="text-muted-foreground hover:text-foreground">Marketing</Link>
            <Link href="/dashboard/flows" className="text-muted-foreground hover:text-foreground">Flows</Link>
            <Link href="/dashboard/brand" className="text-muted-foreground hover:text-foreground">Brand & Assets</Link>
            <Link href="/dashboard/settings" className="text-muted-foreground hover:text-foreground">Settings</Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="relative ml-auto flex-1 md:grow-0">
        <GlobalSearch />
      </div>
      {/* User Dropdown can be added here */}
    </header>
  );
}
