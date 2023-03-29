import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading, NftCard } from ".";
import { findData, fetchSolanaPrice } from "../helpers/helpers.js";

let solPriceToday = undefined;

const Gallery = () => {
  const {
    walletTokens,
    setWalletTokens,
    isLoading,
    cardClick,
    setCardClick,
    setSpecificAsset,
    specificAsset,
    solPriceToday,
  } = useStateContext();

  const handleNftClick = async (e) => {
    console.log(e.target);
    // if (cardClick === false) {
    //   setSpecificAsset({
    //     image: image,
    //     name: name,
    //     link: link,
    //     collection: collection,
    //     floorPrice: fp,
    //     purchasePrice: purchasePrice,
    //     datePurchased: buyDate,
    //     solPrice,
    //     solPriceToday,
    //   });
    // }

    // if (cardClick === true) setSpecificAsset({});

    // cardClick === false ? setCardClick(true) : setCardClick(false);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {walletTokens && (
        <section className="overflow-hidden text-gray-700 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className=" flex flex-wrap -m-1 md:-m-2">
              {walletTokens.map((item, index) => (
                <div className="flex flex-wrap w-1/3 xl:w-1/5" key={index}>
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt={item.name}
                      className=" object-cover w-full h-full rounded-lg cursor-pointer"
                      src={item.image}
                      onClick={handleNftClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {specificAsset.name && <NftCard handleNftClick={handleNftClick} />}

      {cardClick && (
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, .5)",
            zIndex: "100",
            position: "fixed",
            top: "0",
            left: "0",
          }}
          onClick={handleNftClick}
        ></div>
      )}
    </>
  );
};

export default Gallery;
