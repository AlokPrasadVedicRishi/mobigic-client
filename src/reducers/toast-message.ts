// import the types of actions supported
import {
  SHOW_FAILURE_TOAST,
  SHOW_SUCCESS_TOAST,
  CLEAR_TOAST_MESSAGES,
} from "../actions/Types";

export type Actions =
  | {
      type: typeof SHOW_FAILURE_TOAST;
      payload: string;
    }
  | {
      type: typeof SHOW_SUCCESS_TOAST;
      payload: string;
    }
  | { type: typeof CLEAR_TOAST_MESSAGES };

// interface to define the State type for the state of the reducer
interface ToastMessagesInterface {
  message: {
    success: boolean;
    message: string;
  } | null;
}

// State type for defining the state of the reducer
export type State = ToastMessagesInterface;

// Initial state of the reducer of type State
export const initialState: State = {
  message: null,
};

export const ToastMessages = (state: State = initialState, action: Actions) => {
  // switch between action.type
  switch (action.type) {
    // if action is of type SHOW_FAILURE_TOAST return the state by setting message
    case SHOW_FAILURE_TOAST:
      return {
        message: { success: false, message: action.payload },
      };

    //if action is of type SHOW_SUCCESS_TOAST return the state by setting message
    case SHOW_SUCCESS_TOAST:
      return {
        message: { success: true, message: action.payload },
      };

    // Clear message
    case CLEAR_TOAST_MESSAGES:
      return { message: null };

    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
