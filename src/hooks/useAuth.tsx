
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getFirebase } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real application, this would come from a secure database role system.
const ADMIN_USER_EMAIL = 'dev@entrestate.com';

const isProtectedRoute = (path: string) => path.startsWith('/me') || path.startsWith('/onboarding');
const isAdminRoute = (path: string) => path.startsWith('/gem');

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const services = getFirebase();
    if (!services) {
        setLoading(false);
        if(isProtectedRoute(pathname) && pathname !== '/login') {
            router.push(`/login?redirect=${pathname}`); 
        }
        return;
    }

    const { auth } = services;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const isAdminUser = user.email === ADMIN_USER_EMAIL;
        setIsAdmin(isAdminUser);
        
        const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';

        if (!onboardingComplete && pathname !== '/onboarding') {
          router.push('/onboarding');
        } else if (isAdminRoute(pathname) && !isAdminUser) {
          router.push('/me/workspace'); // Redirect non-admins from admin routes
        }

      } else {
        setIsAdmin(false);
        // If user logs out or session expires, redirect them from protected routes to login
        if (isProtectedRoute(pathname) && pathname !== '/login') {
          router.push(`/login?redirect=${pathname}`);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);
  

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  const value = { user, loading, isAdmin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
