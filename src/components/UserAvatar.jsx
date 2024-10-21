import React from 'react'
import useAuthStore from '../store/auth-store';

const UserAvatar = () => {
  const user = useAuthStore((state) => state.user);

  const firstLetter = user.user?.username ? user.user.username.charAt(0).toUpperCase() : '?';

    return (
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400  text-white text-xl rounded-full">
        {firstLetter}
      </div>
    );
};

export default UserAvatar
