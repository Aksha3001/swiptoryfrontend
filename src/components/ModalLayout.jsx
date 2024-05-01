import React, { useEffect, useRef } from "react";
import {
  Modal,
  ModalContentContainer,
  ModalLayoutContainer,
} from "../assets/styled-components/Modal";
import {
  Button,
  FlexContainer,
  StyledText,
} from "../assets/styled-components/global/style";
import { colors } from "../assets/styled-components/global/theme";
import { StyleSheetManager } from "styled-components";
import LoginRegisterForm from "./LoginRegisterForm";
import EditStoryForm from "./EditStoryForm";
import StoryForm from "./StoryForm";

const ModalLayout = ({ closeModal, modalContent }) => {
  const modalRef = useRef(null);
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

  const renderModalContent = () => {
    switch (modalContent) {
      case "login":
        return <LoginRegisterForm formType={"login"} />;
      case "register":
        return <LoginRegisterForm formType={"register"} />;
      case "storyform":
        return <StoryForm/>;
      case "editstory":
        return <EditStoryForm />;
      default:
        return null;
    }
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
      <Modal>
        <ModalLayoutContainer >
          <ModalContentContainer >
            <FlexContainer direction="row-reverse" align="center">
              <Button
                height="2rem"
                width="2rem"
                borderRadius="100%"
                border={`2px solid ${colors.modalclose}`}
                backgroundColor="transparent"
                color={colors.modalclose}
                mobileWidth="2rem"
                mobileHeight="2rem"
                onClick={closeModal}
              >
                <StyledText fontWeight="800" mobileFontSize="1.2rem">
                  X
                </StyledText>
              </Button>
            </FlexContainer>
            {renderModalContent()}
          </ModalContentContainer>
        </ModalLayoutContainer>
      </Modal>
    </StyleSheetManager>
  );
};

export default ModalLayout;
