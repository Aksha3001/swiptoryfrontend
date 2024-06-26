import styled from "styled-components";

export const StyledNavbar = styled.nav`
  height: 2.8em;
  width: 100%;
  box-shadow: 0px 4px 15px 0px #00000026;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  @media screen and (max-width:768px){
    width:100vw;
  }
  
`;

export const DropDownMenu = styled.div`
  position: absolute;
  width: 10%;
  top: 3rem;
  right: 0;
  padding: 2rem;
  background-color: white;
  box-shadow: 0px 4px 4px 0px #00000040;
  z-index: 2;

  @media screen and (max-width:768px){
    width: 100%;
    height:300px;
  }
`;