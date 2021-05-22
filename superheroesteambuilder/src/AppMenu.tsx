import { Link } from "react-router-dom";
import styled from "styled-components";
import { authenticationContext } from "./App";
import { useContext } from "react";
import { AppName } from "./AppName";
interface MenuProps {}
const StyledUl: any = styled.ul`
  display: flex;
  background-color: #ddd;
  justify-content: ${(props: { token: string }) =>
    props.token ? "space-evenly" : "flex-end"};
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 1%;
  background-color: transparent;
  width: 100%;
`;
export function AppMenu(props: MenuProps) {
  const context: any = useContext(authenticationContext);
  return (
    <>
      <div style={{ width: "100%", borderBottom: "1px solid #333" }}>
        <AppName>Super Heroes Teambuilder</AppName>
        <nav>
          <StyledUl token={context.token}>
            <>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/teambuilder">Team</Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    localStorage.removeItem("token");
                    context.setToken("");
                  }}
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </>
          </StyledUl>
        </nav>
      </div>
    </>
  );
}
