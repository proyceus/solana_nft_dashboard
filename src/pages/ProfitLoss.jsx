import React from "react";
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

  const nftData = () => {
    let x = [];

    for (let i = 0; i < walletTokens.length; i++) {
      const Name = walletTokens[i].collectionName;
      const PurchaseSOL = walletTokens[i].purchasePrice;
      const CurrentFPSOL = walletTokens[i].fp;
      const ProfitLossSOL = CurrentFPSOL - PurchaseSOL;
      const PurchaseUSD = PurchaseSOL * walletTokens[i].solPrice;
      const CurrentFPUSD = currentFPSOL * walletTokens[i].solPriceToday;
      const ProfitLossUSD = CurrentFPUSD - PurchaseUSD;
      const nftImage = walletTokens[i].image;

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
  };

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
