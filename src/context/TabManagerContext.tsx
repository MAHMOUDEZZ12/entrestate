
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { tools } from '@/lib/tools-client';

interface Tab {
  href: string;
  label: string;
}

interface TabManagerContextType {
  openTabs: Tab[];
  activeTab: Tab | null;
  addTab: (tab: Tab) => void;
  removeTab: (href: string) => void;
}

const TabManagerContext = createContext<TabManagerContextType | undefined>(undefined);

const navMap: {[key: string]: string} = {
    '/dashboard': 'Home',
    '/dashboard/marketing': 'Apps',
    '/dashboard/tool/projects-finder': 'Market Library',
    '/dashboard/brand': 'Brand & Assets',
    '/dashboard/clients': 'Client Pages',
    '/dashboard/leads': 'Leads (CRM)',
    '/dashboard/assistant': 'AI Assistant',
    '/dashboard/settings': 'Settings',
};

const getLabelForPath = (path: string): string => {
    if (navMap[path]) return navMap[path];
    if (path.startsWith('/dashboard/tool/')) {
        const toolId = path.split('/')[3];
        const tool = tools.find(t => t.id === toolId);
        return tool?.title || 'Tool';
    }
    const name = path.split('/').pop()?.replace(/-/g, ' ') || 'Page';
    return name.charAt(0).toUpperCase() + name.slice(1);
}


export const TabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openTabs, setOpenTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // This effect synchronizes the URL with the tab state on initial load and on navigation.
  useEffect(() => {
    if (pathname.startsWith('/dashboard')) {
        const currentTab = openTabs.find(tab => tab.href === pathname);
        if (!currentTab) {
            // If the tab doesn't exist, add it.
            const newTab = { href: pathname, label: getLabelForPath(pathname) };
            setOpenTabs(prev => {
                // Avoid adding duplicates if another effect is running
                if (prev.some(t => t.href === newTab.href)) return prev;
                return [...prev, newTab]
            });
            setActiveTab(newTab);
        } else {
            // If it exists, just set it as active.
            setActiveTab(currentTab);
        }
    }
  }, [pathname]); // Rerun whenever the path changes


  const addTab = useCallback((newTab: Tab) => {
    setOpenTabs((prevTabs) => {
      if (prevTabs.some(tab => tab.href === newTab.href)) {
        return prevTabs;
      }
      return [...prevTabs, newTab];
    });
  }, []);

  const removeTab = useCallback((hrefToRemove: string) => {
    let nextActiveTab: Tab | null = null;
    const remainingTabs = openTabs.filter((tab) => tab.href !== hrefToRemove);

    if (pathname === hrefToRemove && remainingTabs.length > 0) {
        // If we closed the active tab, navigate to the last remaining tab
        nextActiveTab = remainingTabs[remainingTabs.length - 1];
        router.push(nextActiveTab.href);
    }
    
    setOpenTabs(remainingTabs);

    if(remainingTabs.length === 0) {
        router.push('/dashboard');
    }
  }, [openTabs, pathname, router]);

  const value = { openTabs, activeTab, addTab, removeTab };

  return (
    <TabManagerContext.Provider value={value}>
      {children}
    </TabManagerContext.Provider>
  );
};

export const useTabManager = () => {
  const context = useContext(TabManagerContext);
  if (context === undefined) {
    throw new Error('useTabManager must be used within a TabProvider');
  }
  return context;
};
