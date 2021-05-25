import styled from "styled-components";
import { SuperheroCard } from "./SuperheroCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import { TeamPowerstats } from "./TeamPowerstats";
const TeamMembersWrapper: any = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    height: 90%;
  }
`;
const TeamContainer: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 90%;
  width: 90%;
  border: 1px solid #333;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    height: 100%;
  }
`;
const BaseContainer: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 90vh;
`;

/**
 * Takes a function that requests superheroes
 *
 * Note: this is a sketched doc
 * @summary You can have superhero clones in the team
 */
export const SuperheroTeam: any = (props: any) => {
  const SuperHeroCards: any = () => {
    const cards: any = [];
    for (let i: number = 1; i <= 6; i++) {
      const card: any = (
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
            height: "50%",
          }}
          key={"Col" + i}
        >
          <SuperheroCard
            id={"Card" + i}
            requestSuperhero={props.requestSuperheroData}
          />
        </Col>
      );
      cards.push(card);
    }
    return cards;
  };
  return (
    <Container fluid as={BaseContainer}>
      <Container fluid as={TeamContainer}>
        <Row as={TeamMembersWrapper} md={3} xs={1}>
          <SuperHeroCards />
        </Row>
      </Container>
    </Container>
  );
};
