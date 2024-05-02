import styled from "styled-components";

export const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width:768px){
    width:100vw;
    height:100vh;
  }
`;

export const Buttons = styled.div`
  position: absolute;
  top: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50vw;
  left: -50%;
  @media screen and (max-width:768px){
    width:100vw;
    left:0;
    top:260px;
  }
`;

export const PrevButton = styled.button`
  top: 50%;
  position: relative;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 1rem;
  padding: 2rem;

  @media screen and (max-width:768px){

  }
`;
