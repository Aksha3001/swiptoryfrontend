import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: linear-gradient(180deg, #060606, black);
  width: 100%;

  @media screen and (max-width:768px){
    width:100vw;
    height:40px;
  }
`;

export const ProgressBar = styled.div`
  width: 15%;
  height: 5px;
  background-color: #d9d9d980;
  overflow: hidden;
  margin: 1rem;
  @media screen and (max-width:768px){
    height: 5px;
    margin-top:1.2rem;
  }
`;

export const ProgressDone = styled.div`
  height: 100%;
  background-color: #ffffff;
  transition: width 0.1s linear;

`;
