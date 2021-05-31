import Button from "react-bootstrap/Button";
import React from "react";
import { SuperheroProps, isSuperhero } from "./SuperheroProps";
export default function CharacterSelection({
  characters,
  superheroPosition,
  removeSuperhero,
  addCharacterData,
}: any) {
  let [error, setError]: any = React.useState("");
  const options: any = [];
  let superheroIndex: number = 0;
  for (let superhero of characters) {
    const superheroFullName: string = superhero.biography["full-name"];
    options.push(
      <option value={superheroIndex} key={superheroFullName + superhero.name}>
        {(superheroFullName
          ? superheroFullName + ` (${superhero.name}) `
          : superhero.name) + `(${superhero.biography.alignment})`}
      </option>
    );
    superheroIndex++;
  }
  return (
    <label
      htmlFor="characterSelect"
      className="d-flex justify-content-evenly align-items-center flex-column w-100"
      children={
        <>
          <h3 style={{ flexShrink: 1, width: "80%", fontFamily: "serif" }}>
            Select character
          </h3>
          <select
            id="characterSelect"
            className="form-select flex-shrink-1"
            style={{ flexShrink: 1, width: "80%" }}
            size={6}
            onChange={(event: any) => {
              const select: HTMLSelectElement = event.target;
              const selectedOption: HTMLOptionElement =
                select.options[select.selectedIndex];
              const superhero: any = (characters as SuperheroProps[])[
                parseInt(selectedOption.value)
              ];
              let error: any = addCharacterData(superhero, superheroPosition);
              if (error) {
                setError(error);
              }
            }}
            key="superheroesList"
          >
            {options}
          </select>
          <Button
            style={{ flexShrink: 1, width: "80%" }}
            className="flex-shrink-1 text-center"
            children="Quit"
            onClick={() => {
              removeSuperhero(superheroPosition);
            }}
          />
          <p className="text-danger" children={error} />
        </>
      }
    />
  );
}
