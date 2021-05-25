import styled from "styled-components";
import { GrUserAdd } from "react-icons/gr";
import { SuperheroProps } from "./SuperheroProps";
import { AppForm } from "../AppForm";
import React from "react";
const SuperheroBox: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 95%;
  width: 95%;
  border-radius: 10%;
  box-shadow: inset 0 -3px 3px #333;
  background-color: white;
  z-index: 1;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  }
`;
const SuperheroAlignmentBorderBox: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95%;
  width: 95%;
  box-sizing: border-box;
  box-shadow: 0 5px 3px #666;
  border-radius: 10%;
  background-image: ${(props: any) => {
    switch (props.As) {
      case "villan":
        return "linear-gradient(360deg, #c03, #113)";
      case "hero":
        return "linear-gradient(90deg, #616, #33c)";
      default:
        return "linear-gradient(45deg, #999, #333)";
    }
  }};
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  }
`;
export const SuperheroCard: any = (props: any) => {
  const [isBeingChosen, setIsBeingChosen] = React.useState("no");
  const [superheroChoices, setSuperheroChoices]: [string[], Function] =
    React.useState([]);
  return (
    <SuperheroAlignmentBorderBox As={isBeingChosen === "no" ? "" : "villan"}>
      <SuperheroBox
        onClick={
          isBeingChosen === "no"
            ? () => {
                console.log("ok");
                setIsBeingChosen("yes");
              }
            : undefined
        }
      >
        {isBeingChosen === "yes" ? (
          superheroChoices.length > 1 ? (
            JSON.stringify(superheroChoices)
          ) : (
            <AppForm
              initialValues={{
                superheroCardPosition: props.id.match(/\d/)[0] - 1,
                identifier: "",
                setSuperheroChoices,
                requestSuperhero: props.requestSuperhero,
              }}
              superheroCardId={props.id}
              type="superheroes"
            />
          )
        ) : (
          <GrUserAdd />
        )}
      </SuperheroBox>
    </SuperheroAlignmentBorderBox>
  );
};
