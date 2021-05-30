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
  height: calc(100% - 15px);
  width: calc(100% - 15px);
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
  margin: 0;
  height: 30vw;
  width: 40vw;
  margin: 1vw;
  box-shadow: -5px 5px 5px #000;
  background-image: ${(props: any) => {
    let linearGradientArgs: any = {
      bad: "360deg, #c03, #113",
      good: "90deg, #616, #33c",
      neutral: "45deg, #999, #999",
    };
    return "linear-gradient(" + linearGradientArgs[props.As] + ")";
  }}};
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  height: 70vw;
  width: 90vw;
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
  <Button
    variant="link"
    onClick={() => {
      props.removeSuperheroHandler(props.superheroPosition);
    }}
    className="text-center p-0 m-0"
  >
    <ImCross size={26} color="#333" />
  </Button>
);
interface SuperheroCardProps {
  addCharacterData: Function;
  superheroData: SuperheroProps | SuperheroProps[];
  removeSuperhero: Function;
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
  let superheroAlignment: string = isSuperhero(props.superheroData)
    ? props.superheroData.biography.alignment
    : "neutral";
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
                //getSuperheroData={props.getSuperheroData}
                addCharacterData={props.addCharacterData}
                inputName={inputName}
              >
                <QuitFormButton quitFormHandler={handleOnClick} />
              </SuperheroForm>
            );
          } else if (!props.superheroData) {
            // INITIAL STATE
            return (
              <AddSuperheroIcon
                showForm={handleOnClick}
                key={"superheroBoxIcon"}
              />
            );
          } else {
            // CURRENT CHARACTER
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
              // CHARACTER SELECTION
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
                      : props.addCharacterData(superhero, superheroPosition);
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
