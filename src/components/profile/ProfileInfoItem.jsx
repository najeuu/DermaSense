import React from 'react';

const ProfileInfoItem = ({ icon: Icon, content }) => {
  return (
    <div className="flex items-center gap-2 text-gray-600">
      <Icon size={18} />
      <span>{content}</span>
    </div>
  );
};

export default ProfileInfoItem;
