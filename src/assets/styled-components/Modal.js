import styled from "styled-components";

export const Modal = styled.div`
width:100%;
    height: 100vh;
z-index: 1;
position: absolute;
top: 0;
left: 0;
background:linear-gradient(#00000099, #00000099);
`;

export const ModalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-width:40%;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.26);
  background-color: white;
  z-index: 5;

`;

export const ModalContentContainer = styled.div`
  width:80%;
  height:100%;
  text-align:center;
`;
