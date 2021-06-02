import React from "react";
import { Team } from "./Team";
import { CharacterCard } from "./CharacterCard";
import Col from "react-bootstrap/Col";
import { CharacterProps, isCharacter } from "./CharacterProps";
import { TeamInformation } from "./TeamInformation";
interface CharacterDataManagerStateProps {
  characteresInTheTeam: CharacterProps[] | CharacterProps[][];
}
interface CharacterDataManagerAttributeProps {}
export class CharacterDataManager extends React.Component<
  CharacterDataManagerAttributeProps,
  CharacterDataManagerStateProps
> {
  // SUPERHEROES_API_URL: string = " https://characterapi.com/api/" + characteresApiToken;
  MAX_SUPERHEROES = 6;
  constructor(_props: any) {
    super(_props);
    this.AddCharacterHandler = this.AddCharacterHandler.bind(this);
    this.removeCharacterHandler = this.removeCharacterHandler.bind(this);
    this.makeCharacterCards = this.makeCharacterCards.bind(this);
    this.removeTeamHandler = this.removeTeamHandler.bind(this);
    this.validateCharacterRequirements =
      this.validateCharacterRequirements.bind(this);
    const characteresInTheTeam: any = JSON.parse(
      localStorage.getItem("userCharactersTeam") ??
        JSON.stringify(Array(this.MAX_SUPERHEROES))
    );
    this.state = {
      characteresInTheTeam,
    };
  }
  componentDidUpdate() {
    localStorage.setItem(
      "userCharactersTeam",
      JSON.stringify(this.state.characteresInTheTeam)
    );
  }
  /**
   * Character must not be neutral
   * Character must not already be a team member
   * Half the team must be bad and the other half good
   */
  validateCharacterRequirements(
    characterData: CharacterProps
  ): string | undefined {
    let alignment: string = characterData.biography.alignment;
    let isCharacterBad: boolean = /bad/i.test(alignment);
    let goodCharacterCounter: number = !isCharacterBad ? 1 : 0;
    let badCharacterCounter: number = isCharacterBad ? -1 : 0;
    for (let character of this.state.characteresInTheTeam) {
      if (!isCharacter(character)) {
        continue;
      }
      if (characterData.id === character.id) {
        return "Character already in the team";
      }
      let alignment: string = character.biography.alignment;
      if (/bad/i.test(alignment)) {
        badCharacterCounter -= 1;
      } else {
        goodCharacterCounter += 1;
      }
    }
    if (badCharacterCounter < -3 || goodCharacterCounter > 3) {
      return /neutral/i.test(alignment)
        ? "Can't add neutral heroes"
        : "Team alignment is unbalanced";
    }
  }
  AddCharacterHandler(
    characterData: CharacterProps | CharacterProps[],
    position: number
  ) {
    console.log("addCharacterHandler", characterData);
    if (!characterData || isNaN(position) || position < 0 || position > 5) {
      console.log("addingError1");
      return "Error adding character";
    }
    const error: string | undefined = isCharacter(characterData)
      ? this.validateCharacterRequirements(characterData)
      : undefined;
    if (error) {
      console.log("addingError2");
      return error;
    }
    this.setState(
      (
        state: CharacterDataManagerStateProps,
        _props: CharacterDataManagerAttributeProps
      ) => {
        state.characteresInTheTeam[position] = characterData;
        return state;
      }
    );
  }
  removeCharacterHandler(position: number) {
    if (isNaN(position) || 0 > position || position > 5) {
      return "remove character error";
    }
    this.setState((state: any, _props: any) => {
      state.characteresInTheTeam[position] = null;
      return state;
    });
  }
  removeTeamHandler() {
    this.setState({ characteresInTheTeam: Array(this.MAX_SUPERHEROES) });
  }
  makeCharacterCards() {
    const cardsBox: any[] = [];
    for (let position: number = 0; position < 6; position++) {
      const cardBox: any = (
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
            height: "50%",
          }}
          key={"Col" + position}
        >
          {/*Cards must recieve the state directly otherwise all cards get rerendered on any modification done to any other card*/}
          <CharacterCard
            position={position}
            characterData={this.state.characteresInTheTeam[position]}
            removeCharacter={this.removeCharacterHandler}
            addCharacterData={this.AddCharacterHandler}
          />
        </Col>
      );
      cardsBox.push(cardBox);
    }
    return cardsBox;
  }
  render() {
    return (
      <>
        <TeamInformation
          removeTeamHandler={this.removeTeamHandler}
          charactersData={this.state.characteresInTheTeam}
        />
        <Team children={this.makeCharacterCards()} />
      </>
    );
  }
}
