import styled from "styled-components";

export const StoryModalContainer = styled.div`
  top: 0;
  height: 100%;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffff;
  z-index: 2;
  @media screen and (max-width:768px){
    height:100%;
  }
`;

export const ViewStory = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width:768px){
    width: 100%;
    height:100vh;
  }
`;

export const InlineFlex = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  @media screen and (max-width:768px){
    width: 90vw;
    height:10vh;
    
  }
`;
export const InlineFlexBottom = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  @media screen and (max-width:768px){
    width: 90vw;
    height:0;
    
  }
`;

export const StoryButtons = styled.div`
  width: 100%;
  position: absolute;
  top: 2.2rem;
  padding: 0.5rem;
  background: linear-gradient(180deg, #000000, transparent);
  @media screen and (max-width:768px){
    width: 99vw;
    top:2.2rem;
  }
`;

export const BottomStoryButtons = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0rem;
  padding: 0.5rem;
  height: 10%;
  background: linear-gradient(360deg, #000000, transparent);

  @media screen and (max-width:768px){
    width: 100vw;
    position: fixed;
    bottom:0;
    padding: 0rem;
    height: 6%;
    background: linear-gradient(360deg,, #000000, transparent);
  }
`;