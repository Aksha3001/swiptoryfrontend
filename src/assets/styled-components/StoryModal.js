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
`;

export const ViewStory = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InlineFlex = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

export const StoryButtons = styled.div`
  width: 100%;
  position: absolute;
  top: 2.2rem;
  padding:0.5rem;
  background: linear-gradient(180deg, #000000, transparent);
`;

export const BottomStoryButtons = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0rem;
  padding:0.5rem;
  background: linear-gradient(360deg, #000000, transparent);
`;
