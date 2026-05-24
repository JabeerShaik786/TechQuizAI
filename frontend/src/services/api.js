import axios from "axios";
import { useAuthStore } from "../store/index";

// Get API URL from environment, never fallback to localhost in production
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  console.warn('⚠️ VITE_API_URL not configured. Using development fallback.');
}

const API = axios.create({
  baseURL: apiUrl || 'http://localhost:5000/api',
  timeout: 15000,
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

// Response Interceptor - Handle errors with readable messages
API.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred';
    let details = null;

    if (error.response) {
      // Server responded with error status
      message = error.response.data?.error || error.response.data?.message || `Error ${error.response.status}`;
      details = error.response.data?.details || null;

      // Handle 401 Unauthorized
      if (error.response.status === 401) {
        useAuthStore.getState().logout();
        window.location.href = "/login";
        message = 'Session expired. Please sign in again.';
      }
      // Handle 403 Forbidden
      else if (error.response.status === 403) {
        message = 'You do not have permission to perform this action.';
      }
      // Handle 404 Not Found
      else if (error.response.status === 404) {
        message = 'The requested resource was not found.';
      }
      // Handle 422 Validation Error
      else if (error.response.status === 422) {
        message = error.response.data?.message || 'Please check your input and try again.';
      }
      // Handle 500 Server Error
      else if (error.response.status === 500) {
        message = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      // Request made but no response received
      if (error.code === 'ECONNABORTED') {
        message = 'Request timed out. Please check your connection and try again.';
      } else if (error.message.includes('Network')) {
        message = 'Network error. Please check your internet connection.';
      } else {
        message = 'Unable to reach the server. Please check your connection.';
      }
    } else {
      // Error during request setup
      message = error.message || 'An error occurred while processing your request.';
    }

    // Attach message and details for caller to use
    error.userMessage = message;
    error.details = details;

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