// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, User, Calendar, Lock } from 'lucide-react';
import { getProfile, updateProfile, changePassword } from '../utils/axiosConfig';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
  });

  const [formData, setFormData] = useState({
    email: '',
    gender: '',
    age: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profileData = await getProfile();
        if (profileData) {
          setUserData({
            name: profileData.name || 'User Name',
            email: profileData.email || '',
            age: profileData.age || '',
            gender: profileData.gender || '',
          });

          setFormData({
            email: profileData.email || '',
            gender: profileData.gender || '',
            age: profileData.age?.toString() || '',
            newPassword: '',
            confirmPassword: '',
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Unable to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name, email) => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'U';
  };

  const generateUsername = (name, email) => {
    if (name) return `@${name.toLowerCase().replace(/\s+/g, '')}`;
    if (email) return `@${email.split('@')[0]}`;
    return '@user';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Update profile
      await updateProfile({
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
      });

      // Update password if provided
      if (formData.newPassword && formData.confirmPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await changePassword({
          newPassword: formData.newPassword,
          currentPassword: '', // backend tidak minta currentPassword
        });
      }

      alert('Profile updated successfully!');
      setFormData((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
      // Refresh userData
      const updatedProfile = await getProfile();
      setUserData({
        name: updatedProfile.name || 'User Name',
        email: updatedProfile.email || '',
        age: updatedProfile.age || '',
        gender: updatedProfile.gender || '',
      });
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !userData.name) {
    return (
      <div className="font-poppins bg-[#F9FAFB] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-poppins bg-[#F9FAFB] min-h-screen flex flex-col">
      <Navbar />

      {error && (
        <div className="max-w-7xl mx-auto w-full px-6 pt-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-6 flex-col lg:flex-row">
        {/* Sidebar kiri */}
        <aside className="bg-white shadow rounded-2xl p-6 w-full lg:w-1/3 flex flex-col items-center mb-6 lg:mb-0">
          <div className="w-28 h-28 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
            {getInitials(userData.name, userData.email)}
          </div>

          <h2 className="text-lg font-semibold mt-4">{userData.name}</h2>
          <p className="text-gray-500 text-sm">{generateUsername(userData.name, userData.email)}</p>

          <div className="mt-6 space-y-3 w-full">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <a
                href={`mailto:${userData.email}`}
                className="text-primary hover:underline truncate"
              >
                {userData.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span>{userData.age ? `${userData.age} Tahun` : 'Age not set'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} />
              <span>{userData.gender || 'Gender not set'}</span>
            </div>
          </div>
        </aside>

        {/* Form kanan */}
        <main className="flex-1 bg-white shadow rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Info atas */}
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                {getInitials(userData.name, userData.email)}
              </div>
              <div>
                <p className="font-medium">{userData.name}</p>
                <p className="text-gray-500 text-sm">
                  {generateUsername(userData.name, userData.email)}
                </p>
              </div>
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

            {/* Gender */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>

            {/* Umur */}
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              placeholder="Umur"
              min="1"
              max="120"
            />

            {/* Password Baru */}
            <div className="relative">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="New Password (kosongkan jika tidak ingin mengubah)"
              />
              <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
            </div>

            {/* Konfirmasi Password */}
            {formData.newPassword && (
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
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Updating...
                </>
              ) : (
                'Submit Change'
              )}
            </button>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
