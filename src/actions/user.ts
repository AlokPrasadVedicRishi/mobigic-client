import { startLoading, stopLoading } from "./loading"; //import loading actions
import { Actions as LoadingActions } from "./../reducers/loading"; //import loading Actions type
import axios from "axios";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  CLEAR_ERRORS,
  LOGOUT,
} from "./Types";
import { Actions } from "../reducers/user"; //import user actions interface
import { API_URL } from "./serverConnection";

// Action Creator for Sign In
export const signIn =
  (userName: string, password: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);

      //fetch the results from the sign in API
      const result = await axios.post(`${API_URL}/user/sign-in`, {
        userName,
        password,
      });

      //Get the token from the result
      const { token } = result.data;

      //Store the token in the localstorage
      localStorage.setItem("MOBIGIC-file-handling:token", token);
      //Stop loading
      stopLoading(loadingDispatch);

      //Dispatch the result token with SIGN_IN type action
      dispatch({
        type: SIGN_IN,
        payload: token,
      });

      // Clear all errors in the reducer
      clearErrors(dispatch);

      //Add Authorization header to all future axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err: any) {
      //dispatch the error data
      dispatch({
        type: SIGN_IN_ERROR,
        payload: err?.response
          ? err?.response.data?.message
          : "Unable to connect to server",
      });

      //In case of error, stop loading
      stopLoading(loadingDispatch);
    }
  };

//Action Creator for Sign Up
export const signUp =
  (userName: string, password: string) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      //dispatch start loading
      startLoading(loadingDispatch);
      // api call to signup the user
      const result = await axios.post(`${API_URL}/user/sign-up`, {
        userName,
        password,
      });

      // Get the token from the result
      const { token } = result.data;

      //Store the token in the localstorage
      localStorage.setItem("MOBIGIC-file-handling:token", token);

      //Stop loading
      stopLoading(loadingDispatch);

      //Dispatch the result token with SIGN_UP type action
      dispatch({
        type: SIGN_UP,
        payload: token,
      });

      //Clear all errors in the reducer
      clearErrors(dispatch);

      //Add Authorization header to all future axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (err: any) {
      //In case of error, stop loading
      stopLoading(loadingDispatch);
      //dispatch the error data
      dispatch({
        type: SIGN_UP_ERROR,
        payload: err?.response?.data?.message || "Unable to connect to server",
      });
    }
  };

//Action Creator for Logout
export const logout = (dispatch: React.Dispatch<Actions>) => {
  //Remove token from localstorage
  localStorage.removeItem("MOBIGIC-file-handling:token");
  //Dispatch the logout action
  dispatch({ type: LOGOUT });
  //Delete the axios header
  delete axios.defaults.headers.common["Authorization"];
  //Reload the app to get rid of all user specific data
  window.location.reload();
};

//Action creator for clearing the user reducer from errors
export const clearErrors = (dispatch: React.Dispatch<Actions>) => {
  //Dispatch CLEAR_ERRORS type
  dispatch({
    type: CLEAR_ERRORS,
  });
};
