import styled from "styled-components";
export const AppName: any = styled.h1`
  color: #0062cc;
  font-family: serif;
  width: 100%;
  text-align: center;
  position: relative;
  padding: 1%;
  text-shadow: 0px 5px 3px #777;
  font-weight: bold;
  font-size: ${window.innerWidth < 600 ? "2em" : "auto"};
`;
