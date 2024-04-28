import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import loadingImg from "./assets/images/loading.gif"

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return <Image src={loadingImg}/>;
  }
  return(
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </>
  );
}

export default App;
