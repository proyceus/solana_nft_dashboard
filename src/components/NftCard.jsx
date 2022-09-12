import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { GiCancel } from "react-icons/gi";

const NftCard = ({ handleNftClick }) => {
  const { specificAsset, activeMenu, assetStats } = useStateContext();

  return (
    <div
      className=" sm:flex-wrap border-solid border-2 h-1/2 ml-5 mr-5 border-color rounded-xl fixed flex bg-white flex-nowrap"
      style={{
        zIndex: "200",
      }}
    >
      <div className="h-full w-1/2">
        <img
          src={specificAsset.image}
          className=" h-full object-cover rounded-l-xl"
        />
      </div>
      <div className="justify-center text-center flex flex-wrap flex-col pl-5 pr-5 w-1/2">
        <div>
          <p className="md:text-2xl font-bold">{specificAsset.name}</p>
        </div>
        <div className="mt-1 underline italic">
          <a href={specificAsset.link} target="_blank">
            MagicEden Link
          </a>
          <br />
          {specificAsset.collection !== undefined && (
            <a
              href={`https://magiceden.io/marketplace/${specificAsset.collection}?activeTab=stats`}
              target="_blank"
            >
              Analytics
            </a>
          )}
        </div>
        <div className="flex justify-center flex-col mt-10 gap-5">
          <div className="border-solid border-2 rounded-xl p-2 bg-gray-100">
            <p>Bought</p>
            <div className="flex justify-center text-center flex-col mt-5">
              <p className="text-xl">50 SOL</p>
              <p className="text-gray-400">10/20/2022</p>
            </div>
          </div>
          <div className="border-solid border-2 rounded-xl p-2 bg-gray-100">
            <p>Current FP</p>
            <div className="flex justify-center text-center flex-col mt-5">
              <p className="text-xl">
                {specificAsset.floorPrice ? specificAsset.floorPrice : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-2xl cursor-pointer w-1/6 absolute right-0 top-0"
        onClick={handleNftClick}
      >
        <div className="absolute right-1 top-1">
          <GiCancel />
        </div>
      </div>
    </div>
  );
};

export default NftCard;
