import { SuperheroProps, SuperHeroPowerstatsProps } from "./SuperheroProps";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { MdLibraryBooks } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";
import React from "react";
export const Superhero: any = (props: {
  children: any;
  curriculumVitae: SuperheroProps;
}) => {
  const data: SuperheroProps = props.curriculumVitae;
  let [displaySuperheroInformation, setDisplaySuperheroInformation] =
    React.useState(false);
  const SuperheroInformation: any = () => {
    const detailsBox: any = [];
    const appearance: any = data.appearance;
    const aliases = data.biography.aliases;
    let getRandomIndex: Function = (max: number) =>
      Math.floor(Math.random() * max);
    let randomAliasIndex: number = getRandomIndex(aliases.length);
    const details: any = {
      Height: appearance.height,
      Weight: appearance.weight,
      "Hair color": appearance["hair-color"],
      "Eye color": appearance["eye-colo"],
      Workplace: data.work.base,
      Alias: aliases[randomAliasIndex],
    };
    console.log(details);
    let randomValueIndex: number = getRandomIndex(2);
    for (let [key, value] of Object.entries(details)) {
      if (Array.isArray(value)) {
        value = value[randomValueIndex];
      }
      detailsBox.push(
        <ListGroup.Item className="p-1" key={key + value}>
          {key + " " + (value || "...")}
        </ListGroup.Item>
      );
    }
    return <ListGroup variant="flush">{detailsBox}</ListGroup>;
  };
  const Powerstats: any = () => {
    const powerstats: any = [];
    console.log(data.powerstats);
    for (let key in data.powerstats) {
      let value: string | undefined =
        data.powerstats[key as keyof SuperHeroPowerstatsProps];
      if (value === "null") {
        value = undefined;
      }
      powerstats.push(
        <ListGroup.Item className="p-0" key={key + data.name}>
          {key + " " + (value || "...")}
        </ListGroup.Item>
      );
    }
    return (
      <ListGroup className="" variant="flush">
        {powerstats}
      </ListGroup>
    );
  };
  return (
    <>
      <Container className="position-relative h-100 p-0 m-0 w-100">
        <Row className="h-10 w-100 text-center" xs={1} sm={1} md={1}>
          <h3 className="p-0 m-0">{data.name}</h3>
        </Row>
        <Row className="h-90 w-100" xs={2} sm={2} md={2}>
          <Image alt="" className="" src={data.image.url} />
          <Col className="p-0 m-0 h-100 w-50">
            {displaySuperheroInformation ? (
              <>
                <SuperheroInformation />
              </>
            ) : (
              <>
                <Powerstats />
              </>
            )}
            <Row className="">
              {props.children}
              <Button
                onClick={() =>
                  setDisplaySuperheroInformation(!displaySuperheroInformation)
                }
                variant="link"
              >
                {displaySuperheroInformation ? (
                  <GiOpenBook size="32" color="red" />
                ) : (
                  <MdLibraryBooks size="32" color="red" />
                )}
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
