import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Gallery = () => {
  const { walletTokens } = useStateContext();

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
                      className=" object-cover w-full h-full rounded-lg"
                      src={item.image}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Gallery;
