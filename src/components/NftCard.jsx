import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { GiCancel } from "react-icons/gi";

const NftCard = ({ handleNftClick }) => {
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
      <div
        className="absolute text-2xl cursor-pointer"
        style={{ left: "97.5%", top: "2%" }}
        onClick={handleNftClick}
      >
        <GiCancel />
      </div>
      <div className="h-full w-1/3">
        <img
          src={specificAsset.image}
          className="h-full object-cover rounded-l-xl"
        />
      </div>
      <div className="w-2/3 mt-5">
        <p className="text-2xl mb-5">{specificAsset.name}</p>
        <a href={specificAsset.link} target="_blank">
          MagicEden Link
        </a>
      </div>
    </div>
  );
};

export default NftCard;
