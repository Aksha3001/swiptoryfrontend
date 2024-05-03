import styled from "styled-components";

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  z-index: 6;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20));

  @media screen and (max-width:768px){
    height:100vh;
  }
`;

export const ModalLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  min-width: 40%;
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
  @media screen and (max-width: 768px) {
    min-width: 80%;
    padding: 1rem;
  }
`;

export const ModalContentContainer = styled.div`
  width: 80%;
  height: 100%;
  text-align: center;
  z-index: 6;
`;
