import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '@/components/auth/AuthProvider';
import { authService } from '@/services/auth';
import { clearAuthData } from '@/lib/api';
import type { LoginRequest } from '@/types/user';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginRequest) => authService.login(credentials),
        onSuccess: (data) => {
            context.login(data.user);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            context.logout();
        },
        onError: () => {
            // Even if logout API fails, clear local data
            clearAuthData();
            context.logout();
        }
    });

    return {
        ...context,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoginLoading: loginMutation.isPending,
        isLogoutLoading: logoutMutation.isPending,
        loginError: loginMutation.error,
        logoutError: logoutMutation.error
    };
};