import { modelChanged } from "@syncfusion/ej2-react-grids";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {

};

export const ContextProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <StateContext.Provider
      value={{
        themeSettings,
        setThemeSettings,
        activeMenu,
        setActiveMenu
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
