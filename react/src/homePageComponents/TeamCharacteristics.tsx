import styled from "styled-components";
import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { ImPencil } from "react-icons/im";
import { RiEraserFill } from "react-icons/ri";
import { SuperheroProps, SuperHeroPowerstatsProps } from "./SuperheroProps";
/**
 * Information obtained from https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 */
function keyPressedIsEnter(code: any) {
  return code === 0x001c || code === 0x24 || code === 0x0024 || code === 0x001c;
}
/**
 *@param
 *@returns either a string as a metric unit or undefined if argument is not one
 */
function getMetricUnit(unitsSet: [string, string]): string | undefined {
  return unitsSet.filter((unit) => /kg|cm/.test(unit)).pop();
}
function parseUnit(unit: string | undefined): number {
  return parseInt((unit ?? "").replace(/\D*/, "")) ?? 0;
}
const TeamCharacteristicsContainer: any = styled.div``;
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
        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (modifingTeamName) {
              setModifingTeamName(!modifingTeamName);
            }
          }}
        >
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={modifingTeamName ? " " : "d-none"}
              children={"Team Name"}
            />
            <FormControl
              autoFocus
              id="teamNameInput"
              disabled={!modifingTeamName}
              value={teamName}
              aria-label="Superhero team name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.target.focus();
                setTeamName(event.target.value);
              }}
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
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                console.log(event);
              }}
            />
          </InputGroup>
          <Button type="submit" hidden />
        </Form>
      }
    />
  );
};
/**
  @extends SuperHeroPowerstatsProps<number>
  @param height metric unit
  @param weight metric unit
  @param averageHeight metric unit
  @param averageWeight metric unit
 */
interface TeamPowerstats extends SuperHeroPowerstatsProps<number> {
  height: number;
  weight: number;
}
export const TeamCharacteristics: any = ({
  superheroesData,
}: {
  superheroesData: SuperheroProps[];
}) => {
  const teamMembersAmount: number = superheroesData.length;
  const teamPowerstats: TeamPowerstats = {
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
    height: 0,
    weight: 0,
  };
  if (superheroesData) {
    for (let superhero of superheroesData) {
      if (!superhero || Array.isArray(superhero)) {
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
        let superheroWeight: number = parseUnit(
          getMetricUnit(superhero.appearance.weight)
        );
        teamPowerstats.weight += superheroWeight;

        let superheroHeight: number = parseUnit(
          getMetricUnit(superhero.appearance.height)
        );
        teamPowerstats.height += superheroHeight;
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
