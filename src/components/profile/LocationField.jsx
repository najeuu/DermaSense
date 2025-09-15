import React from 'react';

const LocationField = ({ formData, handleChange, getDeviceLocation }) => {
  return (
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
  );
};

export default LocationField;
