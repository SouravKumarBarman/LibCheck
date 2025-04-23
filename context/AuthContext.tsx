import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/LoadingScreen';
import axios from "@/config/axiosConfig";
import * as SecureStore from 'expo-secure-store';

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

            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            await axios.post('/auth/login', {
                email: 'jeccse@gmail.com',
                password: password
            })
                .then(async function (response) {
                    console.log("Admin logged in successfully!!")
                    const accessToken = response.data.accessToken
                    const refreshToken = response.data.refreshToken
                    await SecureStore.setItemAsync('accessToken', accessToken);
                    await SecureStore.setItemAsync('refreshToken', refreshToken);
                })

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

            if (!username || !password) {
                throw new Error('Username and password are required');
            }

            // User validation logic
            // if (username !== 'user' || password !== 'user') {
            //     throw new Error('Invalid user credentials');
            // }

            await axios.post('/auth/login', {
                email: username,
                password: password
            })
                .then(async function (response) {
                    console.log("User logged in successfully!!")
                    const accessToken = response.data.accessToken
                    const refreshToken = response.data.refreshToken
                    await SecureStore.setItemAsync('accessToken', accessToken);
                    await SecureStore.setItemAsync('refreshToken', refreshToken);
                })

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
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            console.log(authState.role + ' logged out successfully')
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