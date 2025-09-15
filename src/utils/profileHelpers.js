export const getInitials = (name, email) => {
  if (name) return name.charAt(0).toUpperCase();
  if (email) return email.charAt(0).toUpperCase();
  return 'U';
};

export const generateUsername = (name, email) => {
  if (name) return `@${name.toLowerCase().replace(/\s+/g, '')}`;
  if (email) return `@${email.split('@')[0]}`;
  return '@pengguna';
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Browser tidak mendukung geolocation'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (error) => {
        console.error('Geolocation error:', error);
        reject(new Error('Gagal mendapatkan lokasi. Pastikan GPS/Location diaktifkan'));
      },
    );
  });
};

export const getLocationFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || data.address?.village || data.display_name;
  } catch (error) {
    console.error('Error getting location name:', error);
    throw new Error('Gagal mendapatkan nama kota');
  }
};

export const mapProfileToUserData = (profileData) => ({
  name: profileData.name || 'Nama Pengguna',
  email: profileData.email || '',
  age: profileData.age || '',
  gender: profileData.gender || '',
  location: profileData.location || '',
});

export const mapUserDataToFormData = (userInfo) => ({
  email: userInfo.email,
  gender: userInfo.gender,
  age: userInfo.age?.toString() || '',
  location: userInfo.location,
  newPassword: '',
  confirmPassword: '',
});
