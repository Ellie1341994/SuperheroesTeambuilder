import React from "react";
import { SuperheroTeam } from "./SuperHeroTeam";
import superheroesApiToken from "../superheroApiToken";
import axios from "axios";
import { AxiosPromise, AxiosResponse } from "axios";
import { SuperheroCard } from "./SuperheroCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SuperheroProps } from "./SuperheroProps";
interface SuperheroesPanelStateProps {
  superheroesInTheTeam: SuperheroProps[];
  teamPowerstats: any;
}
interface SuperheroesPanelAttributeProps {}
export class SuperheroesPanel extends React.Component<
  SuperheroesPanelAttributeProps,
  SuperheroesPanelStateProps
> {
  // SUPERHEROES_API_BASE_URL: string = " https://superheroapi.com/api/" + superheroesApiToken;
  constructor(_props: any) {
    super(_props);
    this.getSuperheroData = this.getSuperheroData.bind(this);
    this.addSuperhero = this.addSuperhero.bind(this);
    this.removeSuperhero = this.removeSuperhero.bind(this);
    this.computeTeamPowerstats = this.computeTeamPowerstats.bind(this);
    this.makeSuperheroCards = this.makeSuperheroCards.bind(this);
    const MAX_SUPERHEROES: number = 6;
    const superheroesInTheTeam: any = JSON.parse(
      localStorage.getItem("userSuperheroesTeam") ??
        JSON.stringify(Array(MAX_SUPERHEROES))
    );
    this.state = {
      superheroesInTheTeam,
      teamPowerstats: {},
    };
  }
  componentDidMount() {
    this.computeTeamPowerstats();
  }
  componentDidUpdate(_previousProps: any, _previousState: any) {
    localStorage.setItem(
      "userSuperheroesTeam",
      JSON.stringify(this.state.superheroesInTheTeam)
    );
    this.computeTeamPowerstats();
  }
  addSuperhero(superheroData: SuperheroProps, position: number) {
    if (!superheroData || isNaN(position) || position < 0 || position > 5) {
      return "Error adding superhero";
    }
    this.setState((state: any, _props: any) => {
      state.superheroesInTheTeam[position] = superheroData;
      return state;
    });
  }
  removeSuperhero(position: number) {
    if (isNaN(position) || 0 > position || position > 5) {
      return "remove superhero error";
    }
    this.setState((state: any, _props: any) => {
      state.superheroesInTheTeam[position] = null;
      return state;
    });
  }
  computeTeamPowerstats() {} //to do
  async getSuperheroData(identifier: string, position: number) {
    const RELATIVE_BASE_SUPERHERO_URL: string = "/api/" + superheroesApiToken;
    const SEARCH_SUPERHERO_URL: string =
      RELATIVE_BASE_SUPERHERO_URL + "/search/" + identifier;
    const DIRECT_SUPERHERO_URL: string =
      RELATIVE_BASE_SUPERHERO_URL + "/" + identifier;
    const identifierIsNumeric: boolean = /^[0-9]+$/.test(identifier);
    const URL: string = identifierIsNumeric
      ? DIRECT_SUPERHERO_URL
      : SEARCH_SUPERHERO_URL;
    try {
      const response: AxiosResponse = await axios.get(URL);
      console.log(response);
      let {
        response: responseMessage,
        error: responseError,
        "results-for": resultsFor,
        ...superheroData
      } = response.data;

      if (!responseError) {
        // case for multiple results
        if (resultsFor) {
          superheroData.results.length > 1
            ? (superheroData = superheroData.results)
            : (superheroData = superheroData.results.pop());
        }
        responseError = this.addSuperhero(superheroData, position);
      }
      console.log(responseError);
      return responseError;
    } catch (error) {
      console.log(error);
    }
  }
  makeSuperheroCards() {
    const cardsBox: any = [];
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
          {/*Cards must recieve the state directly otherwise all cards get rerendered*/}
          <SuperheroCard
            position={position}
            superheroData={this.state.superheroesInTheTeam[position]}
            getSuperheroData={this.getSuperheroData}
            removeSuperhero={this.removeSuperhero}
            addSuperhero={this.addSuperhero}
          />
        </Col>
      );
      cardsBox.push(cardBox);
    }
    return cardsBox;
  }
  render() {
    return <SuperheroTeam> {this.makeSuperheroCards()} </SuperheroTeam>;
  }
}
