import { useState, useContext } from "react";
import UserContext from "../storage/UserContext";
import { logIn } from "../service/UserService";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signInUser } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(user.email, user.password).then(({ data }) => {
      signInUser(data);
      localStorage.setItem("access_token", data.authorisation.token);
      navigate("/");
    });

    setUser({
      email: "",
      password: "",
    });
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="container "
        style={{ width: "500px" }}
      >
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={user.email}
            onChange={handelInputChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            value={user.password}
            onChange={handelInputChange}
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Log in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
      </form>
    </div>
  );
};
export default LogIn;
