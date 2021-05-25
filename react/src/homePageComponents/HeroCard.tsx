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
export const HeroCard: any = (props: any) => {
  const [isBeingFilledOut, setIsBeingFilledOut] = React.useState(false);
  const [choices, setChoices]: [string[], Function] = React.useState([]);
  return (
    <SuperheroAlignmentBorderBox As={isBeingFilledOut ? "" : "villan"}>
      <SuperheroBox
        onClick={
          isBeingFilledOut
            ? undefined
            : () => {
                setIsBeingFilledOut(!isBeingFilledOut);
              }
        }
      >
        {isBeingFilledOut ? (
          <form
            method="get"
            onSubmit={async (event: any) => {
              event.preventDefault();
              let identifier: string | number = event.target.spn.value;
              const superheroicPackage: any = await props.requestSuperhero(
                identifier
              );
              console.log(superheroicPackage);
              if (Array.isArray(superheroicPackage.data)) {
                const superheroesName: string[] = [];
                superheroicPackage.data.forEach((superhero: any) => {
                  superheroesName.push(superhero.name);
                });
                setChoices(superheroesName);
                console.log(choices);
              }
            }}
          >
            {choices.length > 0 && (
              <select name="" id="">
                <option value="">{choices[0]}</option>
                <option value="">{choices[1]}</option>
                <option value="">{choices[2]}</option>
              </select>
            )}
            <input name="spn" type="text" />
            <button type="submit">asd</button>
          </form>
        ) : (
          <GrUserAdd />
        )}
      </SuperheroBox>
    </SuperheroAlignmentBorderBox>
  );
};
