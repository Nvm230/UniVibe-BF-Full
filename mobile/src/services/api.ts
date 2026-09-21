import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Token management with SecureStore
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenManager = {
    async getToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    async setToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error setting token:', error);
        }
    },

    async getRefreshToken(): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Error getting refresh token:', error);
            return null;
        }
    },

    async setRefreshToken(token: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
        } catch (error) {
            console.error('Error setting refresh token:', error);
        }
    },

    async clearTokens(): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    },
};

// Request interceptor - Add auth token
api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await tokenManager.getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors and refresh token
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized - Try to refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue the request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = await tokenManager.getRefreshToken();

            if (!refreshToken) {
                // No refresh token, logout
                await tokenManager.clearTokens();
                processQueue(error, null);
                isRefreshing = false;
                return Promise.reject(error);
            }

            try {
                // Call refresh token endpoint
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { token: newToken, refreshToken: newRefreshToken } = response.data;

                await tokenManager.setToken(newToken);
                if (newRefreshToken) {
                    await tokenManager.setRefreshToken(newRefreshToken);
                }

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }

                processQueue(null, newToken);
                isRefreshing = false;

                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout
                await tokenManager.clearTokens();
                processQueue(error, null);
                isRefreshing = false;
                return Promise.reject(refreshError);
            }
        }

        // Handle other errors
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const message = (error.response.data as any)?.message || error.message;

            switch (status) {
                case 400:
                    console.error('Bad Request:', message);
                    break;
                case 403:
                    console.error('Forbidden:', message);
                    break;
                case 404:
                    console.error('Not Found:', message);
                    break;
                case 409:
                    console.error('Conflict:', message);
                    break;
                case 500:
                    console.error('Server Error:', message);
                    break;
                default:
                    console.error('Error:', message);
            }
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error: No response from server');
        } else {
            // Error setting up request
            console.error('Request Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
