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
  font-size: ${window.innerWidth < 600 ? "2em" : "auto"};
`;
