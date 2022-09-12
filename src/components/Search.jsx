import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Gallery } from ".";

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

  const searchAddress = async () => {
    setIsLoading(true);
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
  };

  const searchAssetStats = () => {
    //bundle all asset names into an array
    const collection = walletTokens.map((item) => item.collection);
    let stats = [];

    //loop over this array to get stats on each collection, set a timeout before each call
    for (let i = 0; i < collection.length; i++) {
      setTimeout(async () => {
        //fetch info
        await fetch(
          `https://api-mainnet.magiceden.dev/v2/collections/${collection[i]}/stats`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => stats.push(data))
          .catch((err) => console.error("error: ", err));
      }, "5000");
    }

    setAssetStats(stats);
  };

  const filterStats = () => {
    const uniqueCollections = [];

    const filteredStats = assetStats.filter((element) => {
      const isDuplicate = uniqueCollections.includes(element.symbol);

      if (!isDuplicate) {
        uniqueCollections.push(element.symbol);

        return true;
      }

      return false;
    });

    setAssetStats(filteredStats);
  };

  useEffect(async () => {
    if (walletTokens) {
      await searchAssetStats().then(filterStats());
    }
  }, [walletTokens]);

  return (
    <>
      <div className="mb-3 w-3/4 justify-center">
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
        <button onClick={searchAssetStats}>Test</button>
        <br />
        <button onClick={() => console.log(assetStats)}>Work?</button>
        <div className="justify-center flex">
          <Gallery />
        </div>
      </div>
    </>
  );
};

export default Search;
