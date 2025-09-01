import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import loginIllustration from '../assets/images/Login.png';
import { authService } from '../utils/axiosConfig';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      const res = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log('✅ Login Berhasil:', res.data);

      // Redirect setelah login sukses
      navigate('/');
    } catch (err) {
      console.error('❌ Login Gagal:', err);
      setError(err.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8">
      <div className="bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200/50 rounded-2xl overflow-hidden w-full max-w-3xl flex">
        {/* Left Illustration - Hidden on mobile */}
        <div className="hidden md:flex w-1/2 bg-[#D6FFED] flex-col items-center justify-center p-6">
          <img
            src={loginIllustration}
            alt="Login Illustration"
            className="w-full h-auto object-contain mb-4 max-w-[220px]"
          />
          <p className="text-secondary text-center text-sm">
            Silahkan login dulu ya teman-teman sebelum lanjut ke page{' '}
            <span className="font-semibold text-primary">selanjutnya</span>.
          </p>
        </div>

        {/* Right Form - Full width on mobile */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-xl md:text-2xl font-bold text-primary mb-1 text-center">Login!</h1>
            <p className="text-secondary mb-5 text-sm text-center">
              Selamat datang di page login, silahkan isi email dan juga password.
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-2.5 bg-red-100 border border-red-400 text-red-700 rounded-xl text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
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

              <div className="flex justify-end">
                <a href="#" className="text-xs text-secondary hover:text-primary transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 bg-primary hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center text-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <p className="text-secondary mt-5 text-center text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-textPink font-medium hover:underline transition-colors"
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
