
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

// --- Admin ---
// In a real application, this would come from a secure database role system.
// For this simulation, we'll hardcode admin usernames.
const ADMIN_USERNAMES = [
    'admin',
    'dev',
    // Add your Firebase user's displayName here to grant yourself access
];

const isProtectedRoute = (path: string) => {
    return path.startsWith('/me') || path.startsWith('/onboarding');
};
  
const isAdminRoute = (path: string) => {
    return path.startsWith('/gem');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) {
        console.warn("Firebase Auth not initialized, user will be treated as logged out.");
        setLoading(false);
        // if (isProtectedRoute(pathname) || isAdminRoute(pathname)) {
        //     router.push('/login');
        // }
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      const userIsAdmin = user ? ADMIN_USERNAMES.includes(user.displayName || '') : false;
      setIsAdmin(userIsAdmin);
      setLoading(false);
      
      // --- Route Protection Logic (DISABLED) ---
      // if (user) {
      //   // User is logged in. Check if they are trying to access admin routes without permission.
      //   if (isAdminRoute(pathname) && !userIsAdmin) {
      //     router.push('/me'); // Redirect non-admins from /gem to /me
      //   }
      // } else {
      //   // User is not logged in. Protect all relevant routes.
      //   if (isProtectedRoute(pathname) || isAdminRoute(pathname)) {
      //     router.push('/login');
      //   }
      // }
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

  // Final check after loading (DISABLED)
  // if (!user && (isProtectedRoute(pathname) || isAdminRoute(pathname))) {
  //     // Don't render children, let the redirect happen.
  //     return (
  //        <div className="flex h-screen w-full items-center justify-center">
  //           <Loader2 className="h-8 w-8 animate-spin" />
  //       </div>
  //     );
  // }

  //  if (user && isAdminRoute(pathname) && !isAdmin) {
  //     // Don't render children, let the redirect happen.
  //     return (
  //        <div className="flex h-screen w-full items-center justify-center">
  //           <Loader2 className="h-8 w-8 animate-spin" />
  //       </div>
  //     );
  // }
  
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
