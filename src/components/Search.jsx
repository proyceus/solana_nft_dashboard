import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Gallery } from ".";

const Search = () => {
  const {
    walletAddress,
    setWalletAddress,
    walletTokens,
    setWalletTokens,
    setIsLoading,
  } = useStateContext();

  const searchAddress = async () => {
    setIsLoading(true);
    setWalletTokens();
    await fetch(
      `https://api-mainnet.magiceden.dev/v2/wallets/${walletAddress}/tokens?offset=0&limit=100&listStatus=both
    `,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((tokens) => {
        setWalletTokens(tokens);
        setIsLoading(false);
      })
      .catch((err) => console.error("error:" + err));

    console.log(walletTokens);
  };

  return (
    <>
      <div className="mb-3 w-3/4">
        <div className="input-group relative flex items-stretch w-full mb-4">
          <input
            type="search"
            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3"
            onChange={(e) => {
              setWalletAddress(e.target.value);
            }}
          />
          <button
            className="btn ml-4 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            type="button"
            id="button-addon3"
            onClick={searchAddress}
          >
            Search
          </button>
        </div>
        <div>
          <Gallery />
        </div>
      </div>
    </>
  );
};

export default Search;
