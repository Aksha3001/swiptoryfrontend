import React, { useEffect, useRef } from 'react';
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
import { StyleSheetManager } from 'styled-components';

const ModalLayout = ({ children, closeModal }) => {
  const modalRef = useRef(null);

  // Function to handle click outside the modal content
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, closeModal]);
  return(
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
    <Modal>
      <ModalLayoutContainer ref={modalRef}>
        <ModalContentContainer >
          <FlexContainer  direction="row-reverse" align="center">
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
              <StyledText fontWeight="800" mobileFontSize="1.2rem">X</StyledText>
            </Button>
          </FlexContainer>
          {children}
        </ModalContentContainer>
      </ModalLayoutContainer>
    </Modal>
    </StyleSheetManager>
  );
};

export default ModalLayout;
