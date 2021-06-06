import React from "react";
import { AppName } from "../AppName";
import { CharacterDataManager } from "./CharacterDataManager";
export const HomePage: React.FunctionComponent<any> = ({
  authContext,
  history,
  match,
}) => {
  return (
    <div style={{ backgroundColor: "#333" }}>
      <AppName bgc="#fff" text="Superheroes Teambuilder" />
      <CharacterDataManager />
    </div>
  );
};
