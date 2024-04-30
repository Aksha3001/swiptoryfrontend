import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAuthUser } from "../store/slices/authSlice";
import { DropDownMenu, StyledNavbar } from "../assets/styled-components/Navbar";
import {
  Button,
  FlexContainer,
  Image,
  StyledText,
} from "../assets/styled-components/global/style";
import { StyleSheetManager } from "styled-components";
import ModalLayout from "./ModalLayout";
import LoginRegisterForm from "./LoginRegisterForm";
import StoryForm from "./StoryForm";
import hamburger from "../assets/icons/hamburger.png";
import bookmark from "../assets/icons/bookmark.png";
import profile from "../assets/images/profile.png";
import close from "../assets/icons/close.png";
import { colors } from "../assets/styled-components/global/theme";

const NavbarMobileView = () => {
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const openModal = (content) => {
    setModalContent(content);
  };

  const handleLogout = () => {
    dispatch(removeAuthUser());
    navigate("/");
  };

  const handleDropdownClick = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <StyleSheetManager
      shouldForwardProp={(prop) =>
        ![
          "fontSize",
          "fontWeight",
          "color",
          "mobileFontSize",
          "mobileWidth",
          "mobileHeight",
          "backgroundColor",
          "borderRadius",
          "justify",
          "padding",
          "align",
          "border",
        ].includes(prop)
      }
    >
      <StyledNavbar>
        <FlexContainer justify="space-between" padding="0.5rem 1rem">
          <StyledText fontSize="22px" fontWeight="600">
            SwipTory
          </StyledText>
          {!isAuthenticated ? (
            <>
              <Image
                margin="0.5rem"
                width="fit-content"
                src={hamburger}
                alt="Menu Icon"
                onClick={handleDropdownClick}
              />
              {toggleMenu && (
                <DropDownMenu>
                  <FlexContainer justify="end">
                    <Image src={close} alt="Close Icon" margin="1rem" onClick={handleDropdownClick}/>
                  </FlexContainer>
                  <FlexContainer direction="column" align="center" gap="2rem">
                    <Button
                      width="140px"
                      height="2rem"
                      fontWeight="600"
                      borderRadius="20px"
                      backgroundColor={colors.seemoreandregister}
                      margin="0 1rem"
                      onClick={() => openModal("register")}
                    >
                      Register Now
                    </Button>
                    <Button
                      width="140px"
                      height="2rem"
                      fontWeight="600"
                      borderRadius="20px"
                      backgroundColor={colors.seemoreandregister}
                      onClick={() => openModal("login")}
                    >
                      Sign In
                    </Button>
                  </FlexContainer>
                </DropDownMenu>
              )}
            </>
          ) : (
            <>
              <Image
                margin="0.5rem"
                width="fit-content"
                src={hamburger}
                alt="Menu Icon"
                onClick={handleDropdownClick}
              />
              {toggleMenu && (
                <DropDownMenu>
                  <FlexContainer justify="end" >
                    <Image src={close} alt="Close Icon" margin="0.5rem" onClick={handleDropdownClick}/>
                  </FlexContainer>
                  <FlexContainer direction="column" align="center" gap="0.5rem">
                    <div style={{display:"flex", alignItems:"center"}}>
                      <Image
                        height="2rem"
                        src={profile}
                        alt="Profile image"
                        onClick={() => navigate("/")}
                        style={{ borderRadius: "100%" }}
                      />
                      <StyledText>&nbsp; {username}</StyledText>
                    </div>
                    <Button
                      width="120px"
                      height="2rem"
                      fontWeight="600"
                      borderRadius="20px"
                      backgroundColor={colors.seemoreandregister}
                      onClick={() => navigate("/my/stories")}
                    >
                      Your Story
                    </Button>
                    <Button
                      width="120px"
                      height="2rem"
                      fontWeight="600"
                      borderRadius="20px"
                      backgroundColor={colors.seemoreandregister}
                      onClick={() => openModal("storyForm")}
                    >
                      Add Story
                    </Button>
                    <Button
                      width="120px"
                      height="2rem"
                      borderRadius="20px"
                      backgroundColor={colors.seemoreandregister}
                      onClick={() => navigate("/bookmarks")}
                    >
                      <FlexContainer justify="center" align="center">
                        <Image
                          height="16px"
                          src={bookmark}
                          alt="Bookmark Icon"
                          margin="0 0.2rem"
                        />
                        <StyledText fontWeight="600">Bookmarks</StyledText>
                      </FlexContainer>
                    </Button>
                    <Button
                      width="120px"
                      height="2rem"
                      fontWeight="600"
                      borderRadius="20px"
                      backgroundColor={colors.seemoreandregister}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </FlexContainer>
                </DropDownMenu>
              )}
            </>
          )}
        </FlexContainer>

        {modalContent && (
          <ModalLayout closeModal={() => setModalContent(null)}>
            {(modalContent === "login" || modalContent === "register") && (
              <LoginRegisterForm formType={modalContent} />
            )}
            {modalContent === "storyForm" && <StoryForm />}
          </ModalLayout>
        )}
      </StyledNavbar>
    </StyleSheetManager>
  );
};

export default NavbarMobileView;
