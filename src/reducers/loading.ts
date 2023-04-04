//import the types of actions supported
import { LOAD_SCREEN, START_LOADING, STOP_LOADING } from "../actions/Types";

export type Actions =
  | {
      type: typeof START_LOADING;
    }
  | {
      type: typeof STOP_LOADING;
    }
  | {
      type: typeof LOAD_SCREEN;
      payload: string;
    };

// LoadingInterface to define the State type for the state of the reducer
interface LoadingInterface {
  loading: boolean;
  screenName: string;
}

// State type for defining the state of the reducer
export type State = LoadingInterface;

// Initial state of the reducer of type State
export const initialState: State = {
  loading: false,
  screenName: "",
};

//Loading reducer which takes a state and an action param
export const Loading = (state: State = initialState, action: Actions) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type START_LOADING return the state by setting loading to true
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    //if action is of type STOP_LOADING return the state by setting loading to false
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };

    case LOAD_SCREEN:
      return {
        ...state,
        screenName: action.payload,
      };

    //return state as it is if action is not of any of the mentioned types
    default:
      return state;
  }
};
