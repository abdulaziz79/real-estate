
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  signIn: (role: 'user' | 'agent' | 'admin') => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (role: 'user' | 'agent' | 'admin') => {
    const mockUser: User = {
      id: role === 'admin' ? 'admin_1' : (role === 'agent' ? 'u_agent_1' : 'user_123'),
      name: role.charAt(0).toUpperCase() + role.slice(1) + ' Test',
      email: `${role}@test.com`,
      role: role,
      agentId: role === 'agent' ? 'a1' : undefined,
      savedProperties: [],
      image: role === 'agent' 
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400'
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400'
    };
    setUser(mockUser);
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
