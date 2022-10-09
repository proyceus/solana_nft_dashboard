import React, { useState } from "react";
import { NftCard } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const MyCollection = () => {
  const { walletAddress } = useStateContext();

  return (
    <div>
      {walletAddress ? <NftCard /> : <p>There is no wallet connected.</p>}
    </div>
  );
};

export default MyCollection;
