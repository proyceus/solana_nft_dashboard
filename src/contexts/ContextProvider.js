import { modelChanged } from "@syncfusion/ej2-react-grids";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {

};

export const ContextProvider = ({ children }) => {

  return (
    <StateContext.Provider
      value={{
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
