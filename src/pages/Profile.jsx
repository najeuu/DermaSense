// src/pages/Profile.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, User, Lock, MapPin } from 'lucide-react';
import { getProfile, updateProfile, changePassword } from '../utils/axiosConfig';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    location: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    gender: '',
    age: '',
    location: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getDeviceLocation = () => {
    if (!navigator.geolocation) {
      alert('Browser tidak mendukung geolocation.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          );
          const data = await response.json();
          const city =
            data.address?.city || data.address?.town || data.address?.village || data.display_name;
          setFormData((prev) => ({ ...prev, location: city }));
          setUserData((prev) => ({ ...prev, location: city }));
        } catch (locationError) {
          console.error('Error getting location:', locationError);
          alert('Gagal mendapatkan nama kota.');
        }
      },
      (geolocationError) => {
        console.error('Geolocation error:', geolocationError);
        alert('Gagal mendapatkan lokasi. Pastikan GPS/Location diaktifkan.');
      },
    );
  };

  const fetchUserData = useCallback(async () => {
    try {
      const profileData = await getProfile();
      if (profileData) {
        const userInfo = {
          name: profileData.name || 'Nama Pengguna',
          email: profileData.email || '',
          age: profileData.age || '',
          gender: profileData.gender || '',
          location: profileData.location || '',
        };
        setUserData(userInfo);
        setFormData({
          email: userInfo.email,
          gender: userInfo.gender,
          age: userInfo.age?.toString() || '',
          location: userInfo.location,
          newPassword: '',
          confirmPassword: '',
        });
        getDeviceLocation();
      }
    } catch (fetchError) {
      console.error('Error fetching profile:', fetchError);
      setError('Tidak dapat memuat data profil');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getInitials = (name, email) => {
    if (name) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'U';
  };

  const generateUsername = (name, email) => {
    if (name) return `@${name.toLowerCase().replace(/\s+/g, '')}`;
    if (email) return `@${email.split('@')[0]}`;
    return '@pengguna';
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Update profil utama
      await updateProfile({
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
      });

      // Update password jika diisi
      if (formData.newPassword && formData.confirmPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('Password tidak cocok');
        }
        await changePassword({
          newPassword: formData.newPassword,
          currentPassword: '',
        });
      }

      alert('Profil berhasil diperbarui!');
      setFormData((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
      
      // Refresh data profil
      const updatedProfile = await getProfile();
      setUserData({
        name: updatedProfile.name || 'Nama Pengguna',
        email: updatedProfile.email || '',
        age: updatedProfile.age || '',
        gender: updatedProfile.gender || '',
        location: updatedProfile.location || '',
      });
    } catch (updateError) {
      console.error('Error updating profile:', updateError);
      setError(updateError.message || 'Gagal memperbarui profil');
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
            <p className="text-gray-600">Memuat profil...</p>
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
        {/* Sidebar Profil */}
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
              <User size={18} />
              <span>{userData.age ? `${userData.age} Tahun` : 'Umur belum diatur'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User size={18} />
              <span>{userData.gender || 'Jenis kelamin belum diatur'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <span>{userData.location || 'Lokasi belum diatur'}</span>
            </div>
          </div>
        </aside>

        {/* Form Edit Profil */}
        <main className="flex-1 bg-white shadow rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Edit Profil</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Info Pengguna */}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Masukkan email"
              />
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Umur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Umur</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Masukkan umur"
                min="1"
                max="120"
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Masukkan lokasi"
                />
                <button
                  type="button"
                  onClick={getDeviceLocation}
                  className="bg-primary text-white px-4 rounded-lg hover:bg-primary/90 transition-colors"
                  title="Gunakan lokasi saat ini"
                >
                  📍
                </button>
              </div>
            </div>

            {/* Password Baru */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <div className="relative">
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Kosongkan jika tidak ingin mengubah password"
                />
                <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
              </div>
            </div>

            {/* Konfirmasi Password */}
            {formData.newPassword && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Konfirmasi password baru"
                  />
                  <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Memperbarui...
                </>
              ) : (
                'Simpan Perubahan'
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