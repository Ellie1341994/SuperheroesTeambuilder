import { useContext, createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./loginPageComponents/LoginPage";
import { HomePage } from "./homePageComponents/HomePage";
export interface AuthContextProps {
  token: string;
  setToken: Function;
}
export const AuthenticationContext: any = createContext(null);
function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <HelmetProvider>
          <Helmet title="Superheroes Teambuilder" />
          <RoutePermissionController />
        </HelmetProvider>
      </BrowserRouter>
    </ProvideAuth>
  );
}
function ProvideAuth({ children }: any) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <AuthenticationContext.Provider value={{ token, setToken }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
function RoutePermissionController(_props: any) {
  const authContext: AuthContextProps = useContext(AuthenticationContext);
  const isAuthenticated: boolean = authContext && authContext.token !== null;
  let homePath: string =
    "/home.:firstCharacterId?.:secondCharacterId?.:thirdCharacterId?.:fourthCharacterId?.:fifthCharacterId?.:sixthCharacterId?";
  let loginPath: string = "/login";
  let pathValue: string = isAuthenticated ? homePath : loginPath;
  let Component: any = isAuthenticated ? HomePage : LoginPage;
  const Routes: any = ({ location }: any) => {
    const inLoginPage: boolean = location.pathname.search("/login") >= 0;
    const inHomePage: boolean = location.pathname.search("/home") >= 0;
    if (
      (!isAuthenticated && !inLoginPage) ||
      (isAuthenticated && !inHomePage)
    ) {
      return <Redirect to={isAuthenticated ? "/home" : "/login"} />;
    } else {
      return (
        <Switch>
          <Route
            path={pathValue}
            render={({ history, match }) => (
              <Component
                history={history}
                match={match}
                authContext={isAuthenticated ? undefined : authContext}
              />
            )}
          />
        </Switch>
      );
    }
  };
  return (
    <Route //index route
      path="/"
      render={Routes}
    />
  );
}

export default App;
