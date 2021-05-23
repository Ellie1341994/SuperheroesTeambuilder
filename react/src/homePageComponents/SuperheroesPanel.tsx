import styled from "styled-components";
import React from "react";
import { TeamPowerstats } from "./TeamPowerstats";
import { SuperHeroTeam } from "./SuperHeroTeam";
const SectionContainer: any = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    flex-direction: column;
  }
`;
export class SuperheroesPanel extends React.Component<any, any> {
  constructor(_props: any) {
    super(_props);
    this.state = {};
  }
  async componentDidMount() {}
  render() {
    return (
      <SectionContainer>
        <SuperHeroTeam />
        <TeamPowerstats />
      </SectionContainer>
    );
  }
}
