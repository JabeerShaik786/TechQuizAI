import axios from "axios";
import { useAuthStore } from "../store/index";

// Default to explicit backend API URL to avoid proxy misconfiguration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Interceptor - Add token to all requests, handle FormData
API.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Let FormData requests omit Content-Type so browser sets proper boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on 401
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    // Normalize server errors when available
    if (error.response?.data) {
      error.message = error.response.data.error || error.response.data.message || error.message;
      error.details = error.response.data.details || null;
    }

    // If Axios throws a network error (no response) provide clearer message
    if (!error.response) {
      error.message = error.message || 'Network Error: Unable to reach backend';
    }

    return Promise.reject(error);
  }
);

export const authService = {
  signup: async (data) => {
    try {
      const response = await API.post("/auth/signup", data);
      // Backend returns access_token, but we normalize to token for consistency
      return {
        data: {
          ...response.data,
          token: response.data.access_token,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (data) => {
    try {
      const response = await API.post("/auth/login", data);
      // Normalize response structure
      return {
        data: {
          ...response.data,
          token: response.data.access_token,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      return await API.post("/auth/logout");
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    return API.get("/auth/profile");
  },

  updateProfile: async (data) => {
    try {
      const hasFile = data.avatar instanceof File
      const shouldRemoveAvatar = data.removeAvatar === true

      if (hasFile || shouldRemoveAvatar) {
        // Use FormData for multipart requests
        const formData = new FormData()
        formData.append('name', data.name || '')
        formData.append('email', data.email || '')
        formData.append('bio', data.bio || '')

        if (hasFile) {
          formData.append('avatar', data.avatar)
        }

        if (shouldRemoveAvatar) {
          formData.append('removeAvatar', 'true')
        }

        return API.put('/auth/profile', formData)
      }

      // Use JSON for text-only updates
      return API.put('/auth/profile', {
        name: data.name || '',
        email: data.email || '',
        bio: data.bio || '',
      })
    } catch (error) {
      throw error
    }
  },

  changePassword: async (data) => {
    return API.put('/auth/password', data)
  },

  chatAssistant: async (message, history = []) => {
    return API.post('/ai/chat', { message, history })
  },

  getAIRecommendations: async () => {
    return API.get('/ai/recommendations')
  },
};

export default API;