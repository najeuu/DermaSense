import React from 'react';
import { Mail, User, MapPin } from 'lucide-react';
import ProfileInfoItem from './ProfileInfoItem';

const ProfileSidebar = ({ userData, getInitials, generateUsername }) => {
  return (
    <aside className="bg-white shadow rounded-2xl p-6 w-full lg:w-1/3 flex flex-col items-center mb-6 lg:mb-0">
      <div className="w-28 h-28 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
        {getInitials(userData.name, userData.email)}
      </div>

      <h2 className="text-lg font-semibold mt-4">{userData.name}</h2>
      <p className="text-gray-500 text-sm">{generateUsername(userData.name, userData.email)}</p>

      <div className="mt-6 space-y-3 w-full">
        <ProfileInfoItem
          icon={Mail}
          content={
            <a href={`mailto:${userData.email}`} className="text-primary hover:underline truncate">
              {userData.email}
            </a>
          }
        />
        <ProfileInfoItem
          icon={User}
          content={userData.age ? `${userData.age} Tahun` : 'Umur belum diatur'}
        />
        <ProfileInfoItem icon={User} content={userData.gender || 'Jenis kelamin belum diatur'} />
        <ProfileInfoItem icon={MapPin} content={userData.location || 'Lokasi belum diatur'} />
      </div>
    </aside>
  );
};

export default ProfileSidebar;
