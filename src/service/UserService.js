import { API } from "../shared/api";
export const registerUser = (first_name, last_name, email, password) => {
    return API.post("/register", {
      first_name,
      last_name,
      email,
      password,

    });
  };
  
  export const logIn = (email, password) => {
    return API.post("/login", {
      email,
      password,
    });
  };
  
  export const logOut = () => {
    return API.post("/logout");
  };