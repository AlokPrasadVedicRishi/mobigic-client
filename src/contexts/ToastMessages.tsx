import React, { useReducer, createContext, ReactNode, useMemo } from "react";
import {
  ToastMessages,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/toast-message";

export const ToastMessagesContext = createContext<{
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

export const ToastMessagesContextProvider: React.FC<Props> = ({ children }) => {
  // get the state and the dispatch function from the useReducer hook by using the ToastMessages reducer
  const [state, dispatch] = useReducer(ToastMessages, initialState);
  // create an object called value which has the state and the dispatch function returned from the reducer
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    // wrap the children with the Provider component for the ToastMessages Context and pass the value of the context
    <ToastMessagesContext.Provider value={value}>
      {children}
    </ToastMessagesContext.Provider>
  );
};
