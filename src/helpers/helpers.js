export const findData = (stateToSearch, searchVariableType, assetAddress) => {
  for (let i = 0; i < stateToSearch.length; i++) {
    if (stateToSearch[i]["mintAddress"] === assetAddress) {
      if (searchVariableType === "fp") {
        if (stateToSearch[i]["fp"] >= 0 || stateToSearch[i]["fp"] === "N/A") {
          console.log("True");
          return true;
        }
      } else if (searchVariableType === "purchasePrice") {
        if (
          stateToSearch[i]["purchasePrice"] >= 0 ||
          stateToSearch[i]["purchasePrice"] === "N/A"
        ) {
          console.log("purchasepricetrue");
          return true;
        }
      }
    }
  }
  return false;
};

export const fetchSolanaPrice = async (givenDate) => {
  console.log("Getting SOL Price");
  let date;

  if (givenDate === undefined) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }
  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  const price = await fetch(
    `https://api.coingecko.com/api/v3/coins/solana/history?date=${dateString}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());

  return `$${price.market_data.current_price.usd.toFixed(2)}`;
};

export const getTransactions = async (address) => {
  const web3 = require("@solana/web3.js");

  const connection = new web3.Connection(
    web3.clusterApiUrl("mainnet-beta"),
    "confirmed"
  );

  const publicKey = new web3.PublicKey(address);

  const sigs = await connection.getSignaturesForAddress(publicKey);

  let transactions = [];

  for (let i = 0; i < 10; i++) {
    let accountBalances = [];
    const transaction = await connection.getParsedTransaction(
      sigs[i].signature,
      {
        commitment: "finalized",
        maxSupportedTransactionVersion: 2,
      }
    );

    if (transaction.meta.innerInstructions.length >= 1) {
      for (
        let i = 0;
        i < transaction.transaction.message.accountKeys.length;
        i++
      ) {
        const obj = {
          address:
            transaction.transaction.message.accountKeys[i].pubkey.toString(),
          preBalance: transaction.meta.preBalances[i],
          postBalance: transaction.meta.postBalances[i],
          difference:
            transaction.meta.postBalances[i] - transaction.meta.preBalances[i],
        };
        accountBalances.push(obj);
      }

      const txObj = {
        instructions: transaction.meta.innerInstructions[0].instructions,
        postTokenBalances: transaction.meta.postTokenBalances,
        preTokenBalances: transaction.meta.preTokenBalances,
        blockTime: transaction.blockTime,
        link: `https://solscan.io/tx/${transaction.transaction.signatures[0]}`,
        accountBalances,
        transaction: transaction.meta.innerInstructions,
      };

      transactions.push(txObj);
    }
  }
  console.log(transactions);
  return transactions;
};
