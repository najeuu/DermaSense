import React from 'react';

const UserInfoDisplay = ({ userData, getInitials, generateUsername }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
        {getInitials(userData.name, userData.email)}
      </div>
      <div>
        <p className="font-medium">{userData.name}</p>
        <p className="text-gray-500 text-sm">{generateUsername(userData.name, userData.email)}</p>
      </div>
    </div>
  );
};

export default UserInfoDisplay;
