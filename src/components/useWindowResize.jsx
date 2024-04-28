import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(window.screen.width < 730);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.screen.width < 730);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};

export default useWindowSize;