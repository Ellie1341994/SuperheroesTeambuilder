import styled from "styled-components";
import React from "react";
export const Name: any = styled.h1`
  font-family: serif;
  text-align: center;
  padding: 1%;
  margin: 0;
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

export const AppName: React.FC<any> = (props) => (
  <div
    style={{ backgroundColor: props.bgc }}
    children={<Name className={props.className} children={props.text} />}
  />
);
