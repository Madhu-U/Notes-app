import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  value,
  placeholder = "password",
  onChange,
  name = "password",
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className='flex items-center justify-between w-full my-3 border border-gray-400 rounded relative'>
      <input
        type={isShowPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full p-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark'
      />

      <button
        type='button'
        onClick={togglePassword}
        className='absolute right-3 '
      >
        {isShowPassword ? (
          <FaRegEye className='text-primary-dark'></FaRegEye>
        ) : (
          <FaRegEyeSlash className='text-slate-400'></FaRegEyeSlash>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
