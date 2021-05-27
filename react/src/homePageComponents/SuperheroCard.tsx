import styled from "styled-components";
import { SuperheroProps } from "./SuperheroProps";
import { SuperheroForm } from "./SuperheroForm";
import Button from "react-bootstrap/Button";
import React from "react";
const CustomGrUserAddIcon: any = (props: any) => (
  <svg
    onClick={props.onClick}
    stroke="#333"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="56"
    width="56"
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
);
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
      case "bad":
        return "linear-gradient(360deg, #c03, #113)";
      case "good":
        return "linear-gradient(90deg, #616, #33c)";
      default:
        return "linear-gradient(45deg, #999, #333)";
    }
  }};
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
  <Button
    onClick={(event: any) => {
      event.preventDefault();
      props.removeSuperheroHandler(props.superheroPosition);
    }}
    value={"Delete superhero"}
    type="submit"
    variant="link"
    as="input"
  />
);
interface SuperheroCardProps {
  cardId: string;
  getSuperheroData: Function;
  superheroData: SuperheroProps | SuperheroProps[];
  removeSuperhero: Function;
  addSuperhero: Function;
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
  const positionIndex: number = 4;
  let superheroPosition: number = parseInt(props.cardId[positionIndex]);
  let superheroChosen: boolean =
    props.superheroData !== null && !Array.isArray(props.superheroData);
  let superheroAlignment: string = superheroChosen
    ? (props.superheroData as SuperheroProps).biography.alignment
    : "EMPTY";
  let inputName: string = "identifier" + superheroPosition;
  let formInitialValues: any = { [inputName]: "" };
  return (
    <SuperheroAlignmentBorderBox As={superheroAlignment}>
      <SuperheroBox id={"superheroBox"}>
        {(() => {
          console.log(superheroPosition);
          let superheroBoxItems: any = undefined;
          //<React.Fragment key={...}></... doesn't work>
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
              <CustomGrUserAddIcon
                onClick={handleOnClick}
                key={"superheroBoxIcon"}
              />
            );
          } else if (superheroChosen) {
            superheroBoxItems = (
              <>
                {(props.superheroData as SuperheroProps).name}
                <DeleteSuperheroDataButton
                  key={"DeleteSuperheroDataButton"}
                  superheroPosition={superheroPosition}
                  removeSuperheroHandler={props.removeSuperhero}
                />
              </>
            );
            /*<Superhero/>*/
          } else {
            /*<SuperheroesOptions*/
            superheroBoxItems = [];
            for (let superhero of props.superheroData as SuperheroProps[]) {
              const superheroFullName: string =
                superhero.biography["full-name"];
              superheroBoxItems.push(
                <option
                  key={superheroFullName + superhero.name}
                  onClick={() => {
                    props.addSuperhero(superhero, superheroPosition);
                  }}
                  value={JSON.stringify(superhero)}
                >
                  {superheroFullName
                    ? superheroFullName + `(${superhero.name})`
                    : superhero.name}
                </option>
              );
            }
            superheroBoxItems = (
              <select
                onSelect={(event: any) => {
                  // publically available data
                  props.addSuperhero(
                    JSON.parse(event.target.value),
                    superheroPosition
                  );
                }}
                key="superheroesList"
              >
                {superheroBoxItems}
              </select>
            );
          }
          return superheroBoxItems;
        })()}
      </SuperheroBox>
    </SuperheroAlignmentBorderBox>
  );
};
