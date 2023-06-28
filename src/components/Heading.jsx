import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../storage/UserContext";
import { logOut } from "../service/UserService";

const Heading = () => {
  const { signedIn, signOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    const shouldLogOut = window.confirm("Da li ste sigurni?");
    if (shouldLogOut) {
      logOut().then(({ data }) => {
        signOutUser(data);
        localStorage.removeItem("access_token");
        navigate("/");
      });
    }
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
       
       
        <h1 className="fs-4 d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">Galleries app</h1>
      
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link
              to="/"
              className="btn btn-success"
              aria-current="page"
            >
              All Galleries
            </Link>
          </li>

          {signedIn ? (
            <>
              <li className="nav-item">
                <Link
                  to="/create"
                  className="btn btn-success"
                  aria-current="page"
                >
                  Create New Gallery
                </Link>
              </li>{" "}
              <li className="nav-item">
                <Link
                  to="/my-galleries"
                  className="btn btn-success"
                  aria-current="page"
                >
                  My Galleries
                </Link>
              </li>{" "}
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  type="submit"
                  onClick={() => handleLogOut()}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="btn btn-success"
                  aria-current="page"
                >
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="btn btn-success"
                  aria-current="page"
                >
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Heading;
