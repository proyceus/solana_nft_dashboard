import { modelChanged } from "@syncfusion/ej2-react-grids";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {};

export const ContextProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [walletAddress, setWalletAddress] = useState();
  const [walletTokens, setWalletTokens] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StateContext.Provider
      value={{
        themeSettings,
        setThemeSettings,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        walletAddress,
        setWalletAddress,
        walletTokens,
        setWalletTokens,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
