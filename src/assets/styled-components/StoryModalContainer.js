import styled from "styled-components";

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
`;

export const StoryModalContentContainer = styled.div`
  width:100%;
  height:100%;
  text-align:center;
`;
