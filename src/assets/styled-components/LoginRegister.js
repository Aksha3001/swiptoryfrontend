import styled from "styled-components";

export const FormContainer = styled.form`
    padding:1rem 0.5rem;
    text-align:left;
    @media screen and (max-width:730px){
        padding:1rem 0;
    }

`;

export const FormFieldContainer= styled.div`
    width: 100%;
    display:inline-flex;
    text-align:left;
    @media screen and (max-width:768px){
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
    @media screen and (max-width:768px){
        margin-left:0em;
    }
    
`;  