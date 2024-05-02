import React from "react";
import loadingImg from "../assets/images/loading.gif";
import { Image } from "../assets/styled-components/global/style";
import useWindowSize from "./useWindowResize";

const Loader = () => {
  const isMobile = useWindowSize();
  return (
    <div style={{ textAlign: "center",marginTop:`${isMobile && "5rem"}`}}>
      <Image height="200px" src={loadingImg} />
    </div>
  );
};

export default Loader;
