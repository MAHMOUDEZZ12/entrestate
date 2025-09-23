
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import React from 'react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback } from './ui/avatar';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import { tools, ToolData } from '@/lib/tools-data';

const marketingTools = tools.filter(t => t.categories.includes('Marketing') || t.categories.includes('Ads'));
const creativeTools = tools.filter(t => t.categories.includes('Creative') || t.categories.includes('Editing') || t.categories.includes('Video'));
const salesTools = tools.filter(t => t.categories.includes('Sales Tools') || t.categories.includes('CRM'));
const intelligenceTools = tools.filter(t => t.categories.includes('Market Intelligence'));


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { tool: ToolData }
>(({ className, title, children, tool, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
            <div className="flex items-center gap-3">
                 <div className="p-2 rounded-md text-white" style={{backgroundColor: tool.color}}>
                    {React.cloneElement(tool.icon, { className: 'h-4 w-4' })}
                </div>
                <div>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {children}
                    </p>
                </div>
            </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export function DashboardHeader() {
  const { user } = useAuth();
  
  const handleLogout = async () => {
    await auth?.signOut();
  }

  const MegaMenu = ({category, items}: {category: string, items: ToolData[]}) => (
     <NavigationMenuItem>
        <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
        <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
            {items.map((tool) => (
                <ListItem
                    key={tool.title}
                    title={tool.title}
                    href={`/me/tool/${tool.id}`}
                    tool={tool}
                >
                    {tool.description}
                </ListItem>
            ))}
            </ul>
        </NavigationMenuContent>
    </NavigationMenuItem>
  )


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6">
       <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/me">
                <Logo />
            </Link>
        </div>
          
        <div className="flex-1 flex justify-center">
            <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    <MegaMenu category="Marketing & Ads" items={marketingTools} />
                    <MegaMenu category="Creative & Editing" items={creativeTools} />
                    <MegaMenu category="Sales & CRM" items={salesTools} />
                    <MegaMenu category="Intelligence" items={intelligenceTools} />
                </NavigationMenuList>
            </NavigationMenu>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
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
        </div>
    </header>
  );
}
