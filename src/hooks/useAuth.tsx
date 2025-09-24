
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
    // DEVELOPMENT OVERRIDE: Simulate a logged-in user to bypass authentication.
    const mockUser = {
        uid: 'dev-user-123',
        displayName: 'dev', // Set to an admin username to access /gem
        email: 'dev@entrestate.com',
        photoURL: '',
        // Add other necessary User properties as mocks
    } as User;

    setUser(mockUser);
    setIsAdmin(ADMIN_USERNAMES.includes(mockUser.displayName || ''));
    setLoading(false);

  }, []);
  

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
