import React from "react";
import styled from "styled-components";
import icon from "./addCharacterIcon.svg";
const Image: React.FC<any> = styled.img`
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  filter: drop-shadow(2px 3px 1px #333);
`;
export const AddCharacterIcon: any = (props: any) => (
  <Image onClick={props.showForm} src={icon} />
);
/*
  <svg
    onClick={props.showForm}
    stroke="#333"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="56px"
    width="56px"
    xmlns="http://www.w3.org/2000/svg"
    color="#333"
  >
    <path
      fill="none"
      stroke="#555"
      strokeWidth="2"
      d="M5,24 L5,19 M11,24 L11,19 M1,24 L1,18 C1,13.0294373 4.13400675,11 8,11 C11.8659932,11 15,13 15,18 L15,24 M8,11 C10.7614237,11 13,8.76142375 13,6 C13,3.23857625 10.7614237,1 8,1 C5.23857625,1 3,3.23857625 3,6 C3,8.76142375 5.23857625,11 8,11 Z M16,11 L24,11 M20,7 L20,15"
    ></path>
  </svg>
 */
