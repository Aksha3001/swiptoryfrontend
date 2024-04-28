import React from 'react';
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

const ModalLayout = ({ children, closeModal }) => {
  return(
    <Modal>
      <ModalLayoutContainer>
        <ModalContentContainer>
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
  );
};

export default ModalLayout;
