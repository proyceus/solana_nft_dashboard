import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import { Sidebar, Navbar } from "./components";
import { History, Calendar, Home, MyCollection, ProfitLoss } from "./pages";
import WalletContextProvider from "./components/WalletContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";

const app = () => {
  const {
    themeSettings,
    setThemeSettings,
    activeMenu,
    setActiveMenu,
    walletAddress,
    setWalletAddress,
  } = useStateContext();

  const walletAdapter = useWallet();

  useEffect(() => {
    if (walletAddress === null && walletAdapter.connected) {
      setWalletAddress(walletAdapter.publicKey.toString());
      console.log("wallet set");
    }

    //   if (solPriceToday === 0 && connected) {
    //     getSolPriceToday();
    //   }
  }, [walletAdapter.connected]);

  return (
    <BrowserRouter>
      <WalletContextProvider>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: "blue", borderRadius: "50%" }}
                onClick={() => {
                  setThemeSettings(true);
                }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Home />} />

                {/* Pages */}

                <Route path="/collection" element={<MyCollection />} />
                <Route path="/profitloss" element={<ProfitLoss />} />
                <Route path="/history" element={<History />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
            </div>
          </div>
        </div>
      </WalletContextProvider>
    </BrowserRouter>
  );
};

export default app;
