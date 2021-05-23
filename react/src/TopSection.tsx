import { Link } from "react-router-dom";
import styled from "styled-components";
import { authenticationContext } from "./App";
import { useContext } from "react";
import { AppName } from "./AppName";
import { IoExitSharp } from "react-icons/io5";

interface MenuProps {}
const StyledUl: any = styled.ul`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-color: #ddd;
  justify-content: ${(_props: { token: string }) => "flex-end"};
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 1%;
  background-color: transparent;
  color: #636;
`;
const TopContainer: any = styled.div`
  height: 10vh;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #333;
`;
export function TopSection(_props: MenuProps) {
  const context: any = useContext(authenticationContext);
  return (
    <>
      <TopContainer>
        <AppName>Super Heroes Teambuilder</AppName>
        <nav>
          <StyledUl token={context.token}>
            <>
              <li>
                <Link
                  style={{ color: "inherit" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    context.setToken("");
                  }}
                  to="/logout"
                >
                  <IoExitSharp />
                  Logout
                </Link>
              </li>
            </>
          </StyledUl>
        </nav>
      </TopContainer>
    </>
  );
}
