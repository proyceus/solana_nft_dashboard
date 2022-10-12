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
