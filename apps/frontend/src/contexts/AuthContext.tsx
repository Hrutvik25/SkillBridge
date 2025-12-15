import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authApi, User, AppRole, removeToken, isAuthenticated } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  roles: AppRole[];
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);

  const refreshRoles = async () => {
    if (user) {
      setRoles(user.roles || []);
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const { user } = await authApi.getMe();
          setUser(user);
          setRoles(user.roles || []);
        } catch (error) {
          // Token expired or invalid
          removeToken();
          setUser(null);
          setRoles([]);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { user } = await authApi.register(email, password, fullName);
      setUser(user);
      setRoles(user.roles || []);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user } = await authApi.login(email, password);
      setUser(user);
      setRoles(user.roles || []);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    authApi.logout();
    setUser(null);
    setRoles([]);
  };

  const isAdmin = roles.includes("admin");

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      roles,
      isAdmin,
      signUp,
      signIn,
      signOut,
      refreshRoles
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
