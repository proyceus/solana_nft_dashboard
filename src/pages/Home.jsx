import { useEffect } from "react";
import { Search } from "../components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStateContext } from "../contexts/ContextProvider";
import { fetchSolanaPrice, findData } from "../helpers/helpers.js";

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

    if (solPriceToday === 0 && walletAdapter.connected) {
      const price = fetchSolanaPrice();
      setSolPriceToday(price);
    }
  }, [walletAdapter.connected]);

  useEffect(() => {
    if (walletTokens === null && walletAdapter.connected) {
      if (walletAddress !== null) {
        searchAddress();
      }
    }
  }, [walletAddress]);

  useEffect(() => {
    
  })

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
        console.log(tokens);
        setIsLoading(false);
      })
      .catch((err) => console.error("error:" + err));
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
