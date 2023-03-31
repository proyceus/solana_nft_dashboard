import React, { useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStateContext } from "../contexts/ContextProvider";

const ProfitLoss = () => {
  const { walletTokens, setNftData, nftData, walletAddress, setWalletAddress } =
    useStateContext();

  const walletAdapter = useWallet();

  useEffect(() => {
    if (walletAddress === null && walletAdapter.connected) {
      setWalletAddress(walletAdapter.publicKey.toString());
      console.log("wallet set");
    }

    //   if (solPriceToday === 0 && connected) {
    //     getSolPriceToday();
    //   }
  }, [walletAdapter.connected]);

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

  const textColorChange = (x) => {
    if (x > 0 || Number(x.slice(1)) > 0) {
      return "text-lime-500";
    } else if (x < 0 || Number(x.slice(1)) < 0) {
      return "text-red-600";
    } else {
      return "text-black";
    }
  };

  const gridUsdProfit = (props) => (
    <p className={textColorChange(props.ProfitLossUSD)}>
      {props.ProfitLossUSD}
    </p>
  );

  const gridSolProfit = (props) => (
    <p className={textColorChange(props.ProfitLossSOL)}>
      {props.ProfitLossSOL}
    </p>
  );

  const profitLossGrid = [
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
      template: gridSolProfit,
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
      template: gridUsdProfit,
      headerText: "P/L (USD)",
      width: "120",
      textAlign: "Center",
    },
  ];

  useEffect(() => {
    let x = [];

    for (let i = 0; i < walletTokens.length; i++) {
      const Name = walletTokens[i].name ?? "N/A";
      const PurchaseSOL = walletTokens[i].purchasePrice ?? "N/A";
      const CurrentFPSOL = walletTokens[i].fp ?? "N/A";
      const ProfitLossSOL =
        PurchaseSOL === "N/A" ? "N/A" : (CurrentFPSOL - PurchaseSOL).toFixed(2);
      const purchasedSolPrice =
        walletTokens[i].solPrice === undefined
          ? "N/A"
          : walletTokens[i].solPrice;
      const PurchaseUSD =
        PurchaseSOL === "N/A"
          ? "N/A"
          : (PurchaseSOL * purchasedSolPrice).toFixed(2);
      const currentSolPrice =
        walletTokens[i].solPriceToday === undefined
          ? "N/A"
          : walletTokens[i].solPriceToday.toFixed(2);
      const CurrentFPUSD = (CurrentFPSOL * currentSolPrice).toFixed(2) ?? "N/A";
      const ProfitLossUSD =
        PurchaseUSD === "N/A" ? "N/A" : (CurrentFPUSD - PurchaseUSD).toFixed(2);
      const nftImage = walletTokens[i].image ?? "N/A";

      const obj = {
        Name,
        PurchaseSOL,
        CurrentFPSOL,
        ProfitLossSOL,
        PurchaseUSD: PurchaseUSD !== "N/A" ? `$${PurchaseUSD}` : PurchaseUSD,
        CurrentFPUSD:
          CurrentFPUSD !== "N/A" ? `$${CurrentFPUSD}` : CurrentFPUSD,
        ProfitLossUSD:
          ProfitLossUSD !== "N/A" ? `$${ProfitLossUSD}` : ProfitLossUSD,
        nftImage,
      };

      x.push(obj);
    }
    setNftData(x);
  }, [walletTokens]);

  if (!walletTokens) {
    return <p>No data</p>;
  }
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="ProfitLoss" />
      <GridComponent
        id="gridcomp"
        dataSource={nftData}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
      >
        <ColumnsDirective>
          {profitLossGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default ProfitLoss;
