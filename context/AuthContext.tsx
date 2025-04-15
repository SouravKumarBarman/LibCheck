import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/LoadingScreen';

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

interface AuthState {
    authenticated: boolean | null;
    username: string | null;
    role: Role | null;
    loading: boolean;
    error: string | null;
}

interface AuthProps {
    authState: AuthState;
    onAdminLogin: (username: string, password: string) => Promise<void>;
    onUserLogin: (username: string, password: string) => Promise<void>;
    onLogout: () => Promise<void>;
    clearError: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthProps | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>({
        authenticated: null,
        username: null,
        role: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const storedAuth = await AsyncStorage.getItem('authState');
            if (storedAuth) {
                const parsedAuth = JSON.parse(storedAuth);
                setAuthState(prev => ({
                    ...prev,
                    ...parsedAuth,
                    loading: false
                }));
            } else {
                setAuthState(prev => ({
                    ...prev,
                    loading: false
                }));
            }
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to check authentication status'
            }));
        }
    };

    const adminLogin = async (username: string, password: string) => {
        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            // Admin validation logic
            // if (username !== 'admin' || password !== 'admin') {
            //     throw new Error('Invalid admin credentials');
            // }

            const newAuthState = {
                authenticated: true,
                username,
                role: Role.ADMIN,
                loading: false,
                error: null
            };

            await AsyncStorage.setItem('authState', JSON.stringify(newAuthState));
            setAuthState(newAuthState);
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Admin login failed'
            }));
        }
    };

    const userLogin = async (username: string, password: string) => {
        try {
            setAuthState(prev => ({ ...prev, loading: true, error: null }));
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            // User validation logic
            // if (username !== 'user' || password !== 'user') {
            //     throw new Error('Invalid user credentials');
            // }
            console.log('logged in as user');

            const newAuthState = {
                authenticated: true,
                username,
                role: Role.USER,
                loading: false,
                error: null
            };

            await AsyncStorage.setItem('authState', JSON.stringify(newAuthState));
            setAuthState(newAuthState);
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'User login failed'
            }));
        }
    };

    const logout = async () => {
        try {
            setAuthState(prev => ({ ...prev, loading: true }));
            await AsyncStorage.removeItem('authState');
            setAuthState({
                authenticated: false,
                username: null,
                role: null,
                loading: false,
                error: null
            });
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                loading: false,
                error: 'Failed to logout'
            }));
        }
    };

    const clearError = () => {
        setAuthState(prev => ({ ...prev, error: null }));
    };

    const value = {
        authState,
        onAdminLogin: adminLogin,
        onUserLogin: userLogin,
        onLogout: logout,
        clearError
    };

    if (authState.loading) {
        return <LoadingScreen />;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};