import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import api from '../services/api';

export interface SignInCredentials {
  email: string;
  password: string;
  checkbox: Array<[]>;
}

interface ScheduleObj {
  id: number;
  week_day: number;
  from: string;
  to: string;
  class_id: number;
  owner_id: number;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  bio: string;
  whatsapp: string;
  avatar: string;
  subject: string;
  subject_id: number;
  cost: number;
  schedule?: Array<ScheduleObj>;
}

interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(user: UserData): void;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    function loadStoredData(): void {
      const storagedUser = localStorage.getItem('@TutorUp:user');
      const storagedToken = localStorage.getItem('@TutorUp:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      } else {
        const sessionUser = sessionStorage.getItem('@TutorUp:user');
        const sessionToken = sessionStorage.getItem('@TutorUp:token');

        if (sessionUser && sessionToken) {
          setUser(JSON.parse(sessionUser));
          api.defaults.headers.Authorization = `Bearer ${sessionToken}`;
        }
      }
    }

    loadStoredData();
  }, []);

  const signIn = useCallback(
    async ({ email, password, checkbox }: SignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      setUser(response.data.user);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      sessionStorage.setItem(
        '@TutorUp:user',
        JSON.stringify(response.data.user),
      );

      sessionStorage.setItem('@TutorUp:token', response.data.token);

      if (checkbox.length !== 0) {
        localStorage.setItem(
          '@TutorUp:user',
          JSON.stringify(response.data.user),
        );
        localStorage.setItem('@TutorUp:token', response.data.token);
      }
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@TutorUp:token');
    localStorage.removeItem('@TutorUp:user');
    sessionStorage.removeItem('@TutorUp:token');
    sessionStorage.removeItem('@TutorUp:user');

    api.defaults.headers.Authorization = '';

    setUser({} as UserData);
  }, []);

  const updateUser = useCallback(async (updatedUser: UserData) => {
    const storagedUser = localStorage.getItem('@TutorUp:user');

    if (storagedUser) {
      localStorage.setItem('@TutorUp:user', JSON.stringify(updatedUser));
    } else {
      sessionStorage.setItem('@TutorUp:user', JSON.stringify(updatedUser));
    }

    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        updateUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
