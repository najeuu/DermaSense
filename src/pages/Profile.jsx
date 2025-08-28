// src/pages/Profile.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, User, Calendar, MapPin, Lock } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    email: "jokowi212@gmail.com",
    gender: "Laki-laki",
    age: "15",
    location: "Surakarta",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="font-poppins bg-[#F9FAFB] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-6">
        {/* Sidebar kiri */}
        <aside className="bg-white shadow rounded-2xl p-6 w-1/3 max-w-sm flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold mt-4">Jokowi Dudu</h2>
          <p className="text-gray-500 text-sm">@jokowidudu</p>

          <div className="mt-6 space-y-3 w-full">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <a
                href="mailto:jokowi212@gmail.com"
                className="text-primary hover:underline"
              >
                jokowi212@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span>15 Tahun</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} />
              <span>Laki-laki</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <span>Surakarta</span>
            </div>
          </div>
        </aside>

        {/* Form kanan */}
        <main className="flex-1 bg-white shadow rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Info */}
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Jokowi Dudu</p>
                  <p className="text-gray-500 text-sm">@jokowidudu</p>
                </div>
              </div>
              <button
                type="button"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
              >
                Change Profile
              </button>
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Email"
            />

            {/* Jenis Kelamin */}
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Jenis Kelamin"
            />

            {/* Umur */}
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Umur"
            />

            {/* Lokasi */}
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Lokasi"
            />

            {/* Password Baru */}
            <div className="relative">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="New Password"
              />
              <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
            </div>

            {/* Konfirmasi Password */}
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Confirm Password"
              />
              <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90"
            >
              Submit Change
            </button>
          </form>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
