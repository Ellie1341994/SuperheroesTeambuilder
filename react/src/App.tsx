import { useContext, createContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HelmetProvider, Helmet } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { AppBody } from "./AppBody";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
interface AuthContextProps {
  token: string;
  setToken: Function;
}
export const authenticationContext: any = createContext(null);
function App() {
  return (
    <ProvideAuth>
      <Router>
        <HelmetProvider>
          <Helmet title="Superheroes Teambuilder" />
          <AppBody>
            <RoutePermissionController />
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
function RoutePermissionController(_props: any) {
  const context: AuthContextProps = useContext(authenticationContext);
  const isAuthenticated: boolean = !!context?.token;
  let pathValue: string = isAuthenticated ? "/*" : "/login";
  let component: any = isAuthenticated ? HomePage : LoginPage;
  const Routes: any = ({ location }: any) => {
    const inLoginPage: boolean = location.pathname.search("/login") >= 0;
    if (
      (!isAuthenticated && !inLoginPage) ||
      (isAuthenticated && inLoginPage)
    ) {
      return <Redirect to={isAuthenticated ? "/home" : "/login"} />;
    } else {
      return (
        <Switch>
          <Route path={pathValue} render={component} />
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
