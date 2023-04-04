import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { UserContext } from "../../../contexts/User";
import { logout } from "../../../actions/user";

// Navbar component for the app
export const Navbar: React.FC = () => {
  //Get the state and the dispatch properties form the UserContext and rename them to userState and userDispatch resp.
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  //token variable in the state and setToken method for updating the token value
  const [token, setToken] = useState<string | null>();

  //Method to handle logout operation
  const handleLogout = () => {
    //Calls the logout action creator with the dispatch for userReducer
    logout(userDispatch);
  };

  //Use Effect hook that runs every time there is a change in the user reducer's state
  useEffect(() => {
    //Tried to fetch the token from the localstorage and set it in the state variable called token
    setToken(localStorage.getItem("MOBIGIC-file-handling:token"));
  }, [userState]);

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">Welcome</div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          {/* 3 spans for the menu icon. Spans made to look like bars on the menu icon using CSS */}
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        {/* If token is not present, show the Sign in and Sign up links else show the logout button */}
        {!token && <Link to="sign-in">Sign In</Link>}
        {!token && <Link to="sign-up">Sign Up</Link>}
        {token && (
          <>
            <Link to="/upload">Upload</Link>
            <a style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </a>
          </>
        )}
      </div>
    </div>
  );
};
