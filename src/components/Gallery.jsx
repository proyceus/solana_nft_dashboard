import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Loading, NftCard } from ".";

const Gallery = () => {
  const {
    walletTokens,
    isLoading,
    cardClick,
    setCardClick,
    setSpecificAsset,
    specificAsset,
  } = useStateContext();

  const handleNftClick = async (e) => {
    const image = e.target.dataset.image;
    const name = e.target.dataset.name;
    const link = e.target.dataset.link;
    const collection = e.target.dataset.collection;
    const fp = await fetch(
      `https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => data.floorPrice / 1000000000)
      .catch((err) => console.error("error: ", err));

    console.log(fp);

    if (cardClick === false) {
      setSpecificAsset({
        image: image,
        name: name,
        link: link,
        collection: collection,
        floorPrice: fp,
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
