import { createContext } from 'react';
import { AuthContext } from '@/types/auth_context_types';
export const UserContext = createContext<AuthContext | null>(null);
