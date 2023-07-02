import { useState, useContext, useEffect } from "react";
import { registerUser } from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { logIn } from "../service/UserService";
import UserContext from "../storage/UserContext";

const Register = () => {
  const [error, setError] = useState({ isActive: false, message: "" });
  const [checkbox, setCheckbox] = useState(false);
  const { signInUser, signedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password1: "",
    emailVerified: true,
  });

  useEffect(() => {
    if (signedIn) {
      navigate("/");
    }
  }, [signedIn, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.password !== user.password1) {
      setError({ isActive: true, message: "Passwords must match." });
    } else if (!checkbox) {
      setError({
        isActive: true,
        message: "You must Accept terms and conditions.",
      });
    } else if (
      user.email.indexOf("@") === -1 ||
      user.email.indexOf(".") === -1
    ) {
      setError({ isActive: true, message: "Invalid email address." });
    } else if (
      user.password.length < 8 ||
      !user.password.split("").some((char) => !isNaN(char)) ||
      !user.password.split("").some((char) => isNaN(char))
    ) {
      setError({
        isActive: true,
        message:
          "Password must be at least 8 characters long and contain at least 1 digit and 1 non-digit character.",
      });
    } else {
      registerUser(
        user.first_name,
        user.last_name,
        user.email,
        user.password,
        user.emailVerified
      );
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password1: "",
        emailVerified: true,
      });

      logIn(user.email, user.password).then(({ data }) => {
        signInUser(data);
        localStorage.setItem("access_token", data.authorisation.token);
      });
      navigate("/");
    }
  };

  const handelInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleCheckboxInputChange = (event) => {
    setCheckbox(event.target.checked);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="container "
        style={{ width: "500px" }}
      >
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="first_name"
            value={user.first_name}
            onChange={handelInputChange}
            required
          />
          <label htmlFor="floatingPassword">First Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            name="last_name"
            value={user.last_name}
            onChange={handelInputChange}
            required
          />
          <label htmlFor="floatingPassword">Last Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={user.email}
            onChange={handelInputChange}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={handelInputChange}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword1"
            placeholder="Confirm Password"
            value={user.password1}
            name="password1"
            onChange={handelInputChange}
            required
          />
          <label htmlFor="floatingPassword1">Confirm Password</label>
        </div>
        {error.isActive === true ? (
          <div>
            <span>{error.message}</span>
          </div>
        ) : null}
        <div className="form-check">
          <input
            onChange={handleCheckboxInputChange}
            className="form-check-input"
            type="checkbox"
            value={checkbox}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Accepted terms and conditions
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2023</p>
      </form>
    </div>
  );
};
export default Register;