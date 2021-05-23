import styled from "styled-components";
export const AppName: any = styled.h1`
  font-family: serif;
  text-align: center;
  padding: 1%;
  background-image: linear-gradient(90deg, #f00, #3333ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    font-size: 1.1em;
    padding: 0%;
  }
`;
