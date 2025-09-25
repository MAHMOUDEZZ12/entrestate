
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In a real application, this would come from a secure database role system.
const ADMIN_USERNAMES = ['dev'];

const isProtectedRoute = (path: string) => path.startsWith('/me') || path.startsWith('/onboarding');
const isAdminRoute = (path: string) => path.startsWith('/gem');

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) {
        // Firebase isn't initialized, likely due to missing config.
        // We'll treat this as a logged-out state.
        setLoading(false);
        if(isProtectedRoute(pathname)) {
            router.push('/me'); // Redirect to login/auth form page
        }
        return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // In a real app, you'd get the custom claim from the id token
        // For this simulation, we check a hardcoded list.
        const isAdminUser = ADMIN_USERNAMES.includes(user.displayName || '');
        setIsAdmin(isAdminUser);
        
        // Fetch user doc to check if onboarding is complete
        // This is a client-side fetch, should be an API call
        // For now, we'll assume new users need onboarding
        const userDocRef = `/users/${user.uid}`; // Path for a hypothetical API
        // const response = await fetch(userDocRef); 
        // const userData = await response.json();
        // const onboardingComplete = userData?.onboarding?.progress?.step === 4;
        
        // MOCK: Forcing onboarding for new users if they land on /me
        const onboardingComplete = localStorage.getItem('onboardingComplete') === 'true';

        if (!onboardingComplete && pathname !== '/onboarding' && pathname !== '/me') {
          router.push('/onboarding');
        } else if (isAdminRoute(pathname) && !isAdminUser) {
          router.push('/me'); // Not an admin, redirect to workspace
        }

      } else {
        setIsAdmin(false);
        if (isProtectedRoute(pathname)) {
          router.push('/me'); // Redirect to the /me page which now serves as the login form
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);
  

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
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
