import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const NftCard = () => {
  const { specificAsset, activeMenu } = useStateContext();

  return (
    <div
      className="border-solid border-2 border-color h-96 w-2/3 rounded-xl fixed bg-white flex"
      style={{
        marginLeft: `${activeMenu ? "-2rem" : "5rem"}`,
        top: "30%",
        zIndex: "200",
      }}
    >
      <div className="h-full w-1/3">
        <img
          src={specificAsset.image}
          className="h-full object-cover rounded-l-xl"
        />
      </div>
      <div className="w-2/3 mt-5 text-2xl">
        <p>{specificAsset.name}</p>
      </div>
    </div>
  );
};

export default NftCard;
