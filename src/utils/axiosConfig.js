import axios from 'axios';

// Determine base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return ''; // Proxy via Vite
  }
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
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor untuk handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// 1. AUTENTIKASI DAN MANAJEMEN PENGGUNA
export const authService = {
  register: async (userData) => {
    const payload = {
      name: userData.name?.trim(),
      email: userData.email?.trim().toLowerCase(),
      password: userData.password,
      age: parseInt(userData.age, 10),
      gender: userData.gender,
    };
    if (!payload.name || !payload.email || !payload.password || !payload.age || !payload.gender) {
      throw new Error('All fields are required');
    }
    if (isNaN(payload.age) || payload.age < 1 || payload.age > 120) {
      throw new Error('Invalid age value');
    }
    const response = await axiosInstance.post('/api/register', payload);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  login: async (credentials) => {
    const payload = {
      email: credentials.email?.trim().toLowerCase(),
      password: credentials.password,
    };
    const response = await axiosInstance.post('/api/login', payload);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/api/profile');
  return response.data;
};

export const updateProfile = async (profileData, isMultipart = false) => {
  let response;
  if (isMultipart) {
    response = await axiosInstance.put('/api/profile', profileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } else {
    const payload = {
      ...(profileData.name && { name: profileData.name.trim() }),
      ...(profileData.age && { age: parseInt(profileData.age, 10) }),
      ...(profileData.gender && { gender: profileData.gender }),
    };
    response = await axiosInstance.put('/api/profile', payload);
  }
  return response.data;
};

export const changePassword = async (passwordData) => {
  const payload = {
    currentPassword: passwordData.currentPassword,
    newPassword: passwordData.newPassword,
  };
  const response = await axiosInstance.put('/api/profile/password', payload);
  return response.data;
};

export const predictImage = async (imageFile, threshold = 0.5) => {
  if (!imageFile) throw new Error('Image file is required');
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(imageFile.type)) {
    throw new Error('Only JPEG, JPG, and PNG files are allowed');
  }
  const maxSize = 10 * 1024 * 1024;
  if (imageFile.size > maxSize) {
    throw new Error('File size must be less than 10MB');
  }
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('threshold', threshold.toString());
  const response = await axiosInstance.post('/api/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000,
  });
  return response.data;
};

export const getHistory = async () => {
  const response = await axiosInstance.get('/api/history');
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined && token !== '';
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const testConnection = async () => {
  try {
    await axiosInstance.get('/api/test', { timeout: 5000 });
    return true;
  } catch {
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
