import styled from "styled-components";
const TeamPowerstatsContainer: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 85vh;
  width: 20%;
  border: 1px solid #333;
`;
const PowerstatsPanelTitle: any = styled.h2``;
export const TeamPowerstats: any = () => {
  return (
    <TeamPowerstatsContainer>
      <PowerstatsPanelTitle>Team Powerstats</PowerstatsPanelTitle>
    </TeamPowerstatsContainer>
  );
};
