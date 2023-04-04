import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField } from "../Common/TextField/TextField";
import { UserContext } from "../../contexts/User";
import { signIn } from "../../actions/user";
import { Button } from "../Common/Button/Button";
import { isUserNameValid, isPasswordValid } from "../../helpers/validate";
import { CLEAR_ERRORS } from "../../actions/Types";
import { Loading } from "../Common/Loading/Loading";
import { LoadingContext } from "../../contexts/Loading";
import "../styles/sign-in-sign-up.css";
import { Form } from "../Common/Form/Form";
import {
  showFailureToast,
  showSuccessToast,
} from "../../actions/toast-message";
import { ToastMessagesContext } from "../../contexts/ToastMessages";

//SignIn component
export const SignIn: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);

  //Get the state and the dispatch properties form the UserContext and rename them to userState and userDispatch resp.
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { state: loadingState, dispatch: loadingDispatch } =
    useContext(LoadingContext);
  const { dispatch: toastMessagesDispatch } = useContext(ToastMessagesContext);

  const navigate = useNavigate();

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleClick = async () => {
    //If valid, clear error states and execute the signIn action creator
    if (userName && !userNameError && password && !passwordError) {
      await signIn(userName, password)(userDispatch, loadingDispatch);
    }
  };

  const validateUserName = () => {
    // check if userName is valid
    const userNameValid = isUserNameValid(userName);

    if (!userNameValid) {
      setUserNameError(
        "Username should be at least 8 alphanumeric characters long."
      );
    } else {
      setUserNameError("");
    }
  };

  const validatePassword = () => {
    // check if password is valid
    const passwordValid = isPasswordValid(password);

    if (!passwordValid) {
      setPasswordError("Password is invalid. Must be atleast 8 characters");
    } else {
      setPasswordError("");
    }
  };

  //useEffect hook that would only run once and check for a token.
  useEffect(() => {
    //Clear all existing erros
    userDispatch({ type: CLEAR_ERRORS });
    //Check if token exists in the localstorage
    if (localStorage.getItem("MOBIGIC-file-handling:token")) {
      //if exists, redirect the user to the home page
      navigate("/");
    }
  }, []);

  useEffect(() => {
    console.log("userState", userState);
    if (userState.error) {
      showFailureToast(userState.error)(toastMessagesDispatch);
    } else if (userState.token) {
      showSuccessToast("Successfully logged in")(toastMessagesDispatch);
      navigate("/");
    }
  }, [userState.token, userState.error]);

  return (
    <Form>
      {/* If loadingState has loading as true, show the loader */}
      {loadingState.loading ? <Loading /> : null}
      <h2>Sign In</h2>

      <div className="form-content">
        <div className="textfield-wrapper">
          <TextField
            value={userName}
            placeholder="Enter User Name"
            label="User Name"
            handleChange={(e) => setUserName(e.target.value)}
            id="sign-up_user_name_input_field"
            onBlur={() => validateUserName()}
          />
          <p className="validation-error">{userNameError}</p>
        </div>

        <div className="textfield-wrapper">
          <TextField
            value={password}
            placeholder="Enter Password"
            label="Password"
            handleChange={(e) => setPassword(e.target.value)}
            id="sign-in_password_input_field"
            type={visibility ? "text" : "password"}
            showEye={true}
            visibility={visibility}
            toggleVisibility={toggleVisibility}
            onBlur={() => validatePassword()}
          />
          <p className="validation-error">{passwordError}</p>
        </div>

        <Button value="Sign In" handleClick={handleClick} id="sign-in_button" />

        <p className="sign-in-error">{userState?.error}</p>
      </div>
    </Form>
  );
};
