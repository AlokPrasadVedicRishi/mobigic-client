import { START_LOADING, STOP_LOADING } from "./Types"; //Import action types
import { Actions } from "../reducers/loading"; //Import Action type

//startLoading function will dispatch a START_LOADING type action
export const startLoading = (dispatch: React.Dispatch<Actions>) => {
  dispatch({
    type: START_LOADING,
  });
};

//stopLoading function will dispatch a STOP_LOADING type action
export const stopLoading = (dispatch: React.Dispatch<Actions>) => {
  dispatch({
    type: STOP_LOADING,
  });
};
