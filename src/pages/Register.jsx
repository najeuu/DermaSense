import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import registerIllustration from '../assets/images/SignUp.png';
import { authService } from '../utils/axiosConfig';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => password.length >= 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword, age, gender } = formData;
    const ageNum = parseInt(age, 10);

    if (!name || !email || !password || !confirmPassword || !age || !gender) {
      setError('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError('Please enter a valid age between 1 and 120');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        age: ageNum,
        gender,
      };

      const response = await authService.register(payload);
      console.log('✅ Registrasi Berhasil:', response.data);
      navigate('/login', {
        state: { message: '✅ Registrasi berhasil! Silakan login.' },
      });
    } catch (err) {
      console.error('❌ Registrasi Gagal:', err);
      let errorMessage = '❌ Registrasi gagal. Silakan coba lagi.';

      if (err.response) {
        const statusCode = err.response.status;
        const serverMessage = err.response.data?.msg || err.response.data?.message;
        switch (statusCode) {
          case 400:
            errorMessage = serverMessage || 'Data yang dikirim tidak valid.';
            break;
          case 409:
            errorMessage = serverMessage || 'Email sudah terdaftar. Silakan gunakan email lain.';
            break;
          case 422:
            errorMessage = serverMessage || 'Validasi gagal. Periksa kembali data Anda.';
            break;
          case 500:
            errorMessage = serverMessage || 'Server Error. Silakan coba lagi nanti.';
            break;
          default:
            errorMessage = serverMessage || `Server Error (${statusCode})`;
        }
      } else if (err.request) {
        errorMessage = 'Terjadi kesalahan jaringan. Periksa koneksi internet Anda.';
      } else {
        errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-[#C1F5DD] flex-col items-center justify-center p-6">
          <img
            src={registerIllustration}
            alt="Sign up illustration"
            className="w-full max-w-[220px] h-auto object-contain mb-4"
          />
          <p className="text-secondary text-center text-sm">
            Silahkan sign up dulu sebelum{' '}
            <span className="font-semibold text-primary">lanjut ke page selanjutnya</span>.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-xl md:text-2xl font-bold text-primary mb-1 text-center">
              Sign Up!
            </h1>
            <p className="text-secondary mb-4 text-sm text-center">
              Silahkan daftar dengan data lengkap kamu.
            </p>

            {error && (
              <div className="mb-3 p-2.5 bg-red-100 border border-red-400 text-red-700 rounded-xl text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl py-2 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <User
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl py-2 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <Mail
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="w-full border border-gray-300 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                    disabled={loading}
                  >
                    <option value="">Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl py-2 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl py-2 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password match indicator */}
              {formData.confirmPassword && (
                <div
                  className={`text-xs px-1 ${
                    formData.password === formData.confirmPassword
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {formData.password === formData.confirmPassword
                    ? '✓ Passwords match'
                    : '✗ Passwords do not match'}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-primary hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 text-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing up...
                  </div>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="text-secondary mt-4 text-center text-sm">
              Have an account?{' '}
              <Link
                to="/login"
                className="text-textPink font-medium hover:underline transition-colors"
              >
                Login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
