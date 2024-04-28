import styled from "styled-components";

export const FormContainer = styled.form`
    padding:1rem 0.5rem;
    
    @media screen and (max-width:730px){
        padding:1rem 0;
    }

`;

export const FormFieldContainer= styled.div`
    width: 100%;
    display:inline-flex;

    @media screen and (max-width:730px){
        display:inline;
        text-align:left;
    }
`;

export const StyledFormIcons = styled.div`
    display: flex;
    border: 1px solid black;
    width: 100%;
    height: 100%;
    margin-left:1.7em;
    padding:0;
`;  

