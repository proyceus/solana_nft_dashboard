import moment from "moment";

// helper function to check if the state object already holds the generic data so as to not fetch redundant data
export const findData = (stateToSearch, searchVariableType, assetAddress) => {
  for (let i = 0; i < stateToSearch.length; i++) {
    if (stateToSearch[i]["collection"] === assetAddress) {
      if (searchVariableType === "fp") {
        if (stateToSearch[i]["fp"] >= 0 || stateToSearch[i]["fp"] === "N/A") {
          console.log("True");
          return true;
        }
      }
    }
    if (stateToSearch[i]["mintAddress"] === assetAddress) {
      if (searchVariableType === "purchasePrice") {
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
    `https://arcane-taiga-56242.herokuapp.com/https://api.coingecko.com/api/v3/coins/solana/history?date=${dateString}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());

  return price.market_data.current_price.usd.toFixed(2);
};

export const getTransactions = async (address, rpc) => {
  const web3 = require("@solana/web3.js");

  const connection = new web3.Connection(rpc);

  const publicKey = new web3.PublicKey(address);

  const sigs = await connection.getSignaturesForAddress(publicKey);

  let transactions = [];

  for (let i = 0; i < 10; i++) {
    let ownerAccountBalance;
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
        if (
          transaction.transaction.message.accountKeys[i].pubkey.toString() ===
          address
        ) {
          const preBalance = transaction.meta.preBalances[i] / 1000000000;
          const postBalance = transaction.meta.postBalances[i] / 1000000000;
          const obj = {
            address:
              transaction.transaction.message.accountKeys[i].pubkey.toString(),
            preBalance,
            postBalance,
            difference: postBalance - preBalance,
          };
          ownerAccountBalance = obj;
        }
      }

      //loop over post and pre balances to find owner wallet and place in new object
      //NEED TO MAKE THESE INTO ARRAYS TO PUSH MULTIPLE DIFFERENCES IN
      let preTokenBalance = [];
      let postTokenBalance = [];

      for (let i = 0; i < transaction.meta.postTokenBalances.length; i++) {
        if (
          transaction.meta.postTokenBalances[i].owner === address ||
          transaction.meta.postTokenBalances[i].owner ===
            "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix"
        ) {
          postTokenBalance.push({
            mintAddress: transaction.meta.postTokenBalances[i].mint,
            owner: transaction.meta.postTokenBalances[i].owner,
            postTokenBalance:
              transaction.meta.postTokenBalances[i].uiTokenAmount.amount,
          });
        }
      }

      for (let i = 0; i < transaction.meta.preTokenBalances.length; i++) {
        if (
          transaction.meta.preTokenBalances[i].owner === address ||
          transaction.meta.preTokenBalances[i].owner ===
            "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix"
        ) {
          preTokenBalance.push({
            mintAddress: transaction.meta.preTokenBalances[i].mint,
            owner: transaction.meta.preTokenBalances[i].owner,
            preTokenBalance:
              transaction.meta.preTokenBalances[i].uiTokenAmount.amount,
          });
        }
      }

      const tokenBalance = {
        mintAddress: postTokenBalance.mintAddress,
        owner: postTokenBalance.owner,
        difference:
          postTokenBalance.postTokenBalance / 1000000000 -
          preTokenBalance.preTokenBalance / 1000000000,
        preTokenBalance,
        postTokenBalance,
      };

      const txObj = {
        instructions: transaction.meta.innerInstructions[0].instructions,
        tokenBalance,
        blockTime: transaction.blockTime,
        link: `https://solscan.io/tx/${transaction.transaction.signatures[0]}`,
        ownerAccountBalance,
        transaction: transaction.meta.innerInstructions,
      };

      transactions.push(txObj);
    }
  }
  console.log(transactions);
  return transactions;
};

