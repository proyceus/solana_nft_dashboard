import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading, NftCard } from ".";
import moment from "moment";
import { findData } from "../helpers/helpers.js";

const Gallery = () => {
  const {
    walletTokens,
    isLoading,
    cardClick,
    setCardClick,
    setSpecificAsset,
    specificAsset,
    collectionFp,
    setCollectionFp,
    datePurchased,
    setDatePurchased,
  } = useStateContext();

  const handleNftClick = async (e) => {
    const image = e.target.dataset.image;
    const name = e.target.dataset.name;
    const link = e.target.dataset.link;
    const collection = e.target.dataset.collection;
    const address = e.target.dataset.address;
    let fp;
    let purchasePrice;
    let buyDate;

    if (cardClick === false) {
      if (!findData(collectionFp, collection, "collection")) {
        console.log("fetching data");
        fp = await fetch(
          `https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setCollectionFp((prevState) => [
              ...prevState,
              {
                collection: collection,
                fp: data.floorPrice / 1000000000,
              },
            ]);
            return data.floorPrice / 1000000000;
          })
          .catch((err) => console.error("error: ", err));
      } else {
        for (let i = 0; i < collectionFp.length; i++) {
          if (collectionFp[i]["collection"] === collection) {
            fp = collectionFp[i].fp;
            break;
          }
        }
      }

      if (!findData(datePurchased, address, "address")) {
        console.log("fetching data");
        purchasePrice = await fetch(
          `https://api-mainnet.magiceden.dev/v2/tokens/${address}/activities?offset=0&limit=10`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            for (let i = 0; i < data.length; i++) {
              if (data[i].type === "buyNow") {
                buyDate = moment.unix(data[i].blockTime).format("MM/DD/YYYY");
                setDatePurchased((prevState) => [
                  ...prevState,
                  {
                    address: address,
                    date: buyDate,
                    price: data[i].price,
                  },
                ]);
                return data[i].price;
              }
            }
            setDatePurchased((prevState) => [
              ...prevState,
              {
                address,
                date: "N/A",
                price: "N/A",
              },
            ]);
            return "N/A";
          });
      } else {
        for (let i = 0; i < datePurchased.length; i++) {
          if (datePurchased[i]["address"] === address) {
            purchasePrice = datePurchased[i].price;
            buyDate = datePurchased[i].date;
            break;
          }
        }
      }

      setSpecificAsset({
        image: image,
        name: name,
        link: link,
        collection: collection,
        floorPrice: fp,
        purchasePrice: purchasePrice,
        datePurchased: buyDate,
      });
    }

    cardClick === false ? setCardClick(true) : setCardClick(false);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {walletTokens && (
        <section className="overflow-hidden text-gray-700 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
            <div className=" flex flex-wrap -m-1 md:-m-2">
              {walletTokens.map((item, index) => (
                <div className="flex flex-wrap w-1/3" key={index}>
                  <div className="w-full p-1 md:p-2">
                    <img
                      alt={item.name}
                      className=" object-cover w-full h-full rounded-lg cursor-pointer"
                      src={item.image}
                      data-image={item.image}
                      data-name={item.name}
                      data-link={`https://magiceden.io/item-details/${item.mintAddress}`}
                      data-collection={item.collection}
                      data-address={item.mintAddress}
                      onClick={handleNftClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {cardClick && <NftCard handleNftClick={handleNftClick} />}

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
