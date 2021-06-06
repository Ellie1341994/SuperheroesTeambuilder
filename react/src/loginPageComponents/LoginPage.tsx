import { LoginForm } from "./LoginForm";
import styled from "styled-components";
import { AppName } from "../AppName";
const LoginContainer: any = styled.div`
  display: flex;
  background-color: #333;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;
export const LoginPage: any = ({ authContext, history }: any) => (
  <LoginContainer>
    <AppName text={"Superheroes Teambuilder"} />
    <LoginForm
      history={history}
      initialValues={{
        authContext,
        email: "",
        password: "",
        url: "http://challenge-react.alkemy.org",
      }}
    />
  </LoginContainer>
);
