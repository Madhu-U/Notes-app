import { createContext, useContext, useState } from "react";
import { getAllNotes } from "../api/notes";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // get all notes
  const fetchAllNotes = async () => {
    try {
      const response = await getAllNotes();
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred, Please try again" + error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
        allNotes,
        setAllNotes,
        setIsSearch,
        // onSearch,
        fetchAllNotes,
      }}
    >
      {children},
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
