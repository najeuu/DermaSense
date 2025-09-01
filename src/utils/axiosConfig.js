import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
  // Development: use proxy
  if (import.meta.env.DEV) {
    return ''; // Kosong untuk pakai proxy dari vite
  }

  // Production: langsung ke API
  return 'https://9df51053-3359-439c-8b58-1024d68f9aaa-00-5c1cj7iuirec.pike.replit.dev';
};

// Base axios instance
const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
  withCredentials: false,
});

// Request interceptor untuk add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }

    // Debug logging
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: config.baseURL ? `${config.baseURL}${config.url}` : config.url,
      headers: {
        'Content-Type': config.headers['Content-Type'],
        'x-auth-token': config.headers['x-auth-token'] ? '***' : 'none',
      },
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor untuk handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Enhanced error logging
    const errorDetails = {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    };

    console.error('API Error Details:', errorDetails);

    // Handle specific error cases
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Check if API server is running and CORS is configured');
    }

    // Auto logout jika token expired/invalid
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing token and redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

// 1. AUTENTIKASI DAN MANAJEMEN PENGGUNA
export const authService = {
  // POST /api/register
  register: async (userData) => {
    try {
      // Validasi dan clean data
      const payload = {
        name: userData.name?.trim(),
        email: userData.email?.trim().toLowerCase(),
        password: userData.password,
        age: parseInt(userData.age, 10),
        gender: userData.gender,
      };

      // Validasi payload
      if (!payload.name || !payload.email || !payload.password || !payload.age || !payload.gender) {
        throw new Error('All fields are required');
      }

      if (isNaN(payload.age) || payload.age < 1 || payload.age > 120) {
        throw new Error('Invalid age value');
      }

      console.log('Registering user with payload:', JSON.stringify(payload, null, 2));

      const response = await axiosInstance.post('/api/register', payload);

      // Simpan token jika ada di response
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Registration successful, token saved');
      }

      return response;
    } catch (error) {
      console.error('Register service error:', error);

      // Re-throw with more specific message
      if (error.code === 'ERR_NETWORK') {
        const networkError = new Error(
          'Unable to connect to server. Please check your internet connection or try again later.',
        );
        networkError.originalError = error;
        throw networkError;
      }

      throw error;
    }
  },

  // POST /api/login
  login: async (credentials) => {
    try {
      const payload = {
        email: credentials.email?.trim().toLowerCase(),
        password: credentials.password,
      };

      console.log('Logging in user:', payload.email);

      const response = await axiosInstance.post('/api/login', payload);

      // Simpan token
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful, token saved');
      }

      return response;
    } catch (error) {
      console.error('Login service error:', error);

      if (error.code === 'ERR_NETWORK') {
        const networkError = new Error(
          'Unable to connect to server. Please check your internet connection.',
        );
        networkError.originalError = error;
        throw networkError;
      }

      throw error;
    }
  },
};

// GET /api/profile
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/api/profile');
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

// PUT /api/profile
export const updateProfile = async (profileData, isMultipart = false) => {
  try {
    let response;

    if (isMultipart) {
      console.log('Updating profile with FormData (multipart)');
      response = await axiosInstance.put('/api/profile', profileData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      const payload = {
        ...(profileData.name && { name: profileData.name.trim() }),
        ...(profileData.age && { age: parseInt(profileData.age, 10) }),
        ...(profileData.gender && { gender: profileData.gender }),
      };

      console.log('Updating profile with payload:', JSON.stringify(payload, null, 2));
      response = await axiosInstance.put('/api/profile', payload);
    }

    return response.data;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// PUT /api/profile/password
export const changePassword = async (passwordData) => {
  try {
    const payload = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };

    console.log('Changing password for user');

    const response = await axiosInstance.put('/api/profile/password', payload);
    return response.data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};

// POST /api/predict
export const predictImage = async (imageFile, threshold = 0.5) => {
  try {
    if (!imageFile) {
      throw new Error('Image file is required');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(imageFile.type)) {
      throw new Error('Only JPEG, JPG, and PNG files are allowed');
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('threshold', threshold.toString());

    console.log('Predicting image:', {
      fileName: imageFile.name,
      fileSize: imageFile.size,
      fileType: imageFile.type,
      threshold: threshold,
    });

    const response = await axiosInstance.post('/api/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error('Predict image error:', error);
    throw error;
  }
};

// GET /api/history
export const getHistory = async () => {
  try {
    const response = await axiosInstance.get('/api/history');
    return response.data;
  } catch (error) {
    console.error('Get history error:', error);
    throw error;
  }
};

// UTILITY FUNCTIONS
export const logout = () => {
  localStorage.removeItem('token');
  console.log('User logged out');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined && token !== '';
};

export const getToken = () => {
  return localStorage.getItem('token');
};

// Test API connection dengan proxy
export const testConnection = async () => {
  try {
    console.log('Testing API connection...');

    // Test dengan endpoint yang ada atau health check
    const response = await axiosInstance.get('/api/test', {
      timeout: 5000,
    });

    console.log('API Connection test result:', {
      status: response.status,
      statusText: response.statusText,
    });

    return true;
  } catch (error) {
    console.error('API Connection test failed:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
    });
    return false;
  }
};

export const validateToken = async () => {
  try {
    const response = await axiosInstance.get('/api/profile');
    return response.status === 200;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return false;
  }
};

export default axiosInstance;
