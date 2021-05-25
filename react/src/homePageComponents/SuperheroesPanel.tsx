import React from "react";
import { SuperheroTeam } from "./SuperHeroTeam";
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
    const MAX_SUPERHEROES: number = 6;
    const superheroesInTheTeam: any = JSON.parse(
      localStorage.getItem("userSuperheroesTeam") ??
        JSON.stringify(Array(MAX_SUPERHEROES))
    );
    this.state = {
      superheroesInTheTeam,
      teamPowerstats: {},
    };
    console.log("constructor", this.state);
  }
  componentDidMount() {
    this.computeTeamPowerstats();
  }
  componentDidUpdate(_previousProps: any, _previousState: any) {
    if (
      _previousState.superheroesInTheTeam !== this.state.superheroesInTheTeam
    ) {
      localStorage.setItem(
        "userSuperheroesTeam",
        JSON.stringify(this.state.superheroesInTheTeam)
      );
      this.computeTeamPowerstats();
      console.log(this.state);
    }
  }
  addSuperhero(
    superheroData: SuperheroProps,
    positionInTheTeam: number | string
  ) {
    console.log(superheroData);
    this.setState((state: any, _props: any) => {
      state.superheroesInTheTeam[positionInTheTeam] = superheroData;
      return state;
    });
    console.log(this.state);
  }
  removeSuperhero(id: number | string) {
    this.setState((state: any, _props: any) => {
      state.superheroesInTheTeam[id] = undefined;
      return state;
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
      const {
        response: responseStatus,
        "results-for": resultsFor,
        ...superheroData
      } = response.data;
      // .... :{ response: string; newSuperhero: SuperheroProps } = response.data;
      // the type in the line above is wrong because response is not the property. responseStatus is.
      // TypeScript throws an error if I use responseStatus though, I don't know how to correct it.
      // It doesn't also recognize newSuperhero props
      const mainSuperheroicPackage: any = {
        data: superheroData.results ?? superheroData,
        addSuperhero: this.addSuperhero,
        removeSuperhero: this.removeSuperhero,
      };
      return mainSuperheroicPackage;
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    console.log(this.state);
    return (
      <SuperheroTeam
        teamMembersData={this.state.superheroesInTheTeam}
        teamPowerstatsData={this.state.teamPowerstats}
        requestSuperheroData={this.getSuperheroData}
      />
    );
  }
}
