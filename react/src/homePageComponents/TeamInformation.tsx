//import styled from "styled-components";
import Container from "react-bootstrap/Container";
import {
  CharacterProps,
  CharacterPowerstatsProps,
  isCharacter,
} from "./CharacterProps";
import TeamTitle from "./TeamTitle";
import { PowerstatsList } from "./PowerstatsList";
import LogoutButton from "./LogoutButton";
import Button from "react-bootstrap/Button";
import { GiBurningSkull } from "react-icons/gi";
/**
 *@param unitsSet strings must be metric/imperaial units ex: ["100 cm", "5'2"] ["55 kg", "65 lb"]
 *@returns either the number taken from the metric unit string or undefined if argument is not one
 */
function getMetricUnit(unitsSet: [string, string]): number {
  let metricUnit: string | undefined = unitsSet
    .filter((unit) => /kg|cm/.test(unit))
    .pop();
  let unit: string = (metricUnit ?? "").replace(/\D+/, "");
  let parsedUnit: number = parseInt(unit) ?? 0;
  return parsedUnit;
}
/**
  @extends CharacterPowerstatsProps<number>
  @param height metric unit
  @param weight metric unit
  @param averageHeight metric unit
  @param averageWeight metric unit
 */
interface TeamPowerstats extends CharacterPowerstatsProps<number> {
  height: number;
  weight: number;
}
export const TeamInformation: any = ({
  charactersData,
  removeTeamHandler,
}: {
  charactersData: CharacterProps[];
  removeTeamHandler: Function;
}) => {
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
  let numberOfcharactersInTheTeam: number = charactersData.reduce(
    (counter: number, character: CharacterProps | CharacterProps[]) => {
      return isCharacter(character) ? counter + 1 : counter;
    },
    0
  );
  if (charactersData) {
    for (let Character of charactersData) {
      if (isCharacter(Character)) {
        for (let [characteristicName, characteristicValue] of Object.entries(
          Character.powerstats
        )) {
          // calculates sum of powerstats
          let stat: number = /^\d+$/.test(characteristicValue)
            ? parseInt(characteristicValue)
            : 0;
          teamPowerstats[
            characteristicName as keyof CharacterPowerstatsProps
          ] += stat;
        }
        // calculates average weight and height
        teamPowerstats.weight += getMetricUnit(Character.appearance.weight);
        teamPowerstats.height += getMetricUnit(Character.appearance.height);
      }
    }
    if (numberOfcharactersInTheTeam > 1) {
      teamPowerstats.height = Math.trunc(
        teamPowerstats.height / numberOfcharactersInTheTeam
      );
      teamPowerstats.weight = Math.trunc(
        teamPowerstats.weight / numberOfcharactersInTheTeam
      );
    }
  }
  return (
    <Container className="pb-3" fluid>
      <Container
        className="p-2 rounded-bottom"
        style={{
          backgroundColor: "white",
          width: "95%",
          boxShadow: "-5px 5px 5px #000b",
        }}
        fluid
      >
        <TeamTitle />
        <PowerstatsList
          className="bg-transparent d-flex flex-column m-0 justify-content-between w-100 h-100 pr-3 pl-3"
          data={{ name: "", powerstats: teamPowerstats }}
        />
        <Container
          fluid
          className="p-3 d-flex justify-content-between align-items-center"
          children={
            <>
              <LogoutButton />
              <Button
                className="p-1 m-0"
                variant="danger"
                onClick={() => {
                  removeTeamHandler();
                }}
                children={
                  <>
                    <GiBurningSkull color="#fff" /> Delete Team
                  </>
                }
              />
            </>
          }
        />
      </Container>
    </Container>
  );
};
