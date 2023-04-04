import {
  SHOW_SUCCESS_TOAST,
  SHOW_FAILURE_TOAST,
  CLEAR_TOAST_MESSAGES,
} from "./Types"; //Import action types
import { Actions } from "../reducers/toast-message"; //Import Action type

// showSuccessToast function will dispatch a SHOW_SUCCESS_TOAST type action
export const showSuccessToast =
  (message: string) => (dispatch: React.Dispatch<Actions>) => {
    dispatch({
      type: SHOW_SUCCESS_TOAST,
      payload: message,
    });
    // Clear after 5 seconds
    setTimeout(() => {
      clearMessage(dispatch);
    }, 5000);
  };

// showFailureToast function will dispatch a SHOW_FAILURE_TOAST type action
export const showFailureToast =
  (message: string) => (dispatch: React.Dispatch<Actions>) => {
    dispatch({
      type: SHOW_FAILURE_TOAST,
      payload: message,
    });
    // Clear after 5 seconds
    setTimeout(() => {
      clearMessage(dispatch);
    }, 5000);
  };

export const clearMessage = (dispatch: React.Dispatch<Actions>) => {
  dispatch({
    type: CLEAR_TOAST_MESSAGES,
  });
};
