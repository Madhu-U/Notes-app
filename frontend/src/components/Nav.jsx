import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileInfo from "./cards/ProfileInfo";
import { useUser } from "../context/UserContext";
import { searchNotes } from "../api/notes";
import { FaRocketchat } from "react-icons/fa6";

const Nav = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useUser();

  const { setIsSearch, setAllNotes, fetchAllNotes } = useUser();

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

  return (
    <nav className='flex items-center justify-between px-6 py-6 shadow-md'>
      <h2
        onClick={() => (!isLoggedIn ? navigate("/") : navigate("/dashboard"))}
        className='cursor-pointer text-xl font-medium uppercase '
      >
        Slate
      </h2>

      <SearchBar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch();
        }}
        clearSearch={clearSearch}
        handleSearch={handleSearch}
      ></SearchBar>

      {isLoggedIn && <ProfileInfo handleLogout={handleLogout}></ProfileInfo>}
      {!isLoggedIn && (
        <div className='flex gap-5'>
          <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
