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
  @media (max-width: 576px) {
    /* matches "sm" react boostrap width value */
  }
`;
const BaseContainer: any = styled.div`
  display: flex;
  background-color: #333;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

/**
 * @summary You can have superhero clones in the team
 */
export const SuperheroTeam: any = (props: any) => {
  return (
    <Container fluid as={BaseContainer}>
      <Container fluid as={TeamContainer}>
        <Row as={TeamMembersWrapper} sm={2} xs={1}>
          {props.children}
        </Row>
      </Container>
    </Container>
  );
};
