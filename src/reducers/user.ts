import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  CLEAR_ERRORS,
  LOGOUT,
} from "../actions/Types";

export type Actions =
  | {
      type: typeof SIGN_IN;
      payload: string;
    }
  | {
      type: typeof SIGN_UP;
      payload: string;
    }
  | {
      type: typeof SIGN_IN_ERROR;
      payload: string;
    }
  | {
      type: typeof SIGN_UP_ERROR;
      payload: string;
    }
  | {
      type: typeof CLEAR_ERRORS;
    }
  | {
      type: typeof LOGOUT;
    };

//UserInterface to define the State type for the state of the reducer
interface UserInterface {
  token: string | null;
  error: string | null;
}

//State type for defining the state of the reducer
export type State = UserInterface;

//Initial state of the reducer of type State
export const initialState: State = {
  token: null,
  error: null,
};

//User reducer which takes a state and an action param
export const User = (state: State = initialState, action: Actions) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type SIGN_IN or SIGN_UP return the state by setting token to the payload
    case SIGN_IN:
    case SIGN_UP:
      return {
        ...state,
        token: action.payload,
      };
    //if action is of type SIGN_IN_ERROR or SIGN_UP_ERROR return the state by setting error to the payload
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    //if action is of type LOGOUT return the state by setting error and token to null
    case LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
      };
    //if action is of type CLEAR_ERRORS return the state by setting error to null
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
