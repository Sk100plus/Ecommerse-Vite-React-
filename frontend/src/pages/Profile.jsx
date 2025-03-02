import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import profile_image from './profile_image.avif';

const Profile = () => {
  const { user } = useContext(ShopContext);

  if (!user) return null;

  return (
    <div className="flex items-center bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mt-10">
      {/* Profile Image */}
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mr-6">
        <img
          src={profile_image} // Replace with actual profile image URL
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Details */}
      <div className="text-gray-800">
        <h2 className="text-xl font-semibold mb-2">Name: {user.name}</h2>
        <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
