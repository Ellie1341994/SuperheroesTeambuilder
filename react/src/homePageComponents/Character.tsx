import { CharacterProps, CharacterAppearenceProps } from "./CharacterProps";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { MdLibraryBooks } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import React from "react";
import styled from "styled-components";
import { PowerstatsList } from "./PowerstatsList";
const CharacterActionButtonsRow: React.FunctionComponent = styled.div`
  height: 25%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0%;
  margin-bottom: 0%;
`;
const ShowCharacterDetailsButton: React.FunctionComponent<{
  className: string;
  onClickHandler: Function;
  show: boolean;
}> = (props) => {
  return (
    <Button
      className={props.className}
      onClick={() => props.onClickHandler(!props.show)}
      variant="light"
    >
      {props.show ? (
        <GiOpenBook size="32" color="#17a2b8" />
      ) : (
        <MdLibraryBooks size="32" color="#17a2b8" />
      )}
    </Button>
  );
};
const CharacterDetails: React.FunctionComponent<{ data: CharacterProps }> = ({
  data,
}) => {
  const detailsBox: JSX.Element[] = [];
  const appearance: CharacterAppearenceProps = data.appearance;
  const aliases = data.biography.aliases;
  let getRandomIndex: Function = (max: number) =>
    Math.floor(Math.random() * max);
  let randomAliasIndex: number = getRandomIndex(aliases.length);
  const details:
    | { workplace: string; alias: string }
    | CharacterAppearenceProps = {
    height: appearance.height,
    weight: appearance.weight,
    "hair-color": appearance["hair-color"],
    "eye-color": appearance["eye-color"],
    workplace: data.work.base,
    alias: aliases[randomAliasIndex],
  };
  for (let [key, value] of Object.entries(details)) {
    if (Array.isArray(value)) {
      value = value.join(" or ");
    }
    let DetailItem: JSX.Element = (
      <ListGroup.Item
        className="d-flex flex-wrap justify-content-between text-capitalize p-1"
        key={key + value}
      >
        <strong children={key + ":"} />
        {value || "..."}
      </ListGroup.Item>
    );
    detailsBox.push(DetailItem);
  }
  return (
    <Container
      className="h-100 overflow-scroll p-0 m-0"
      fluid
      children={
        <ListGroup
          className="h-100 w-100 d-flex justify-content-between "
          variant="flush"
        >
          {detailsBox}
        </ListGroup>
      }
    />
  );
};

export const Character: React.FunctionComponent<{
  children: any;
  curriculumVitae: CharacterProps;
}> = (props) => {
  const data: CharacterProps = props.curriculumVitae;
  let [displayCharacterInformation, setDisplayCharacterInformation] =
    React.useState(false);
  return (
    <Container className="d-flex flex-column m-0  h-100 w-100 p-0">
      <Container className="d-flex align-items-center justify-content-center p-0 m-0 h-25">
        <h3
          style={{ fontFamily: "serif", textShadow: "1 1px 2px #333" }}
          className=" p-0 m-0"
        >
          {data.name}
        </h3>
      </Container>
      <Container className="d-flex  h-75 p-0 m-0  w-100">
        <Container className="d-flex h-100 justify-content-center align-items-center p-3 m-0  w-50">
          <Image
            alt="DC/MarvelCharacter"
            style={{
              borderRadius: "10%",
              boxShadow: "1px 2px 4px #333",
            }}
            className="w-100 h-100 m-0 p-0"
            fluid
            src={data.image.url}
          />
        </Container>
        <Container
          className="d-flex flex-column py-3 pl-0 pr-3 m-0  h-100 w-50"
          style={{ justifyContent: "space-between" }}
        >
          <Container
            style={{ overflowY: "auto" }}
            className="p-0 m-0 flex-wrap h-75"
            fluid
          >
            {displayCharacterInformation ? (
              <CharacterDetails data={data} />
            ) : (
              <PowerstatsList
                className="bg-transparent d-flex flex-column m-0 justify-content-between w-100 h-100 pr-0 pl-0"
                data={data}
              />
            )}
          </Container>
          <CharacterActionButtonsRow>
            {props.children}
            <ShowCharacterDetailsButton
              className="p-0 ml-1 w-50 text-center"
              onClickHandler={setDisplayCharacterInformation}
              show={displayCharacterInformation}
            />
          </CharacterActionButtonsRow>
        </Container>
      </Container>
    </Container>
  );
};
