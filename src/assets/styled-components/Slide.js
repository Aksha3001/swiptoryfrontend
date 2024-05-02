import styled from "styled-components";

export const StyledSlide = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (max-width){
    width: 100vw;
    height: 100vh;
  }
`;
export const SlideText = styled.div`
  position: absolute;
  bottom: 5rem;
  left: 0%;
  text-align:left;
  padding: 0 1rem;

  @media screen and (max-width:768px){
    width: 90vw;
    top:410px;
    font-size:14px;
    padding:0 0.5rem;
    margin-left:1.5rem;
  }
  `;
