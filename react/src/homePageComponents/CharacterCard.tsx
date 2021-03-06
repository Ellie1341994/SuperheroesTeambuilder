import styled, { StyledComponent } from "styled-components";
import { CharacterProps, isCharacter } from "./CharacterProps";
import { CharacterForm } from "./CharacterForm";
import { Character } from "./Character";
import Button from "react-bootstrap/Button";
import React from "react";
import { ImCross } from "react-icons/im";
import { AddCharacterIcon } from "./AddCharacterIcon";
import CharacterSelection from "./CharacterSelection";
import { Transition, TransitionStatus } from "react-transition-group";
const duration = 300;
const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  height: "100%",
  width: "100%",
};
const transitionStyles = {
  entering: {
    height: "100%",
    width: "100%",
  },
  entered: {
    height: "calc(100% - 15px)",
    width: "calc(100% - 15px)",
  },
  exiting: {
    height: "100%",
    width: "100%",
  },
  exited: {
    height: "calc(100% - 15px)",
    width: "calc(100% - 15px)",
  },
  unmounted: {},
};
const CharacterBox: StyledComponent<"div", any, {}, never> = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: 0;
  /* height: calc(100% - 15px); */
  /* width: calc(100% - 15px); */
  background-color: white;
  z-index: 1;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  }
`;
const CharacterAlignmentBorderBox: StyledComponent<
  "div",
  any,
  { As: string },
  never
> = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 30vw;
  width: 40vw;
  margin: 1vw;
  box-shadow: -5px 5px 5px #000;
  background-image: ${({ As }: { As: string }) => {
    let linearGradientArgs: any = {
      bad: "360deg, #c03, #113",
      good: "90deg, #616, #33c",
      neutral: "45deg, #999, #999",
    };
    return "linear-gradient(" + linearGradientArgs[As] + ")";
  }};
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    height: 70vw;
    width: 90vw;
  }
`;
const QuitFormButton: React.FunctionComponent<{
  quitFormHandler: React.MouseEventHandler;
}> = (props) => (
  <Button
    id="QuitFormButton"
    onClick={props.quitFormHandler}
    children="Quit form"
  />
);
const DeletecharacterDataButton: React.FunctionComponent<{
  removeCharacterHandler: Function;
  characterPosition: number;
  className: string;
}> = (props) => (
  <Button
    variant="light"
    onClick={() => {
      props.removeCharacterHandler(props.characterPosition);
    }}
    className={props.className}
  >
    <ImCross size={26} color="#dc3545" />
  </Button>
);
interface CharacterCardProps {
  addCharacterData: Function;
  characterData: CharacterProps | CharacterProps[] | null;
  removeCharacter: Function;
  position: number;
  token?: string | null;
}
export const CharacterCard: React.FunctionComponent<CharacterCardProps> = (
  props
) => {
  const [showCharacterForm, setShowCharacterForm] = React.useState(false);
  React.useEffect(() => {
    setShowCharacterForm(
      (previousState: any) => previousState && props.characterData === null
    );
  }, [props.characterData]);
  const handleOnClick: any = (event: any) => {
    event.preventDefault();
    setShowCharacterForm(true);
    if (event.target.id === "QuitFormButton") {
      setShowCharacterForm(false);
    }
    return undefined;
  };
  let characterPosition: number = props.position;
  let characterAlignment: string = isCharacter(props.characterData)
    ? props.characterData.biography.alignment
    : "neutral";
  let inputName: string = "identifier" + characterPosition;
  let formInitialValues: any = { [inputName]: "" };
  return (
    <CharacterAlignmentBorderBox As={characterAlignment}>
      <Transition in={characterAlignment !== "neutral"} timeout={duration}>
        {(state: TransitionStatus) => (
          <CharacterBox
            style={{ ...defaultStyle, ...transitionStyles[state] }}
            id={"CharacterBox"}
          >
            {(() => {
              if (showCharacterForm) {
                return (
                  <CharacterForm
                    token={props.token}
                    initialValues={formInitialValues}
                    characterPosition={characterPosition}
                    addCharacterData={props.addCharacterData}
                    inputName={inputName}
                  >
                    <QuitFormButton quitFormHandler={handleOnClick} />
                  </CharacterForm>
                );
              } else if (!props.characterData) {
                // DEFAULT STATE
                return (
                  <AddCharacterIcon
                    showForm={handleOnClick}
                    key={"CharacterBoxIcon"}
                  />
                );
              } else {
                // CURRENT CHARACTER
                if (isCharacter(props.characterData)) {
                  return (
                    <Character
                      curriculumVitae={props.characterData}
                      children={
                        <DeletecharacterDataButton
                          key={"DeletecharacterDataButton"}
                          characterPosition={characterPosition}
                          removeCharacterHandler={props.removeCharacter}
                          className="text-center py-0 px-0 p-1  mr-1 w-50"
                        />
                      }
                    />
                  );
                } else {
                  // CHARACTER SELECTION
                  return (
                    <CharacterSelection
                      characterPosition={characterPosition}
                      characters={props.characterData}
                      removeCharacter={props.removeCharacter}
                      addCharacterData={props.addCharacterData}
                    />
                  );
                }
              }
            })()}
          </CharacterBox>
        )}
      </Transition>
    </CharacterAlignmentBorderBox>
  );
};
