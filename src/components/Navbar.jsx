import React, { useContext, useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { DropDownMenu, StyledNavbar } from "../assets/styled-components/Navbar";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAuthUser } from "../store/slices/authSlice";
import { ModalContext } from '../modalcontext/ModalProvider';

const Navbar = () => {
  const dispatch = useDispatch();
  const {openModal,closeModal,modalContent} = useContext(ModalContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(()=>{

  },[modalContent]);

  const handleOpenModal = (content) => {
    openModal(content);
  };

  const handleLogout = () => {
    dispatch(removeAuthUser());
    navigate("/");
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
          "border"
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
                onClick={()=>handleOpenModal("register")}
              >
                Register Now
              </Button>
              <Button
                width="120px"
                height="2rem"
                fontWeight="600"
                borderRadius="20px"
                backgroundColor={colors.loginregisterbutton}
                onClick={() => handleOpenModal("login")}
              >
                Sign In
              </Button>
            </div>
          ) : ( 
            <FlexContainer gap="1rem" align="center">
              <Button
                width="120px"
                height="2rem"

                borderRadius="20px"
                backgroundColor={colors.seemoreandregister}
                onClick={() => navigate("/bookmarks")}
              >
              <FlexContainer justify="center" align="center">
              <Image height="16px" src={bookmark} alt="Bookmark Icon" margin="0 0.2rem" />
              <StyledText fontWeight="600">Bookmarks</StyledText>
              </FlexContainer>
              </Button>
              <Button
               width="120px"
               height="2rem"
               fontWeight="600"
               borderRadius="20px"
               backgroundColor={colors.seemoreandregister}
               onClick={()=>handleOpenModal('storyform')}
              >
                Add Story
              </Button>
                <Image height="2rem" src={profile} alt="Profile image" onClick={() =>navigate('/')} style={{borderRadius:"100%"}}/>
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
                )
              }
            </FlexContainer>
          )}
        </FlexContainer>
      </StyledNavbar>
      {modalContent && (
        <ModalLayout closeModal={closeModal} modalContent={modalContent}/>
      )}
    </StyleSheetManager>
  );
};

export default Navbar;
