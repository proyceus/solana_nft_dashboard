import { useEffect } from "react";
import { getTransactions } from "../helpers/helpers";
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
  } = useStateContext();

  let accountBalanceByAddress;

  // useEffect(() => {
  //   if (walletHistory.length >= 1) {
  //     //loop over history and go into object to find account balance of user wallet address to base calculations off of
  //     for (let i = 0; i < walletHistory.length; i++) {
  //       for (let j = 0; j < walletHistory[i].accountBalances.length; j++) {
  //         if (walletHistory[i].accountBalances[j].address === walletAddress) {
  //           accountBalanceByAddress = walletHistory[i]
  //         }
  //       }
  //     }
  //     accountBalanceByAddress = walletHistory.filter((account) => {
  //       for (let i = 0; i < account.accountBalances.length; i++) {
  //         account.accountBalances[i].address === walletAddress;
  //       }
  //     });

  //     console.log(accountBalanceByAddress);
  //   }
  // }, [walletHistory]);

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
      {isLoading && <Loading />}
      {/* <ul>
        {walletHistory.map((item) => (
          <li>
            Transferred {item.postTokenBalances[0].mint} to{" "}
            {item.postTokenBalances[0].owner} for{" "}
            {accountBalanceByAddress[0].difference / 1000000000}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default History;
