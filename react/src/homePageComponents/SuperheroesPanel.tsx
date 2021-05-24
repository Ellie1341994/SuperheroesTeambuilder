import React from "react";
import { SuperHeroTeam } from "./SuperHeroTeam";
import superheroesApiToken from "../superheroApiToken";
import axios from "axios";
import { SuperheroProps } from "./SuperheroProps";
interface SuperheroesPanelStateProps {
  superheroesInTheTeam: any;
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
    const superheroesInTheTeam: any = JSON.parse(
      localStorage.getItem("userSuperheroesTeam") ?? `{}`
    );
    this.state = {
      superheroesInTheTeam,
      teamPowerstats: this.computeTeamPowerstats(),
    };
  }
  componentDidUpdate(_previousProps: any, _previousState: any) {
    if (
      _previousState.superheroesInTheTeam !== this.state.superheroesInTheTeam
    ) {
      localStorage.setItem(
        "userSuperheroesTeam",
        JSON.stringify(this.state.superheroesInTheTeam)
      );
    }
  }
  async componentDidMount() {}
  addSuperhero(superheroData: SuperheroProps) {
    this.setState((_previousProps: any, _previousState: any) => {
      _previousState.superheroesInTheTeam[superheroData.name] = superheroData;
      return {
        superheroesInTheTeam: _previousState, //updated previousState
      };
    });
  }
  removeSuperhero(name: string) {
    this.setState((_previousProps: any, _previousState: any) => {
      delete _previousState.superheroesInTheTeam[name];
      return {
        superheroesInTheTeam: _previousState, //updated previousState
      };
    });
  }
  computeTeamPowerstats() {} //to do
  async getSuperheroData(identifier: number | string) {
    const RELATIVE_BASE_SUPERHERO_URL: string = "/api/" + superheroesApiToken;
    const SEARCH_SUPERHERO_URL: string =
      RELATIVE_BASE_SUPERHERO_URL + "/search/" + identifier;
    const DIRECT_SUPERHERO_URL: string =
      RELATIVE_BASE_SUPERHERO_URL + "/" + identifier;
    const identifierIsNumeric: boolean = typeof identifier === "number";
    const URL: string = identifierIsNumeric
      ? DIRECT_SUPERHERO_URL
      : SEARCH_SUPERHERO_URL;
    try {
      const response: any = await axios.get(URL);
      console.log(response);
      const { response: responseStatus, ...newSuperheroData } = response.data;
      const newSuperhero: SuperheroProps = newSuperheroData;
      // .... :{ response: string; newSuperhero: SuperheroProps } = response.data;
      // the type in the line above is wrong because response is not the property. responseStatus is.
      // TypeScript throws an error if I use responseStatus though, I don't know how to correct it.
      // It doesn't also recognize newSuperhero props
      if (identifierIsNumeric) {
        console.log(newSuperhero);
        this.addSuperhero(newSuperhero);
        return undefined;
      }
      return {
        superheros: response.data.results,
        addSuperhero: this.addSuperhero,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  render() {
    return (
      <SuperHeroTeam
        teamMembersData={this.state.superheroesInTheTeam}
        teamPowerstatsData={this.state.teamPowerstats}
        requestSuperheroData={this.getSuperheroData}
      />
    );
  }
}
