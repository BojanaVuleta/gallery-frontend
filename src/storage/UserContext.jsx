import { createContext } from "react";

const UserContext = createContext({
  user: {},
  signedIn: false,
  signInUser: (user) => {},
  signOutUser: () => {},
});

export default UserContext;