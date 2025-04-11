import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileInfo from "./cards/ProfileInfo";
import { useUser } from "../context/UserContext";
import { searchNotes } from "../api/notes";
import { FaBars } from "react-icons/fa";

const Nav = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useUser();

  const { setIsSearch, setAllNotes, fetchAllNotes } = useUser();
  const [profileShown, setProfileShown] = useState(false);

  // Search Notes
  const onSearch = async (query) => {
    try {
      const response = await searchNotes(query);
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClearSearch = async () => {
    setIsSearch(false);
    fetchAllNotes();
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
    } else {
      fetchAllNotes();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const clearSearch = () => {
    setSearchQuery("");
    onClearSearch();
  };

  const toggleProfile = () => {
    setProfileShown(!profileShown);
  };

  return (
    <nav className='flex flex-col sm:flex-row gap-5 items-center justify-center sm:justify-between px-6 py-6 shadow-md'>
      <h2
        onClick={() => (!isLoggedIn ? navigate("/") : navigate("/dashboard"))}
        className='cursor-pointer text-2xl font-bold  '
      >
        Slate
      </h2>

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-5 sm:gap-5 '>
        <div className='flex items-center justify-between gap-3'>
          {isLoggedIn && (
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch();
              }}
              clearSearch={clearSearch}
              handleSearch={handleSearch}
            ></SearchBar>
          )}

          <FaBars
            onClick={toggleProfile}
            className={`sm:hidden w-8 h-8 transition-all duration-50 ease-in-out ${
              profileShown ? "rotate-90" : "rotate-0"
            }`}
          ></FaBars>
        </div>

        {isLoggedIn && (
          <ProfileInfo
            profileShown={profileShown}
            handleLogout={handleLogout}
          ></ProfileInfo>
        )}
        {!isLoggedIn && (
          <div className='flex gap-5'>
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
