import { useEffect } from "react";
import {
  getTransactions,
  filterTransactions,
  fetchNftHistoryInfo,
} from "../helpers/helpers";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";

const History = () => {
  const walletAdapter = useWallet();
  const {
    walletHistory,
    setWalletHistory,
    walletAddress,
    isLoading,
    setIsLoading,
    walletHistoryLogs,
    setWalletHistoryLogs,
    setWalletAddress,
  } = useStateContext();

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
      History
      <button
        onClick={async () => {
          setIsLoading(true);
          const tx = await getTransactions(
            walletAddress,
            process.env.REACT_APP_RPC_URL
          );
          await setWalletHistory(tx);
          const secondTx = filterTransactions(walletHistory, walletAddress);
          setWalletHistoryLogs((prevState) => [...prevState, ...secondTx]);
          setIsLoading(false);
        }}
      >
        Click
      </button>
      <button
        onClick={() => {
          fetchNftHistoryInfo();
        }}
      >
        CLICKMEEEE
      </button>
      {isLoading && <Loading />}
      <ul>
        {walletHistoryLogs.map((item, index) => (
          <li key={index} className="list-disc">
            {item.date}
            {" - "}
            {item.type}{" "}
            <a
              href={`https://solscan.io/token/${item.item}`}
              target="_blank"
              className="underline"
            >
              {item.item}
            </a>{" "}
            {item.difference !== "n/a" &&
              `for ${item.difference.toFixed(3)} SOL`}
            {" - "}
            <a href={item.link} target="_blank" className="underline">
              Transaction Link
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
