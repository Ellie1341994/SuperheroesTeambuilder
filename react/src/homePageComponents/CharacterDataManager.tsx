import React from "react";
import { Team } from "./Team";
import { CharacterCard } from "./CharacterCard";
import superheroApiToken from "../superheroApiToken";
import Col from "react-bootstrap/Col";
import { CharacterProps, isCharacter } from "./CharacterProps";
import { TeamInformation } from "./TeamInformation";
type CharactersInTheTeamType = CharacterProps[] | CharacterProps[][] | null[];
interface CharacterDataManagerStateProps {
  characteresInTheTeam: CharactersInTheTeamType;
}
interface CharacterDataManagerAttributeProps {
  urlParameters?: any;
}
/**
  @constant MAX_CHARACTERS number
  @function addCharacterHandler
  @function removeCharacterHandler
  @function removeTeamHandler
  @function validateCharacterRequirements
 */
export class CharacterDataManager extends React.Component<
  CharacterDataManagerAttributeProps,
  CharacterDataManagerStateProps
> {
  MAX_CHARACTERS: number = 6;
  TOKEN: string | null = superheroApiToken;
  constructor(_props: CharacterDataManagerAttributeProps) {
    super(_props);
    this.addCharacterHandler = this.addCharacterHandler.bind(this);
    this.removeCharacterHandler = this.removeCharacterHandler.bind(this);
    this.makeCharacterCards = this.makeCharacterCards.bind(this);
    this.removeTeamHandler = this.removeTeamHandler.bind(this);
    this.validateCharacterRequirements =
      this.validateCharacterRequirements.bind(this);
    const characteresInTheTeam: CharactersInTheTeamType = JSON.parse(
      localStorage.getItem("userCharactersTeam") ??
        JSON.stringify(Array(this.MAX_CHARACTERS))
    );
    this.state = {
      characteresInTheTeam,
    };
    //console.log(_props.urlParameters);
    let token: string | null = superheroApiToken;
    let isTokenValid: boolean = /\d+/.test(this.TOKEN ?? "");
    let newToken: string | null = "";
    //console.log("run");
    while (!isTokenValid) {
      // console.log("middle");
      newToken = window.prompt(
        "Superhero API Token missing. Add a token below"
      );
      token = newToken;
      isTokenValid = window.confirm("Check the token you entered\n" + token);
    }
    //console.log("stop");
    this.TOKEN = token;
  }
  componentDidUpdate() {
    localStorage.setItem(
      "userCharactersTeam",
      JSON.stringify(this.state.characteresInTheTeam)
    );
  }
  /**
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
      return "Team alignment is unbalanced";
    }
  }
  addCharacterHandler(
    characterData: CharacterProps | CharacterProps[],
    position: number
  ) {
    if (!characterData || isNaN(position) || position < 0 || position > 5) {
      return "Error adding character";
    }
    const error: string | undefined = isCharacter(characterData)
      ? this.validateCharacterRequirements(characterData)
      : undefined;
    if (error) {
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
    this.setState(
      (
        state: CharacterDataManagerStateProps,
        _props: CharacterDataManagerAttributeProps
      ) => {
        state.characteresInTheTeam[position] = null;
        return state;
      }
    );
  }
  removeTeamHandler() {
    this.setState({ characteresInTheTeam: Array(this.MAX_CHARACTERS) });
  }
  makeCharacterCards() {
    const cardsBox: JSX.Element[] = [];
    for (let position: number = 0; position < 6; position++) {
      const Card: JSX.Element = (
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
            token={this.TOKEN}
            position={position}
            characterData={this.state.characteresInTheTeam[position]}
            removeCharacter={this.removeCharacterHandler}
            addCharacterData={this.addCharacterHandler}
          />
        </Col>
      );
      cardsBox.push(Card);
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
