import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; /* Adjust column widths as needed */
  gap: 1rem; /* Adjust the gap between grid items */
  margin: 0.2rem;
  align-items: center;

  @media screen and (max-width:768px){
    grid-template-columns: 160px ;
    text-align:left;
    gap:0;
  }
`;

export const TextAreaField = styled.textarea`
  width: 80%;
  height: 80%;
  border: 1px solid black;
  margin: 0 1.6rem;
  padding: 0.5rem;
  @media screen and (max-width:768px){
    margin:0;
    width: 100%;
    padding: 0.5rem 0 0 0;
  }
`;

export const SelectField = styled.select`
  width: 80%;
  border: 1px solid black;
  outline: none;
  margin: 0 1.6rem;
  height: 35px;
  color: #847c7c;

  font-size: 1rem;
  &:focus {
    border: 1.5px solid #7eff73;
  }

  &::placeholder {
    color: black; /* Placeholder color */
  }

  @media screen and (max-width:768px){
    width:160px;
    height:30px;
    margin:0;
    font-size:14px;
    
    option{
      font-size:14px;
    }
  }
`;
