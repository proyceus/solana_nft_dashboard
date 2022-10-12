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
import { useStateContext } from "../contexts/ContextProvider";

const ProfitLoss = () => {
  const { walletTokens, setNftData, nftData } = useStateContext();

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

  useEffect(() => {
    let x = [];

    for (let i = 0; i < walletTokens.length; i++) {
      const Name = walletTokens[i].name ?? "N/A";
      const PurchaseSOL = walletTokens[i].purchasePrice ?? "N/A";
      const CurrentFPSOL = walletTokens[i].fp ?? "N/A";
      const ProfitLossSOL = (CurrentFPSOL - PurchaseSOL).toFixed(2) ?? "N/A";
      const PurchaseUSD = PurchaseSOL * walletTokens[i].solPrice ?? "N/A";
      const currentSolPrice =
        walletTokens[i].solPriceToday === undefined
          ? "N/A"
          : Number(walletTokens[i].solPriceToday.slice(1)).toFixed(2);
      const CurrentFPUSD = CurrentFPSOL * currentSolPrice ?? "N/A";
      const ProfitLossUSD = CurrentFPUSD - PurchaseUSD ?? "N/A";
      const nftImage = walletTokens[i].image ?? "N/A";

      const obj = {
        Name,
        PurchaseSOL,
        CurrentFPSOL,
        ProfitLossSOL,
        PurchaseUSD,
        CurrentFPUSD,
        ProfitLossUSD,
        nftImage,
      };

      x.push(obj);
    }
    setNftData(x);
    console.log("data");
  }, []);

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
