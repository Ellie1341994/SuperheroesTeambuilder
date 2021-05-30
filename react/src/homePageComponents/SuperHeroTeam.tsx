import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
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
 * @summary You can have superhero clones in the team
 */
export const SuperheroTeam: any = (props: any) => {
  return (
    <Container fluid as={BaseContainer}>
      <Container fluid as={TeamContainer}>
        <Row as={TeamMembersWrapper} md={3} xs={1}>
          {props.children}
        </Row>
      </Container>
    </Container>
  );
};
