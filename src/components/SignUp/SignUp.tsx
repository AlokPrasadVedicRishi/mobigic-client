import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField } from "../Common/TextField/TextField";
import { UserContext } from "../../contexts/User";
import { Button } from "../Common/Button/Button";
import { isPasswordValid, isUserNameValid } from "../../helpers/validate";
import { CLEAR_ERRORS } from "../../actions/Types";
import { LoadingContext } from "../../contexts/Loading";
import { Loading } from "../Common/Loading/Loading";
import "../styles/sign-in-sign-up.css";
import { signUp } from "../../actions/user";
import { Form } from "../Common/Form/Form";

// SignUp component
export const SignUp: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password1Error, setPassword1Error] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [password2Error, setPassword2Error] = useState<string>("");

  const [enableConfirmPasswordField, setEnableConfirmPasswordField] =
    useState<boolean>(false);
  const [visibility, setVisibility] = useState<boolean>(false);

  // Get the state and the dispatch properties form the UserContext and rename them to userState and userDispatch resp.
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  // Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { state: loadingState, dispatch: loadingDispatch } =
    useContext(LoadingContext);

  const navigate = useNavigate();

  // useEffect hook that would only run once and check for a token.
  useEffect(() => {
    //Clear all existing erros
    userDispatch({ type: CLEAR_ERRORS });
    //Check if token exists in the localstorage
    if (localStorage.getItem("MOBIGIC-file-handling:token")) {
      // if exists, redirect the user to the home page
      navigate("/");
    }
  }, []);

  const validateUserName = () => {
    // check if userName is valid
    const userNameValid = isUserNameValid(userName);

    if (!userNameValid) {
      setUserNameError(
        "Username should be at least 8 alphanumeric characters long."
      );
    } else {
      setEnableConfirmPasswordField(true);
      setUserNameError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword1(value);

    // check if confirm password field has a value, if yes match the current value
    if (enableConfirmPasswordField && password2 && value !== password2) {
      setPassword2Error("Password did not match");
    }
  };

  const validatePassword = () => {
    // check if password is valid
    const passwordValid = isPasswordValid(password1);

    if (!passwordValid) {
      setPassword1Error("Password is invalid. Must be atleast 8 characters");
    } else {
      setPassword1Error("");
    }
  };

  const validateConfirmPassword = () => {
    if (password2 !== password1) {
      setPassword2Error("Password did not match");
    } else {
      setPassword2Error("");
    }
  };

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleClick = async () => {
    //If no error, call the signUp action creator
    if (
      userName &&
      !userNameError &&
      password1 &&
      !password1Error &&
      password2 &&
      !password2Error
    ) {
      await signUp(userName, password1)(userDispatch, loadingDispatch);

      navigate("/");
    }
  };

  return (
    <Form>
      {/* If loadingState has loading as true, show the loader */}
      {loadingState.loading ? <Loading /> : null}
      <h2>Sign Up</h2>

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
            value={password1}
            placeholder="Enter Password"
            label="Password"
            handleChange={(e) => handlePasswordChange(e.target.value)}
            id="sign-up_password_input_field"
            type="password"
            onBlur={() => validatePassword()}
          />
          <p className="validation-error">{password1Error}</p>
        </div>

        <div className="textfield-wrapper">
          <TextField
            value={password2}
            placeholder="Confirm Password"
            label="Confirm Password"
            handleChange={(e) => setPassword2(e.target.value)}
            id="sign-up_password_input_field"
            type={visibility ? "text" : "password"}
            disabled={!enableConfirmPasswordField}
            showEye={true}
            visibility={visibility}
            toggleVisibility={toggleVisibility}
            onBlur={() => validateConfirmPassword()}
          />
          <p className="validation-error">{password2Error}</p>
        </div>

        <Button value="Sign Up" handleClick={handleClick} id="sign-up_button" />

        <p className="sign-un-error">{userState?.error}</p>
      </div>
    </Form>
  );
};
