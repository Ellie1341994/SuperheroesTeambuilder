import styled from "styled-components";
import { SuperheroProps, isSuperhero } from "./SuperheroProps";
import { SuperheroForm } from "./SuperheroForm";
import { Superhero } from "./Superhero";
import Button from "react-bootstrap/Button";
import React from "react";
import { ImCross } from "react-icons/im";
import { AddSuperheroIcon } from "./AddSuperheroIcon";
const SuperheroBox: any = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 95%;
  width: 95%;
  border-radius: 10%;
  background-color: white;
  position: relative;
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
    let linearGradientArgs: any = {
      bad: "360deg, #c03, #113",
      good: "90deg, #616, #33c",
      empty: "45deg, #fcc, #335", // "45deg, #999, #333",
    };
    return "linear-gradient(" + linearGradientArgs[props.As] + ")";
  }}};
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  }
`;
const QuitFormButton: any = (props: { quitFormHandler: any }) => (
  <Button
    id="QuitFormButton"
    onClick={props.quitFormHandler}
    children="Quit form"
  />
);
const DeleteSuperheroDataButton: any = (props: {
  removeSuperheroHandler: Function;
  superheroPosition: number;
}) => (
  <a
    href="/"
    onClick={(event: any) => {
      event.preventDefault();
      props.removeSuperheroHandler(props.superheroPosition);
    }}
  >
    <ImCross color="red" />
  </a>
);
interface SuperheroCardProps {
  getSuperheroData: Function;
  superheroData: SuperheroProps | SuperheroProps[];
  removeSuperhero: Function;
  addSuperhero: Function;
  position: number;
}
export const SuperheroCard: any = (props: SuperheroCardProps) => {
  const [showSuperheroForm, setShowSuperheroForm] = React.useState(false);
  React.useEffect(() => {
    setShowSuperheroForm(
      (previousState: any) => previousState && props.superheroData === null
    );
  }, [props.superheroData]);
  const handleOnClick: any = (event: any) => {
    event.preventDefault();
    setShowSuperheroForm(true);
    if (event.target.id === "QuitFormButton") {
      setShowSuperheroForm(false);
    }
    return undefined;
  };
  let superheroPosition: number = props.position;
  //props.superheroData !== null && !Array.isArray(props.superheroData);
  let superheroAlignment: string = isSuperhero(props.superheroData)
    ? props.superheroData.biography.alignment
    : "empty";
  let inputName: string = "identifier" + superheroPosition;
  let formInitialValues: any = { [inputName]: "" };
  return (
    <SuperheroAlignmentBorderBox As={superheroAlignment}>
      <SuperheroBox id={"superheroBox"}>
        {(() => {
          let superheroBoxItems: any = undefined;
          if (showSuperheroForm) {
            superheroBoxItems = (
              <SuperheroForm
                initialValues={formInitialValues}
                superheroPosition={superheroPosition}
                getSuperheroData={props.getSuperheroData}
                inputName={inputName}
              >
                <QuitFormButton quitFormHandler={handleOnClick} />
              </SuperheroForm>
            );
          } else if (!props.superheroData) {
            return (
              <AddSuperheroIcon
                showForm={handleOnClick}
                key={"superheroBoxIcon"}
              />
            );
          } else {
            if (isSuperhero(props.superheroData)) {
              superheroBoxItems = (
                <Superhero
                  children={
                    <DeleteSuperheroDataButton
                      key={"DeleteSuperheroDataButton"}
                      superheroPosition={superheroPosition}
                      removeSuperheroHandler={props.removeSuperhero}
                    />
                  }
                  curriculumVitae={props.superheroData}
                />
              );
            } else {
              const QuitOptionId: string = "QuitSuperheroSelection";
              const QuitSelectionOption: any = (
                <React.Fragment key={QuitOptionId}>
                  <option>Select or Quit</option>
                  <option id={QuitOptionId} value={superheroPosition}>
                    Quit Selection
                  </option>
                </React.Fragment>
              );

              superheroBoxItems = [QuitSelectionOption];
              let superheroIndex: number = 0;
              for (let superhero of props.superheroData) {
                superheroIndex++;
                const superheroFullName: string =
                  superhero.biography["full-name"];
                superheroBoxItems.push(
                  <option
                    value={superheroIndex}
                    key={superheroFullName + superhero.name}
                  >
                    {superheroFullName
                      ? superheroFullName + `(${superhero.name})`
                      : superhero.name}
                  </option>
                );
              }
              superheroBoxItems = (
                <select
                  onChange={(event: any) => {
                    const select: HTMLSelectElement = event.target;
                    const superhero: any = (
                      props.superheroData as SuperheroProps[]
                    )[parseInt(select.value)];
                    select.options[select.selectedIndex].id === QuitOptionId
                      ? props.removeSuperhero(select.value)
                      : props.addSuperhero(superhero, superheroPosition);
                  }}
                  key="superheroesList"
                >
                  {superheroBoxItems}
                </select>
              );
            }
          }
          return superheroBoxItems;
        })()}
      </SuperheroBox>
    </SuperheroAlignmentBorderBox>
  );
};
