import styled from "styled-components";
import { TeamPowerstats } from "./TeamPowerstats";
import { SuperHeroTeam } from "./SuperHeroTeam";
const SectionContainer: any = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export const BottomSection: any = () => {
  return (
    <SectionContainer>
      <SuperHeroTeam />
      <TeamPowerstats />
    </SectionContainer>
  );
};
