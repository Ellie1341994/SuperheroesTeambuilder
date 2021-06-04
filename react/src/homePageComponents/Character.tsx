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
  display: flex;
  justify-content: space-evenly;
  padding: 0 3%;
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
      variant="info"
    >
      {props.show ? (
        <GiOpenBook size="32" color="#fff" />
      ) : (
        <MdLibraryBooks size="32" color="#fff" />
      )}
    </Button>
  );
};
const CharacterDetails: React.FunctionComponent<{ data: CharacterProps }> = ({
  data,
}) => {
  const detailsBox: JSX.Element[] = [];
  const appearance: any = data.appearance;
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
    "eye-color": appearance["eye-colo"],
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
      children={<ListGroup variant="flush">{detailsBox}</ListGroup>}
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
    <Container className="d-flex flex-column m-0  h-100 w-100">
      <Container className="d-flex justify-content-center p-0 m-0 h-10">
        <h3 style={{ fontFamily: "serif" }} className=" p-0 m-0">
          {data.name}
        </h3>
      </Container>
      <Container style={{ height: "88%" }} className="d-flex  p-0 m-0  w-100">
        <Image
          alt="DC/MarvelCharacter"
          style={{
            margin: "5%",
            borderRadius: "10%",
            boxShadow: "0 0 5px #333",
          }}
          fluid
          src={data.image.url}
        />
        <Container
          className="d-flex flex-column p-0 m-0  w-50"
          style={{ justifyContent: "space-evenly" }}
        >
          <Container
            style={{ overflowY: "scroll" }}
            className="h-80 flex-wrap"
            fluid
          >
            {displayCharacterInformation ? (
              <CharacterDetails data={data} />
            ) : (
              <PowerstatsList data={data} />
            )}
          </Container>
          <CharacterActionButtonsRow>
            {props.children}
            <ShowCharacterDetailsButton
              className="p-1 m-0 text-center"
              onClickHandler={setDisplayCharacterInformation}
              show={displayCharacterInformation}
            />
          </CharacterActionButtonsRow>
        </Container>
      </Container>
    </Container>
  );
};
