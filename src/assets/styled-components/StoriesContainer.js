import styled from "styled-components";

export const Container = styled.div`
text-align:center;
`;

export const StoriesContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.ismobile ? '1fr' : '1fr 1fr 1fr 1fr')};
  place-items: center;
  margin:0.2rem;
`;
