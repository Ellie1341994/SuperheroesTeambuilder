import styled from "styled-components";
import { GrUserAdd } from "react-icons/gr";
import { SuperheroProps } from "./SuperheroProps";
const SuperheroBox: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25%;
  margin: 0;
  border: 1px solid #333;
  box-sizing: border-box;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  }
`;
export const HeroCard: any = () => {
  return (
    <SuperheroBox
      onClick={() => {
        alert("clicked");
      }}
    >
      <GrUserAdd />
    </SuperheroBox>
  );
};
