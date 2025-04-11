import React from "react";
import { getInitials } from "../../utils/helper";
import { useUser } from "../../context/UserContext";

const ProfileInfo = ({ handleLogout, profileShown }) => {
  const { userInfo } = useUser();

  return (
    <div
      className={` transition-all duration-300 ease-in-out ${
        profileShown ? " sm:flex" : " hidden sm:flex"
      } flex flex-row items-center gap-3 justify-end sm:justify-center`}
    >
      <div className='rounded-full bg-accent w-10 h-10 flex items-center justify-center text-sm'>
        {getInitials(userInfo?.fullName)}
      </div>
      <div className='text-primary-dark sm:block flex gap-3'>
        <p>{userInfo?.fullName}</p>
        <button
          onClick={handleLogout}
          className='text-accent text-sm underline cursor-pointer'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
