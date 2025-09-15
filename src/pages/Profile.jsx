import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import ProfileForm from '../components/profile/ProfileForm';
import LoadingSpinner from '../components/profile/LoadingSpinner';
import ErrorMessage from '../components/profile/ErrorMessage';
import { getProfile, updateProfile, changePassword } from '../utils/axiosConfig';
import {
  getInitials,
  generateUsername,
  getCurrentLocation,
  getLocationFromCoords,
  mapProfileToUserData,
  mapUserDataToFormData,
} from '../utils/profileHelpers';

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

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 5000);
  };

  const showSuccess = (message) => {
    alert(message);
  };

  const getDeviceLocation = async () => {
    try {
      const { latitude: lat, longitude: lon } = await getCurrentLocation();
      const city = await getLocationFromCoords(lat, lon);

      setFormData((prev) => ({ ...prev, location: city }));
      setUserData((prev) => ({ ...prev, location: city }));
    } catch (error) {
      showError(error.message);
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const profileData = await getProfile();
      if (profileData) {
        const userInfo = mapProfileToUserData(profileData);
        setUserData(userInfo);
        setFormData(mapUserDataToFormData(userInfo));
        await getDeviceLocation();
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showError('Tidak dapat memuat data profil');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProfileData = async () => {
    try {
      const updatedProfile = await getProfile();
      setUserData(mapProfileToUserData(updatedProfile));
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswordChange = () => {
    if (formData.newPassword && formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error('Password tidak cocok');
      }
    }
  };

  const updateUserProfile = async () => {
    await updateProfile({
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      location: formData.location,
    });
  };

  const updateUserPassword = async () => {
    if (formData.newPassword && formData.confirmPassword) {
      await changePassword({
        newPassword: formData.newPassword,
        currentPassword: '',
      });
    }
  };

  const resetPasswordFields = () => {
    setFormData((prev) => ({
      ...prev,
      newPassword: '',
      confirmPassword: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      validatePasswordChange();

      await updateUserProfile();
      await updateUserPassword();

      showSuccess('Profil berhasil diperbarui!');
      resetPasswordFields();
      await refreshProfileData();
    } catch (error) {
      console.error('Error updating profile:', error);
      showError(error.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading && !userData.name) {
    return <LoadingSpinner />;
  }

  return (
    <div className="font-poppins bg-[#F9FAFB] min-h-screen flex flex-col">
      <Navbar />

      <ErrorMessage error={error} />

      <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-6 flex-col lg:flex-row">
        <ProfileSidebar
          userData={userData}
          getInitials={getInitials}
          generateUsername={generateUsername}
        />

        <ProfileForm
          userData={userData}
          formData={formData}
          loading={loading}
          getInitials={getInitials}
          generateUsername={generateUsername}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          getDeviceLocation={getDeviceLocation}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
