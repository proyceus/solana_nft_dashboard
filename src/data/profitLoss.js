import { useStateContext } from "../contexts/ContextProvider";

const { walletTokens } = useStateContext();

const gridNftImage = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.nftImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

export const nftData = () => {
  let x = [];

  for (let i = 0; i < walletTokens.length; i++) {
    const Name = walletTokens[i].collectionName;
    const PurchaseSOL = walletTokens[i].purchasePrice;
    const CurrentFPSOL = walletTokens[i].fp;
    const ProfitLossSOL = CurrentFPSOL - PurchaseSOL;
    const PurchaseUSD = PurchaseSOL * walletTokens[i].solPrice;
    const CurrentFPUSD = currentFPSOL * walletTokens[i].solPriceToday;
    const ProfitLossUSD = CurrentFPUSD - PurchaseUSD;

    const obj = {
      Name,
      PurchaseSOL,
      CurrentFPSOL,
      ProfitLossSOL,
      PurchaseUSD,
      CurrentFPUSD,
      ProfitLossUSD,
    };
  }
};

export const nftData2 = [
  {
    NftID: 1,
    Name: "Nancy Davolio",
    PurchaseSOL: "Sales Representative",
    CurrentFPSOL: "01/02/2021",
    ProfitLossSOL: "USA",
    PurchaseUSD: "Sales Representative",
    CurrentFPUSD: "01/02/2021",
    ProfitLossUSD: "USA",
    nftImage: avatar3,
  },
];

export const profitLossGrid = [
  {
    headerText: "NFT",
    width: "150",
    template: gridNftImage,
    textAlign: "Center",
  },
  { field: "Name", headerText: "", width: "0", textAlign: "Center" },
  {
    field: "PurchaseSOL",
    headerText: "Purchase (SOL)",
    width: "170",
    textAlign: "Center",
  },
  {
    field: "CurrentFPSOL",
    headerText: "Current FP (SOL)",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "ProfitLossSOL",
    headerText: "P/L (SOL)",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "PurchaseUSD",
    headerText: "Purchase (USD)",
    width: "135",
    textAlign: "Center",
  },
  {
    field: "CurrentFPUSD",
    headerText: "Current FP (USD)",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "ProfitLossUSD",
    headerText: "P/L (USD)",
    width: "120",
    textAlign: "Center",
  },
];
