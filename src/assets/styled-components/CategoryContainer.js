import styled from "styled-components";

export const CategoryContainer = styled.div`
    height:auto;
    width:100%;
    overflow-x:hidden;

    @media screen and (max-width:768px){
        height:auto;
        width:95vw;
        overflow-x: scroll;
    }
`;