import React, { useState } from "react";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import registerIllustration from "../assets/images/SignUp.png";
import { authService } from "../utils/axiosConfig";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validasi email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validasi password strength
  const validatePassword = (password) => {
    return password.length >= 6; // Minimal 6 karakter
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError("");

    // Validasi form
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.age ||
      !formData.gender
    ) {
      setError("All fields are required");
      return;
    }

    // Validasi email format
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validasi age
    const ageNum = parseInt(formData.age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("Please enter a valid age between 1 and 120");
      return;
    }

    // Validasi password
    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Prepare payload dengan data yang bersih
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        age: ageNum,
        gender: formData.gender,
      };

      console.log("Registering user with payload:", JSON.stringify(payload, null, 2));
      
      const response = await authService.register(payload);
      
      console.log("Registration successful:", response.data);
      
      // Redirect ke login dengan success message
      navigate("/login", { 
        state: { 
          message: "Registration successful! Please login with your credentials." 
        }
      });
      
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle different types of errors
      let errorMessage = "Registration failed. Please try again.";
      
      if (err.response) {
        // Server responded with error status
        const statusCode = err.response.status;
        const serverMessage = err.response.data?.message;
        
        console.error("Server error response:", {
          status: statusCode,
          data: err.response.data
        });
        
        switch (statusCode) {
          case 400:
            errorMessage = serverMessage || "Invalid data provided";
            break;
          case 409:
            errorMessage = "Email already exists. Please use a different email.";
            break;
          case 422:
            errorMessage = serverMessage || "Validation failed";
            break;
          case 500:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = serverMessage || `Server error (${statusCode})`;
        }
      } else if (err.request) {
        // Network error
        console.error("Network error:", err.request);
        errorMessage = "Network error. Please check your connection.";
      } else {
        // Other error
        console.error("Request setup error:", err.message);
        errorMessage = "Something went wrong. Please try again.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-3xl flex">
        
        {/* Left Illustration - Hidden on mobile */}
        <div className="hidden md:flex w-1/2 bg-[#D6FFED] flex-col items-center justify-center p-6">
          <img
            src={registerIllustration}
            alt="Sign up illustration"
            className="w-full h-auto object-contain mb-4 max-w-[220px]"
          />
          <p className="text-secondary text-center text-sm">
            Silahkan sign up dulu sebelum{" "}
            <span className="font-semibold text-primary">lanjut ke page selanjutnya</span>.
          </p>
        </div>

        {/* Right Form - Full width on mobile */}
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
                  required
                  disabled={loading}
                />
                <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
                  required
                  disabled={loading}
                />
                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Age and Gender Row */}
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
                  required
                  disabled={loading}
                />
                
                <div className="relative">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white"
                    required
                    disabled={loading}
                  >
                    <option value="">Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl py-2 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={loading}
                  minLength="6"
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
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl py-2 pl-3 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
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
                <div className={`text-xs px-1 ${
                  formData.password === formData.confirmPassword 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {formData.password === formData.confirmPassword 
                    ? "✓ Passwords match" 
                    : "✗ Passwords do not match"}
                </div>
              )}

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
                  "Sign Up"
                )}
              </button>
            </form>
            
            <p className="text-secondary mt-4 text-center text-sm">
              Have an account?{" "}
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