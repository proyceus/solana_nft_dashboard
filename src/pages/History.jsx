import { useEffect } from "react";
import { getTransactions, filterTransactions } from "../helpers/helpers";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";

const History = () => {
  const { connected } = useWallet();
  const {
    walletHistory,
    setWalletHistory,
    walletAddress,
    isLoading,
    setIsLoading,
    walletHistoryLogs,
    setWalletHistoryLogs,
  } = useStateContext();

  let accountBalanceByAddress;

  useEffect(() => {
    if (walletHistory.length >= 1) {
      //loop over history and go into object to find account balance of user wallet address to base calculations off of
      for (let i = 0; i < walletHistory.length; i++) {
        for (let j = 0; j < walletHistory[i].accountBalances.length; j++) {
          if (walletHistory[i].accountBalances[j].address === walletAddress) {
            accountBalanceByAddress = walletHistory[i];
          }
        }
      }
      accountBalanceByAddress = walletHistory.filter((account) => {
        for (let i = 0; i < account.accountBalances.length; i++) {
          account.accountBalances[i].address === walletAddress;
        }
      });

      console.log(accountBalanceByAddress);
    }
  }, [walletHistory]);

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
          setWalletHistory(tx);
          setIsLoading(false);
        }}
      >
        Click
      </button>
      <button
        onClick={async () => {
          setIsLoading(true);
          const tx = await filterTransactions(walletHistory);
          setWalletHistoryLogs((prevState) => [...prevState, ...tx]);
          setIsLoading(false);
        }}
      >
        Click 2
      </button>
      <button
        onClick={() => {
          console.log(walletHistoryLogs);
        }}
      >
        Click 3
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
