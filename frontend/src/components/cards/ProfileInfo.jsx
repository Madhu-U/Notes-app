import React from "react";
import { getInitials } from "../../utils/helper";
import { useUser } from "../../context/UserContext";

const ProfileInfo = ({ handleLogout }) => {
  const { userInfo } = useUser();
  return (
    <div className='flex items-center gap-3'>
      <div className='rounded-full bg-accent w-10 h-10 flex items-center justify-center text-sm'>
        {getInitials(userInfo?.fullName)}
      </div>
      <div className='text-primary-dark'>
        <p>{userInfo?.fullName}</p>
        <button
          onClick={handleLogout}
          className='text-accent text-sm underline cursor-pointer'
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