export const filterTransactions = (transactions) => {
  const magicedenAddress = "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix";
  const logsArray = [];
  for (let j = 0; j < transactions.length; j++) {
    //preTokenBalance filtering
    for (
      let i = 0;
      i < transactions[j].tokenBalance.preTokenBalance.length;
      i++
    ) {
      //check to see if preTokenBalances exist - if not then nothing was sent in transaction
      if (transactions[j].tokenBalance.preTokenBalance[i] !== undefined) {
        if (
          transactions[j].tokenBalance.preTokenBalance[i].preTokenBalance ===
          "1"
        ) {
          const date = new Date(transactions[j].blockTime * 1000);
          //create object so that frontend can build sentences based on data
          const txObj = {
            type:
              transactions[j].tokenBalance.preTokenBalance[i].owner ===
              magicedenAddress
                ? "Sold"
                : "Sent",
            item: transactions[j].tokenBalance.preTokenBalance[i].mintAddress,
            link: transactions[j].link,
            difference:
              transactions[j].ownerAccountBalance.difference > 0 ||
              transactions[j].ownerAccountBalance.differece < 0
                ? transactions[j].ownerAccountBalance.difference
                : "n/a",
            date: date.toUTCString(),
          };
          logsArray.push(txObj);
        } else {
          console.log("no nfts sent");
        }
      } else {
        console.log("no nfts sent");
      }
    }

    //postTokenBalance filtering
    for (
      let i = 0;
      i < transactions[j].tokenBalance.postTokenBalance.length;
      i++
    ) {
      //check to see if postTokenBalances exist - if not then nothing was received during the transaction
      if (transactions[j].tokenBalance.postTokenBalance[i] !== undefined) {
        if (
          transactions[j].tokenBalance.postTokenBalance[i].postTokenBalance ===
          "1"
        ) {
          const date = new Date(transactions[j].blockTime * 1000);
          const txObj = {
            type:
              transactions[j].tokenBalance.postTokenBalance[i].owner ===
              magicedenAddress
                ? "Bought"
                : "Received",
            item: transactions[j].tokenBalance.postTokenBalance[i].mintAddress,
            link: transactions[j].link,
            difference:
              transactions[j].ownerAccountBalance.difference > 0.01
                ? transactions[j].ownerAccountBalance.difference
                : "n/a",
            date: date.toUTCString(),
          };
          logsArray.push(txObj);
        } else {
          console.log("no nft received");
        }
      } else {
        console.log("no nft received");
      }
    }
  }

  console.log(logsArray);
  return logsArray;
};

//fetches activity for individual nft and then puts it into an object that can be accessed
export const fetchIndividualNFTActivity = async (nftAddress) => {
  let response;
  const nftActivity = await fetch(
    `https://api-mainnet.magiceden.dev/v2/tokens/${nftAddress}/activities?offset=0&limit=100`,
    {
      method: "GET",
    }
  ).then((response) => response.json());

  console.log(nftActivity);
  //loop over array and find the most recent buyNow to be returned
  for (let i = 0; i < nftActivity.length; i++) {
    if (nftActivity[i].type === "buyNow") {
      response = nftActivity[i];
      break;
    } else {
      response = "none found";
    }
  }

  return response;
};

// small function to help with pauses in between fetch requests as it is currently rate limited to 2 requests per second
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// go through wallettokens and get main information on each token - this function will take awhile to complete at higher NFT numbers
// so need to find a more optimized solution in the future
export const findTokenInfo = async (walletTokens, solPriceToday) => {
  let allTokensInfo = [];

  //filter through walletTokens to grab all necessary data from each NFT - will limit to only 10 NFTs for now
  for (let i = 0; i < walletTokens.length; i++) {
    let image = walletTokens[i].image;
    let name = walletTokens[i].name;
    let link = `https://magiceden.io/item-details/${walletTokens[i].mintAddress}`;
    let collection = walletTokens[i].collection;
    let address = walletTokens[i].mintAddress;
    let fp;
    let purchasePrice;
    let buyDate = undefined;
    let solPrice = "";

    //check to see if there is a FP for the collection, if not then fetch it
    if (!findData(allTokensInfo, "fp", collection)) {
      fp = await fetch(
        `https://arcane-taiga-56242.herokuapp.com/https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return data.floorPrice / 1000000000;
        });
      console.log(fp);
    } else {
      for (let i = 0; i < allTokensInfo.length; i++) {
        if (allTokensInfo[i]["collection"] === collection) {
          fp = allTokensInfo[i].fp;
          break;
        }
      }
    }

    //if token does not have purchaseprice and buydate then fetch it
    if (!findData(allTokensInfo, "purchasePrice", address)) {
      purchasePrice = await fetch(
        `https://api-mainnet.magiceden.dev/v2/tokens/${address}/activities?offset=0&limit=500`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === "buyNow") {
              buyDate = moment.unix(data[i].blockTime).format("MM/DD/YYYY");

              return data[i].price;
            }
          }

          buyDate = "N/A";

          return "N/A";
        });
    } else {
      for (let i = 0; i < allTokensInfo.length; i++) {
        if (allTokensInfo[i]["mintAddress"] === address) {
          purchasePrice = allTokensInfo[i].purchasePrice;
          buyDate = allTokensInfo[i].datePurchased;
          break;
        }
      }
    }

    //fetch the SOL price on the day the asset was purchased
    if (buyDate !== undefined && buyDate !== "N/A") {
      solPrice = await fetchSolanaPrice(buyDate);
    }

    const obj = {
      image,
      name,
      link,
      collection,
      address,
      fp,
      purchasePrice,
      datePurchased: buyDate,
      solPrice,
      solPriceToday,
    };

    //push object to tokensInfo array
    allTokensInfo.push(obj);
    await sleep(1500);
  }

  console.log(allTokensInfo);
  return allTokensInfo;
};
