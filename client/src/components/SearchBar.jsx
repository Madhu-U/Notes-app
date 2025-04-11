import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

const SearchBar = ({ value, onChange, clearSearch, handleSearch }) => {
  return (
    <div className='bg-gray-200 px-3 rounded-md flex items-center justify-between'>
      <input
        type='text'
        name='search'
        id='search'
        className='py-2 focus:outline-none text-sm text-primary-dark'
        value={value}
        onChange={onChange}
        placeholder='Search'
      />
      {value && (
        <MdClose
          onClick={clearSearch}
          className='text-slate-400 hover:text-primary-dark mr-2'
        ></MdClose>
      )}
      <FaMagnifyingGlass
        onClick={handleSearch}
        className='text-slate-400 hover:text-primary-dark cursor-pointer'
      ></FaMagnifyingGlass>
    </div>
  );
};

export default SearchBar;
