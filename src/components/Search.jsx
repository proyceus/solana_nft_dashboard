import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Gallery } from ".";
import { useWallet } from "@solana/wallet-adapter-react";

const Search = () => {
  const {
    walletAddress,
    setWalletAddress,
    walletTokens,
    setWalletTokens,
    setIsLoading,
    setAssetStats,
    assetStats,
  } = useStateContext();

  return (
    <>
      <div className="mb-3 w-3/4 justify-center">
        <div className="input-group relative flex items-stretch w-full mb-4">
          <button
            className="btn ml-4 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            type="button"
            id="button-addon3"
            onClick={() => console.log(walletAdapter.publicKey.toString())}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
