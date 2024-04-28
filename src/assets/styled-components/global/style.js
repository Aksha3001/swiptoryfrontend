import styled, { css } from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  ${(props) =>
    props.direction &&
    css`
      flex-direction: ${props.direction};
    `}
  ${(props) =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
  ${(props) =>
    props.align &&
    css`
      align-items: ${props.align};
    `}
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `}
  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
 }

 
 .toast-container{
    font-size: 14px;
    width:70%;
    margin:2.5rem 6rem;
 }
`;

export const StyledText = styled.span`
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  padding: ${(props) => props.padding || "0"};
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  @media screen and (max-width:768px) {
    font-size: ${(props) =>
      props.mobileFontSize || props.fontSize || "inherit"};
  }
`;

export const Button = styled.button`
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin || "0"};
  font-size: ${(props) => props.fontSize || "1rem"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  cursor: pointer;
  text-align: center;

  /* Conditional styles based on props */
  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}

  @media screen and (max-width:768px) {
    width: ${(props) => props.mobileWidth || props.width || "auto"};
    height: ${(props) => props.mobileHeight || props.height || "auto"};
    font-size: ${(props) => props.mobileFontSize || props.fontSize || "1rem"};
    padding: ${(props) =>
      props.mobilePadding || props.padding || "0"};
    margin: ${(props) => props.mobileMargin || props.margin || "0"};
  }
`;

export const InputField = styled.input`
    width: 80%;
    height: 35px;
    border: 1px solid black;
    padding: 0.5rem;
    margin-left:2em;

    @media screen and (max-width:768px){
      width:100%;
      height:20px;
      margin-left:0;
    }
`;

export const Image = styled.img`
    ${(props)=>props.height && css`height:${props.height};`}
    ${(props)=>props.width && css`width:${props.width};`}
    ${(props)=>props.position && css`position:${props.position};`}
    ${(props)=>props.margin && css`margin:${props.margin};`}
    cursor:pointer;

    @media screen and (max-width:768px){
      ${(props)=>props.mobileImageWidth && css`width:${props.mobileImageWidth};`}
      ${(props)=>props.mobileImageHeight && css`height:${props.mobileImageHeight};`}
    }


`;
