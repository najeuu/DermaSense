import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import registerIllustration from '../assets/images/SignUp.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign up data:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="bg-white rounded-[21px] shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row transition-all duration-500">

        {/* Left Konten */}
        <div className="w-full md:w-1/2 bg-[#D6FFED] flex flex-col items-center justify-center p-6 md:p-8 rounded-[21px] hidden md:flex">
          <img
            src={registerIllustration}
            alt="Sign up illustration"
            className="w-full max-w-[250px] md:max-w-sm rounded-[21px]"
          />
          <p className="mt-6 text-center text-secondary text-sm md:text-base">
            Silahkan sign up dulu sebelum <span className="font-semibold text-primary">lanjut ke page selanjutnya</span>.
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-center rounded-[21px] text-center">
          
          {/* Judul & paragraf */}
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Sign Up!</h1>
          <p className="text-secondary mb-6 text-sm md:text-base">
            Selamat datang di page sign up, silahkan daftar menggunakan username dan juga password anda.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center w-full">
            {/* Username */}
            <div className="relative w-full">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[21px] py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <User size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[21px] py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[21px] py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-[21px] py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full h-[49px] bg-primary hover:brightness-90 text-white font-semibold rounded-[21px] transition-all duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Link login */}
          <p className="text-secondary mt-6 w-full text-center">
            Have an account?{' '}
            <Link to="/login" className="text-textPink font-medium hover:underline">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
