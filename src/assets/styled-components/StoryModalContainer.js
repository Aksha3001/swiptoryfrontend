import styled from "styled-components";

export const StyledModal = styled.div`
  width: 100%;
  height: 100%;
  z-index: 6;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));

  @media screen and (max-width:768px){
    height:100%;
    width:100%;
  }
`;

export const StoryModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:25%;
  height: 80%;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background-color: linear-gradient(#00000099, #00000099);
  box-shadow: 0 4px 30px 0 #ffffff40;

  @media screen and (max-width: 768px) {
    width:0vw;
    height:0vh;
    top:0%;
    left:0%;
    padding: 0.5rem;
    display:block;
  }
`;

export const StoryModalContentContainer = styled.div`
  width:100%;
  height:100%;
  text-align:center;

  @media screen and (max-width: 768px) {
    width: 100vw;
    height:100vh;
  }
`;