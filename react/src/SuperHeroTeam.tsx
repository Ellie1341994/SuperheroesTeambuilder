import styled from "styled-components";
import { HeroCard } from "./HeroCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const TeamContainer: any = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 85vh;
  border: 1px solid #333;
  flex-wrap: wrap;
  width: 70%;
`;
const TeamTitle: any = styled.h2`
  text-align: center;
  width: 100%;
`;
export const SuperHeroTeam: any = () => {
  return (
    <Container>
      <Row style={{ height: "10%" }}>
        <TeamTitle>Title</TeamTitle>
      </Row>
      <Row md={3} xs={2}>
        <Col>
          <HeroCard>H1</HeroCard>
        </Col>
        <Col>
          <HeroCard>H1</HeroCard>
        </Col>
        <Col>
          <HeroCard>H3</HeroCard>
        </Col>
        <Col>
          <HeroCard>H4</HeroCard>
        </Col>
        <Col>
          <HeroCard>H1</HeroCard>
        </Col>
        <Col>
          <HeroCard>H6</HeroCard>
        </Col>
      </Row>
    </Container>
  );
};
