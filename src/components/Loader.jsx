import React from "react";
import loadingImg from "../assets/images/loading.gif";
import { Image } from "../assets/styled-components/global/style";

const Loader = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Image height="200px" src={loadingImg} />
    </div>
  );
};

export default Loader;
