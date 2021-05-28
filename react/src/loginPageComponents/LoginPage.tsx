import { LoginForm } from "./LoginForm";
import styled from "styled-components";
import { AppName } from "../AppName";
const Lobby: any = styled.div`
  display: flex;
  background-color: #333;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;
export const LoginPage: any = ({ authContext, history }: any) => (
  <Lobby>
    <AppName children={"Superheroes Teambuilder"} />
    <LoginForm
      history={history}
      initialValues={{
        authContext,
        email: "",
        password: "",
        url: "http://challenge-react.alkemy.org",
      }}
    />
  </Lobby>
);