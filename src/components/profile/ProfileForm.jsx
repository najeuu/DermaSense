import React from 'react';
import UserInfoDisplay from './UserInfoDisplay';
import FormField from './FormField';
import FormSelect from './FormSelect';
import LocationField from './LocationField';
import PasswordField from './PasswordField';
import SubmitButton from './SubmitButton';

const ProfileForm = ({
  userData,
  formData,
  loading,
  getInitials,
  generateUsername,
  handleChange,
  handleSubmit,
  getDeviceLocation,
}) => {
  return (
    <main className="flex-1 bg-white shadow rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Edit Profil</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <UserInfoDisplay
          userData={userData}
          getInitials={getInitials}
          generateUsername={generateUsername}
        />

        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Masukkan email"
        />

        <FormSelect
          label="Jenis Kelamin"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          options={[
            { value: '', label: 'Pilih Jenis Kelamin' },
            { value: 'Laki-laki', label: 'Laki-laki' },
            { value: 'Perempuan', label: 'Perempuan' },
          ]}
        />

        <FormField
          label="Umur"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Masukkan umur"
          min="1"
          max="120"
        />

        <LocationField
          formData={formData}
          handleChange={handleChange}
          getDeviceLocation={getDeviceLocation}
        />

        <PasswordField
          label="Password Baru"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Kosongkan jika tidak ingin mengubah password"
        />

        {formData.newPassword && (
          <PasswordField
            label="Konfirmasi Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Konfirmasi password baru"
          />
        )}

        <SubmitButton loading={loading} />
      </form>
    </main>
  );
};

export default ProfileForm;
