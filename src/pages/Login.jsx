// src/pages/Login.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import loginIllustration from '../assets/images/Login.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-4xl shadow-lg rounded-[21px] overflow-hidden flex-col md:flex-row">

        {/* Left Form */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center items-center rounded-[21px]">
          <h1 className="text-3xl font-bold text-primary mb-4 text-center">Login!</h1>
          <p className="text-secondary mb-8 text-center">
            Selamat datang di page login, silahkan isi username dan juga password.
          </p>

          <form onSubmit={handleLogin} className="space-y-5 w-full max-w-[507px] flex flex-col items-center">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-[21px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-[21px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <a href="#" className="text-sm text-secondary hover:text-primary self-end">
              Forgot Password?
            </a>

            <button
              type="submit"
              className="w-full h-[49px] bg-primary hover:brightness-90 text-white font-semibold rounded-[21px] transition-all duration-200"
            >
              Login
            </button>
          </form>

          <p className="text-center text-secondary mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="text-textPink font-medium hover:underline">
              Sign Up Now
            </Link>
          </p>
        </div>

        {/* Right Illustration */}
        <div className="w-full md:w-1/2 bg-[#D6FFED] flex flex-col items-center justify-center p-10 rounded-[21px]">
          <img src={loginIllustration} alt="Login Illustration" className="w-full h-auto object-contain mb-4 max-w-xs md:max-w-sm rounded-[21px]" />
          <p className="text-secondary text-center">
            Silahkan login dulu ya teman-teman sebelum lanjut ke page{' '}
            <span className="font-semibold text-primary">selanjutnya</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
