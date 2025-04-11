import { createContext, useContext, useState, useEffect } from "react";
import { getAllNotes } from "../api/notes";
import { getUser } from "../api/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // Get all notes
  const fetchAllNotes = async () => {
    try {
      const response = await getAllNotes();
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred, Please try again: " + error);
    }
  };

  // Check user login status on initial load
  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await getUser();
          if (res.data?.user) {
            setUserInfo(res.data.user);
            setIsLoggedIn(true);
          }
        } catch (err) {
          console.log("User session expired or invalid:", err);
          localStorage.clear();
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      }
    };

    initUser();
  }, []);

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
        fetchAllNotes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
