import { AppForm } from "./AppForm";
import styled from "styled-components";
import { AppName } from "./AppName";
const Lobby: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;
export const LoginPage: any = ({ history }: any) => (
  <Lobby>
    <AppName>Super Heroes Teambuilder</AppName>
    <AppForm
      type="auth"
      URL="http://challenge-react.alkemy.org"
      history={history}
    />
  </Lobby>
);
