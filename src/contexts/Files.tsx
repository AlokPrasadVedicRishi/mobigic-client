import React, { useReducer, createContext, ReactNode, useMemo } from "react";
import {
  Files,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/files";

export const FilesContext = createContext<{
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

export const FilesContextProvider: React.FC<Props> = ({ children }) => {
  // get the state and the dispatch function from the useReducer hook
  const [state, dispatch] = useReducer(Files, initialState);
  // create an object called value which has the state and the dispatch function returned from the reducer
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  // wrap the children with the Provider component for the Transactions Context and pass the value of the context
  return (
    <FilesContext.Provider value={value}>{children}</FilesContext.Provider>
  );
};
