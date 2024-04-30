import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import Loader from "./components/Loader";
import BookmarkPage from "./pages/BookmarkPage";
import StoryModal from "./components/StoryModal";
import UserstoriesPage from "./pages/UserstoriesPage";
import ModalLayout from "./components/ModalLayout";
import StoryModalLayout from "./components/StoryModalLayout";
import useWindowSize from "./components/useWindowResize";
import NavbarMobileView from "./components/NavbarMobileView";


function App() {
  const dispatch = useDispatch();
  const isMobile = useWindowSize();
  const { loading} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (loading) {
    return <Loader/>;
  }
  return(
    <>
      {isMobile ? <NavbarMobileView/> : <Navbar/>}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route
          path="/story/:id"
          element={
            <StoryModalLayout style={{background:"linear-gradient(#00000099, #00000099)",zIndex:1}}>
              <StoryModal />
            </StoryModalLayout>
          }
        />
        <Route path="/bookmarks" element={<BookmarkPage />} />
        <Route path="/my/stories" element={<UserstoriesPage />} />
      </Routes>
    </>
  );
}

export default App;
