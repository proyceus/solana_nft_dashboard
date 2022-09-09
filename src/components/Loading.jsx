import React from "react";
import loadingGif from "../images/loading.gif";
import { useStateContext } from "../contexts/ContextProvider";

const Loading = () => {
  return (
    <div className="h-10 mt-10">
      <img
        src={loadingGif}
        alt="loading"
        style={{ margin: "0 auto" }}
        className="h-full"
      />
    </div>
  );
};

export default Loading;
