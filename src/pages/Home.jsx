import { useEffect } from "react";
import { Search } from "../components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStateContext } from "../contexts/ContextProvider";
import {
  fetchSolanaPrice,
  findData,
  findTokenInfo,
} from "../helpers/helpers.js";

const Home = () => {
  const {
    walletAddress,
    setWalletAddress,
    setWalletTokens,
    setIsLoading,
    setSolPriceToday,
    isConnected,
    setIsConnected,
    solPriceToday,
    walletTokens,
  } = useStateContext();

  const walletAdapter = useWallet();

  useEffect(() => {
    if (walletAddress === null && walletAdapter.connected) {
      setWalletAddress(walletAdapter.publicKey.toString());
      console.log("set");
    }

    // commenting out until cors policy is fixed
    /*
    if (solPriceToday === 0 && walletAdapter.connected) {
      const price = fetchSolanaPrice();
      setSolPriceToday(price);
    }
    */
  }, [walletAdapter.connected]);

  useEffect(() => {
    if (walletTokens === null && walletAdapter.connected) {
      if (walletAddress !== null) {
        searchAddress();
        getSolPriceToday();
      }
    }
  }, [walletAddress]);

  const searchAddress = async () => {
    setIsLoading(true);
    await fetch(
      //limiting fetch to only 10 NFTs
      `https://api-mainnet.magiceden.dev/v2/wallets/${walletAddress}/tokens?offset=0&limit=10&listStatus=both
    `,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((tokens) => {
        setWalletTokens(findTokenInfo(tokens));
        setIsLoading(false);
      })
      .catch((err) => console.error("error:" + err));
  };

  const getSolPriceToday = async () => {
    await fetch(
      "https://arcane-taiga-56242.herokuapp.com/https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((obj) => setSolPriceToday(obj.solana.usd));
  };

  return (
    <div className="mt-12">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        {walletAdapter.connected
          ? "Wallet connected"
          : "Please connect your wallet"}
      </div>
    </div>
  );
};

export default Home;
