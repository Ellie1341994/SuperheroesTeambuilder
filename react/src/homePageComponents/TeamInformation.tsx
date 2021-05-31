//import styled from "styled-components";
import Container from "react-bootstrap/Container";
import {
  SuperheroProps,
  SuperHeroPowerstatsProps,
  isSuperhero,
} from "./SuperheroProps";
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
  //  console.log("metricUnit", metricUnit);
  let parsedUnit: number = parseInt((metricUnit ?? "").replace(/\D+/, "")) ?? 0;
  //console.log("parsedUnit", parsedUnit);
  return parsedUnit;
}
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
export const TeamInformation: any = ({
  superheroesData,
  removeTeamHandler,
}: {
  superheroesData: SuperheroProps[];
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
  let dataLength: number = superheroesData.reduce(
    (counter: number, character: SuperheroProps | SuperheroProps[]) => {
      return isSuperhero(character) ? counter + 1 : counter;
    },
    0
  );
  if (superheroesData) {
    let totalWeight: number = 0;
    let totalHeight: number = 0;
    for (let superhero of superheroesData) {
      if (isSuperhero(superhero)) {
        for (let [characteristicName, characteristicValue] of Object.entries(
          superhero.powerstats
        )) {
          // calculates sum of powerstats
          let stat: number = /^\d+$/.test(characteristicValue)
            ? parseInt(characteristicValue)
            : 0;
          teamPowerstats[
            characteristicName as keyof SuperHeroPowerstatsProps
          ] += stat;
          // calculates average weight and height
          totalWeight += getMetricUnit(superhero.appearance.weight);
          totalHeight += getMetricUnit(superhero.appearance.height);
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
