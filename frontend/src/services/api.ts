import axios from 'axios';

// Create a configured Axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // Allows cookies to be sent cross-origin if we use HTTP-only cookies later
  withCredentials: true, 
});

// Request Interceptor: Attach the JWT token to every request
api.interceptors.request.use(
  (config) => {
    // We will retrieve the token from local storage (or a cookie)
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the token is expired, we can trigger a refresh token flow here in the future
    if (error.response?.status === 401) {
      console.error('Unauthorized: Token expired or invalid');
      // Optional: Clear local storage and redirect to login
    }
    return Promise.reject(error);
  }
);