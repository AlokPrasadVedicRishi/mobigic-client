import React, { useReducer, createContext, ReactNode, useMemo } from "react";
import {
  Loading,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/loading";

export const LoadingContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

// define the type of the children prop
type Props = {
  children: ReactNode;
};

export const LoadingContextProvider: React.FC<Props> = ({ children }) => {
  // get the state and the dispatch function from the useReducer hook by using the Loading reducer
  const [state, dispatch] = useReducer(Loading, initialState);
  // create an object called value which has the state and the dispatch function returned from the reducer
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    //wrap the children with the Provider component for the Loading Context and pass the value of the context
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
