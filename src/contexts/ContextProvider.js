import { modelChanged } from "@syncfusion/ej2-react-grids";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {};

export const ContextProvider = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(undefined);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletTokens, setWalletTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cardClick, setCardClick] = useState(false);
  const [specificAsset, setSpecificAsset] = useState({});
  const [nftData, setNftData] = useState([]);
  const [solPriceToday, setSolPriceToday] = useState(0);
  const [walletHistory, setWalletHistory] = useState([]);
  const [walletHistoryLogs, setWalletHistoryLogs] = useState([]);

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
        cardClick,
        setCardClick,
        specificAsset,
        setSpecificAsset,
        nftData,
        setNftData,
        solPriceToday,
        setSolPriceToday,
        walletHistory,
        setWalletHistory,
        walletHistoryLogs,
        setWalletHistoryLogs,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
