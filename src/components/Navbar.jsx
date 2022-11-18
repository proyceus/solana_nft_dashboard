import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { getTransactions } from "../helpers/helpers.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
    collectionFp,
    datePurchased,
    setCollectionFp,
    walletTokens,
    walletAddress,
    setWalletAddress,
    walletHistory,
  } = useStateContext();

  const { connected } = useWallet();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      {connected && (
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prevState) => !prevState)}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
      )}
      <button onClick={() => console.log(walletAddress)}>walletAddress</button>
      <button onClick={() => console.log(walletHistory)}>walletHistory</button>
      <button onClick={() => getTransactions(walletAddress)}>
        getTransactions
      </button>

      <WalletMultiButton style={{ backgroundColor: "#833bbe" }} />
    </div>
  );
};

export default Navbar;
