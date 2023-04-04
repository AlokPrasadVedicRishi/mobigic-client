import React, { useReducer, createContext, ReactNode, useMemo } from "react";
import {
  User,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/user";

export const UserContext = createContext<{
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

export const UserContextProvider: React.FC<Props> = ({ children }) => {
  //get the state and the dispatch function from the useReducer hook by using the User reducer
  const [state, dispatch] = useReducer(User, initialState);
  //create an object called value which has the state and the dispatch function returned from the reducer
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  //wrap the children with the Provider component for the Loading Context and pass the value of the context
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
