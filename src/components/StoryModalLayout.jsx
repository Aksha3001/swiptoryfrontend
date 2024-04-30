import React from 'react'
import { Modal } from '../assets/styled-components/Modal'
import { StoryModalContainer, StoryModalContentContainer } from '../assets/styled-components/StoryModalContainer'

const StoryModalLayout = ({children}) => {
  return (
    <Modal>
      <StoryModalContainer>
        <StoryModalContentContainer>
        {children}
        </StoryModalContentContainer>
      </StoryModalContainer>
    </Modal>
  )
}

export default StoryModalLayout
