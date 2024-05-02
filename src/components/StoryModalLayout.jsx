import React from 'react'
import { StoryModalContainer, StoryModalContentContainer, StyledModal } from '../assets/styled-components/StoryModalContainer'

const StoryModalLayout = ({children}) => {
  return (
    <StyledModal>
      <StoryModalContainer>
        <StoryModalContentContainer>
        {children}
        </StoryModalContentContainer>
      </StoryModalContainer>
    </StyledModal>
  )
}

export default StoryModalLayout
