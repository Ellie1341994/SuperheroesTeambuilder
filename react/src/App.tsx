import React, { useContext, createContext, useState } from "react";
import apiToken from "./apiToken";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { AppMenu } from "./AppMenu";
import { AppBody } from "./AppBody";
import { LoginLobby } from "./LoginLobby";
export const authenticationContext: any = createContext(null);
interface AuthContextType {
  token: string;
  setToken: Function;
}
function App() {
  const token: string = apiToken;
  const superheroApiBaseUrl: string = "https://superheroapi.com/api/" + token;
  console.log(superheroApiBaseUrl);
  return (
    <ProvideAuth>
      <Router>
        <HelmetProvider>
          <Helmet title="Superheroes Teambuilder" />
          <AppBody>
            <Switch>
              <RoutePermissionController>
                {" "}
                <Route strict={true} path="/login" render={LoginLobby} />
                {/*passing AppMenu as a function throws a rule-of-hooks broken exception caused by useContext*/}
                <Route strict={true} path="/home" render={() => <AppMenu />} />
              </RoutePermissionController>
            </Switch>
          </AppBody>
        </HelmetProvider>
      </Router>
    </ProvideAuth>
  );
}
function ProvideAuth({ children }: any) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <authenticationContext.Provider value={{ token, setToken }}>
      {children}
    </authenticationContext.Provider>
  );
}
function RoutePermissionController({ children }: any) {
  const context: AuthContextType = useContext(authenticationContext);
  return (
    <Route
      path="/"
      render={({ location }) => {
        //don't miss the negation operator below
        const inLoginPage: boolean = !(
          location.pathname.search("/login") === -1
        );
        const isAuthenticated: boolean = !!context?.token;
        if (
          (!isAuthenticated && !inLoginPage) ||
          (isAuthenticated && inLoginPage)
        ) {
          return <Redirect to={context?.token ? "/home" : "/login"} />;
        } else {
          return children;
        }
      }}
    />
  );
}

export default App;
