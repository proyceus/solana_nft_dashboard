export const findData = (stateToSearch, searchVariable, searchVariableType) => {
  for (let i = 0; i < stateToSearch.length; i++) {
    if (stateToSearch[i][searchVariableType] === searchVariable) {
      console.log("Found old data");
      return true;
    }
  }
  return false;
};

export const fetchSolanaPrice = async (givenDate) => {
  let date;

  if (givenDate === undefined) {
    date = new Date();
  } else {
    date = new Date(givenDate);
  }
  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  console.log(dateString);

  const price = await fetch(
    `https://api.coingecko.com/api/v3/coins/solana/history?date=${dateString}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());

  console.log(price);

  return `$${price.market_data.current_price.usd.toFixed(2)}`;
};
