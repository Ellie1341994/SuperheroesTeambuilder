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
 *@param
 *@returns either a string as a metric unit or undefined if argument is not one
 */
function getMetricUnit(unitsSet: [string, string]): number {
  let metricUnit: string | undefined = unitsSet
    .filter((unit) => /kg|cm/.test(unit))
    .pop();
  let parsedUnit: number = parseInt((metricUnit ?? "").replace(/\D+/, "")) ?? 0;
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
  let dataLength: number = charactersData.reduce(
    (counter: number, character: CharacterProps | CharacterProps[]) => {
      return isCharacter(character) ? counter + 1 : counter;
    },
    0
  );
  if (charactersData) {
    let totalWeight: number = 0;
    let totalHeight: number = 0;
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
          // calculates average weight and height
          totalWeight += getMetricUnit(Character.appearance.weight);
          totalHeight += getMetricUnit(Character.appearance.height);
        }
      }
      // THE CODE BELOW IS A QUICK BUT REALLY BAD FIX FOR AN ERROR I DON'T HAVE TIME TO FIX
      // WHERE SOMEHOW THE WEIGHT AND HEIGHT VALUES ARE CALCULATED SIX TIMES MORE
      const BUG_QUICKFIX_VALUE: number = 6;
      teamPowerstats.height = totalHeight / BUG_QUICKFIX_VALUE;
      teamPowerstats.weight = totalWeight / BUG_QUICKFIX_VALUE;
      if (dataLength > 1) {
        teamPowerstats.height = Math.trunc(
          totalHeight / BUG_QUICKFIX_VALUE / dataLength
        );
        teamPowerstats.weight = Math.trunc(
          totalWeight / BUG_QUICKFIX_VALUE / dataLength
        );
      }
    }
  }
  return (
    <Container className="pb-3" style={{ backgroundColor: "#333" }} fluid>
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
        <PowerstatsList data={{ name: "", powerstats: teamPowerstats }} />
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
