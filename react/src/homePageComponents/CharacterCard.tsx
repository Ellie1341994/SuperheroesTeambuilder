import styled from "styled-components";
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
const characterCardContentsDefaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const characterCardContentStyle = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 },
};
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
const CharacterBox: any = styled.div`
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
const CharacterAlignmentBorderBox: any = styled.div`
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
const DeletecharacterDataButton: any = (props: {
  removeCharacterHandler: Function;
  characterPosition: number;
}) => (
  <Button
    variant="danger"
    onClick={() => {
      props.removeCharacterHandler(props.characterPosition);
    }}
    className="text-center py-1 px-2 m-0"
  >
    <ImCross size={26} color="#fff" />
  </Button>
);
interface CharacterCardProps {
  addCharacterData: Function;
  characterData: CharacterProps | CharacterProps[];
  removeCharacter: Function;
  position: number;
}
export const CharacterCard: any = (props: CharacterCardProps) => {
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
            <Transition in={false} timeout={duration}>
              {(state: TransitionStatus) => {
                if (showCharacterForm) {
                  return (
                    <CharacterForm
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
                        children={
                          <DeletecharacterDataButton
                            key={"DeletecharacterDataButton"}
                            characterPosition={characterPosition}
                            removeCharacterHandler={props.removeCharacter}
                          />
                        }
                        curriculumVitae={props.characterData}
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
              }}
            </Transition>
          </CharacterBox>
        )}
      </Transition>
    </CharacterAlignmentBorderBox>
  );
};
