import styled from "styled-components";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { ImPencil } from "react-icons/im";
import { RiEraserFill } from "react-icons/ri";
import { SuperheroProps, SuperHeroPowerstatsProps } from "./SuperheroProps";
function calculateImperialOrMetricUnit(unitsSet: string[]) {
  let isMetric: Function = (value: string) => /kg|cm/.test(value);
}
const TeamCharacteristicsContainer: any = styled.div``;
const PowerstatsPanelTitle: any = styled.h2``;
const SuperheroesTeamName: any = (props: any) => {
  const previousTeamName: string | null = localStorage.getItem("teamName");
  const defaultTeamNameMessage = "Choose a team name!";
  const [teamName, setTeamName] = React.useState(
    previousTeamName ?? defaultTeamNameMessage
  );
  const [modifingTeamName, setModifingTeamName] = React.useState(
    teamName === defaultTeamNameMessage
  );
  const ChangeTeamNameIcon: any = modifingTeamName ? RiEraserFill : ImPencil;
  React.useEffect(() => {
    localStorage.setItem("teamName", teamName);
  }, [teamName]);
  return (
    <h2
      children={
        <>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={modifingTeamName ? " " : "d-none"}
              children={"Team Name"}
            />
            <FormControl
              disabled={!modifingTeamName}
              value={teamName}
              aria-label="Superhero team name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTeamName(event.target.value)
              }
              className={
                "text-center " + (!modifingTeamName ? "bg-transparent " : " ")
              }
              style={{
                border: !modifingTeamName ? "none" : "",
                fontSize: "24px",
              }}
            />
            <InputGroup.Text
              onClick={() => {
                setModifingTeamName(!modifingTeamName);
              }}
              children={<ChangeTeamNameIcon color="#555" />}
            />
          </InputGroup>
        </>
      }
    />
  );
};
interface TeamPowerstats extends SuperHeroPowerstatsProps<number> {
  averageWeight: { kg: number; lb: number };
  averageHeight: { inches: number; cm: number };
}
export const TeamCharacteristics: any = ({
  superheroesData,
}: {
  superheroesData: SuperheroProps[];
}) => {
  const teamPowerstats: TeamPowerstats = {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
    averageWeight: { kg: 0, lb: 0 },
    averageHeight: { inches: 0, cm: 0 },
  };
  if (superheroesData) {
    for (let superhero of superheroesData) {
      if (!superhero) {
        continue;
      }
      for (let [characteristicName, characteristicValue] of Object.entries(
        superhero.powerstats
      )) {
        // calculates sum of powerstats
        let stat: number = /^\d+$/.test(characteristicValue)
          ? parseInt(characteristicValue)
          : 0;
        teamPowerstats[characteristicName as keyof SuperHeroPowerstatsProps] +=
          stat;
        // calculates average weight and height
        let superheroWeightSet: string[] = superhero.appearance.weight;
        let superheroHeightSet: string[] = superhero.appearance.height;
      }
    }
  }
  return (
    <Container>
      <SuperheroesTeamName />
      {JSON.stringify(teamPowerstats)}
    </Container>
  );
};
