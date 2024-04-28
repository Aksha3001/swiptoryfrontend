import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { DropDownMenu, StyledNavbar } from "../assets/styled-components/Navbar";
import LoginRegisterForm from "./LoginRegisterForm";
import {
  Button,
  FlexContainer,
  Image,
  StyledText,
} from "../assets/styled-components/global/style";
import { colors } from "../assets/styled-components/global/theme";
import hamburger from "../assets/icons/hamburger.png";
import bookmark from "../assets/icons/bookmark.png";
import profile from "../assets/images/profile.png";
import { StyleSheetManager } from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const Navbar = () => {
  const [modalContent, setModalContent] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const openModal = (content) => {
    setModalContent(content);
  };

  const handleDropdownClick =() =>{
    setToggleMenu(!toggleMenu);
  }

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
        ].includes(prop)
      }
    >
      <StyledNavbar>
        <FlexContainer justify="space-between" padding="0.5rem 1rem">
          <StyledText fontSize="22px" fontWeight="600">
            SwipTory
          </StyledText>
          {!isAuthenticated ? (
            <div>
              <Button
                width="120px"
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
                width="120px"
                height="2rem"
                fontWeight="600"
                borderRadius="20px"
                backgroundColor={colors.loginregisterbutton}
                onClick={() => openModal("login")}
              >
                Sign In
              </Button>
            </div>
          ) : ( 
            <FlexContainer gap="1rem">
              <Button
                width="120px"
                height="2rem"
                fontWeight="600"
                borderRadius="20px"
                backgroundColor={colors.seemoreandregister}
                onClick={() => navigate("/bookmarks")}
              >
                <Image src={bookmark} alt="Bookmark Icon" />
                Bookmarks
              </Button>
              <Button
               width="120px"
               height="2rem"
               fontWeight="600"
               borderRadius="20px"
               backgroundColor={colors.seemoreandregister}
               onClick={() =>openModal('storyForm')}
              >
                Add Story
              </Button>
              <Button
               height="2rem"
               width="2rem"
               borderRadius="50%"
               onClick={() =>navigate('/')}
              >
                <Image src={profile} alt="Profile image"/>
              </Button>
              <Image
                margin="0.5rem"
                width="fit-content"
                src={hamburger}
                alt="Menu Icon"
                onClick={handleDropdownClick}
              />
              {toggleMenu && 
                (
                 <DropDownMenu>
                   <FlexContainer direction="column" align="center">
                    <StyledText>{username}</StyledText>
                    <Button>

                    </Button>
                  </FlexContainer>
                 </DropDownMenu>
                )
              }
            </FlexContainer>
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

export default Navbar;
