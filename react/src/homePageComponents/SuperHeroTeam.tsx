import styled from "styled-components";
import { HeroCard } from "./HeroCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const TeamWrapper: any = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 90%;
  width: 100%;
  margin: 0;
  padding: 0;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    height: auto;
  }
`;
const TeamContainer: any = styled.div`
  margin: 0;
  padding: 0;
  height: 85vh;
  border: 1px solid #333;
  width: 70%;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    width: 90%;
    height: auto;
  }
`;
const TeamTitle: any = styled.h2`
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0;
  height: 10%;
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
    height: auto;
  }
`;
export const SuperHeroTeam: any = () => {
  const SuperHeroes: any = () => {
    const superheroes: any = [];
    for (let i: number = 1; i <= 6; i++) {
      const superhero: any = (
        <Col key={"h" + i} as={HeroCard}>
          {"Hero" + i}
        </Col>
      );
      superheroes.push(superhero);
    }
    return superheroes;
  };
  return (
    <Container as={TeamContainer}>
      <TeamTitle>Title</TeamTitle>
      <Row as={TeamWrapper} md={3} xs={2}>
        <SuperHeroes />
      </Row>
    </Container>
  );
};
