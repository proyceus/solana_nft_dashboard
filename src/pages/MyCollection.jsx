import React, { useState } from "react";
import { Gallery } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const MyCollection = () => {
  const { walletAddress } = useStateContext();

  return (
    <div>
      {walletAddress ? (
        <div className="justify-center flex">
          <Gallery />
        </div>
      ) : (
        <p>There is no wallet connected.</p>
      )}
    </div>
  );
};

export default MyCollection;
