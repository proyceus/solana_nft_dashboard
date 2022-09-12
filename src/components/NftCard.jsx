import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { GiCancel } from "react-icons/gi";

const NftCard = ({ handleNftClick }) => {
  const { specificAsset, activeMenu } = useStateContext();

  return (
    <div
      className=" sm:flex-wrap border-solid border-2 gap-10 h-1/2 ml-5 mr-5 border-color rounded-xl fixed flex bg-white flex-nowrap"
      style={{
        top: "30%",
        zIndex: "200",
      }}
    >
      <div className="h-full w-1/2">
        <img
          src={specificAsset.image}
          className=" h-full object-cover rounded-l-xl"
        />
      </div>
      <div className="justify-center flex flex-wrap flex-col pl-5 pr-5">
        <div>
          <p className="md:text-2xl mb-5">{specificAsset.name}</p>
        </div>
        <div className="mt-10">
          <a href={specificAsset.link} target="_blank">
            MagicEden Link
          </a>
        </div>
      </div>
      <div
        className="text-2xl cursor-pointer w-1/6 absolute -right-20 mt-2"
        onClick={handleNftClick}
      >
        <GiCancel />
      </div>
    </div>
  );
};

export default NftCard;
