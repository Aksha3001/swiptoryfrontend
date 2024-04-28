import styled from "styled-components";

export const StyledNavbar = styled.nav`
height:2.8em;
width:100%;
box-shadow: 0px 4px 15px 0px #00000026;
position:fixed;
top:0;
left:0;
`;

export const DropDownMenu = styled.div`
position: absolute;
width: 100%;
top: 3rem;

right: 0;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 2rem;
background-color: white;
box-shadow: 0px 4px 4px 0px #00000040;
padding: 2rem 0rem;
z-index: 5;
`;