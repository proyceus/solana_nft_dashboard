import React from "react";
import { getTransactions } from "../helpers/helpers";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStateContext } from "../contexts/ContextProvider";

const History = () => {
  const { connected } = useWallet();
  const { walletHistory, setWalletHistory, walletAddress } = useStateContext();

  const accountBalanceByAddress = walletHistory.filter(
    (account) => account.address === walletAddress
  );

  console.log(accountBalanceByAddress);

  return (
    <div>
      History
      <button
        onClick={async () => {
          const tx = await getTransactions(walletAddress);
          setWalletHistory(tx);
        }}
      >
        Click
      </button>
      <ul>
        {walletHistory.map((item) => (
          <li>
            Transferred {item.postTokenBalances[0].mint} to{" "}
            {item.postTokenBalances[0].owner} for{" "}
            {BigInt(accountBalanceByAddress[0].difference) / BigInt(1000000000)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
