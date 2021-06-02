import Button from "react-bootstrap/Button";
import React from "react";
import { CharacterProps } from "./CharacterProps";
export default function CharacterSelection({
  characters,
  characterPosition,
  removeCharacter,
  addCharacterData,
}: any) {
  let [error, setError]: any = React.useState("");
  const options: any = [];
  let characterIndex: number = 0;
  for (let character of characters) {
    const characterFullName: string = character.biography["full-name"];
    options.push(
      <option value={characterIndex} key={characterFullName + character.name}>
        {(characterFullName
          ? characterFullName + ` (${character.name}) `
          : character.name) + `(${character.biography.alignment})`}
      </option>
    );
    characterIndex++;
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
              const character: any = (characters as CharacterProps[])[
                parseInt(selectedOption.value)
              ];
              let error: any = addCharacterData(character, characterPosition);
              if (error) {
                setError(error);
              }
            }}
            key="characteresList"
          >
            {options}
          </select>
          <Button
            style={{ flexShrink: 1, width: "80%" }}
            className="flex-shrink-1 text-center"
            children="Quit"
            onClick={() => {
              removeCharacter(characterPosition);
            }}
          />
          <p className="text-danger" children={error} />
        </>
      }
    />
  );
}
