import React from "react";
import { SuperheroTeam } from "./SuperHeroTeam";
import { SuperheroCard } from "./SuperheroCard";
import Col from "react-bootstrap/Col";
import { SuperheroProps, isSuperhero } from "./SuperheroProps";
import { TeamInformation } from "./TeamInformation";
interface SuperheroDataManagerStateProps {
  superheroesInTheTeam: SuperheroProps[] | SuperheroProps[][];
}
interface SuperheroDataManagerAttributeProps {}
export class SuperheroDataManager extends React.Component<
  SuperheroDataManagerAttributeProps,
  SuperheroDataManagerStateProps
> {
  // SUPERHEROES_API_URL: string = " https://superheroapi.com/api/" + superheroesApiToken;
  constructor(_props: any) {
    super(_props);
    this.AddCharacterHandler = this.AddCharacterHandler.bind(this);
    this.removeCharacterHandler = this.removeCharacterHandler.bind(this);
    this.makeCharacterCards = this.makeCharacterCards.bind(this);
    this.validateCharacterRequirements =
      this.validateCharacterRequirements.bind(this);
    const MAX_SUPERHEROES: number = 6;
    const superheroesInTheTeam: any = JSON.parse(
      localStorage.getItem("userSuperheroesTeam") ??
        JSON.stringify(Array(MAX_SUPERHEROES))
    );
    this.state = {
      superheroesInTheTeam,
    };
  }
  componentDidUpdate() {
    localStorage.setItem(
      "userSuperheroesTeam",
      JSON.stringify(this.state.superheroesInTheTeam)
    );
  }
  /**
   * Character must not be neutral
   * Character must not already be a team member
   * Half the team must be bad and the other half good
   */
  validateCharacterRequirements(
    characterData: SuperheroProps
  ): string | undefined {
    let alignment: string = characterData.biography.alignment;
    let isCharacterBad: boolean = /bad/i.test(alignment);
    let goodCharacterCounter: number = !isCharacterBad ? 1 : 0;
    let badCharacterCounter: number = isCharacterBad ? -1 : 0;
    for (let character of this.state.superheroesInTheTeam) {
      if (!isSuperhero(character)) {
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
    superheroData: SuperheroProps | SuperheroProps[],
    position: number
  ) {
    if (!superheroData || isNaN(position) || position < 0 || position > 5) {
      return "Error adding character";
    }
    const error: string | undefined = isSuperhero(superheroData)
      ? this.validateCharacterRequirements(superheroData)
      : undefined;
    if (error) {
      return error;
    }
    this.setState(
      (
        state: SuperheroDataManagerStateProps,
        _props: SuperheroDataManagerAttributeProps
      ) => {
        state.superheroesInTheTeam[position] = superheroData;
        return state;
      }
    );
  }
  removeCharacterHandler(position: number) {
    if (isNaN(position) || 0 > position || position > 5) {
      return "remove superhero error";
    }
    this.setState((state: any, _props: any) => {
      state.superheroesInTheTeam[position] = null;
      return state;
    });
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
          <SuperheroCard
            position={position}
            superheroData={this.state.superheroesInTheTeam[position]}
            removeSuperhero={this.removeCharacterHandler}
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
        <TeamInformation superheroesData={this.state.superheroesInTheTeam} />
        <SuperheroTeam> {this.makeCharacterCards()} </SuperheroTeam>
      </>
    );
  }
}
