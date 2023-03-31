import React, { useEffect } from "react";
import { Gallery } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useWallet } from "@solana/wallet-adapter-react";

const MyCollection = () => {
  const walletAdapter = useWallet();
  const { walletAddress, setWalletAddress } = useStateContext();

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
    <div>
      {walletAddress ? (
        <div className="justify-center flex">
          <Gallery />
        </div>
      ) : (
        <p>There is no wallet connected.</p>
      )}
    </div>
  );
};

export default MyCollection;
