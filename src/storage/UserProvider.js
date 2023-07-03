import { useState, useEffect } from "react";
import { getAuthenticatedUser } from "../service/UserService";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({});
  const [isUserSignedIn, setIsUsersignedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      getAuthenticatedUser()
        .then(({ data }) => {
          setUserState((prevUserState) => ({
            ...prevUserState,
            user: data,
          }));
          setIsUsersignedIn(true);
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching the authenticated user:",
            error
          );
          setIsUsersignedIn(false);
        });
    }
  }, []);

  const signInUser = (user) => {
    setUserState(user);
    setIsUsersignedIn(true);
  };

  const signOutUser = () => {
    setUserState({});
    setIsUsersignedIn(false);
    
  };

  const userContext = {
    user: userState,
    signedIn: isUserSignedIn,
    signInUser,
    signOutUser,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};

export default UserProvider;