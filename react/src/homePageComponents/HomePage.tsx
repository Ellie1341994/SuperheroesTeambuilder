import { AppName } from "../AppName";
import { SuperheroDataManager } from "./SuperheroDataManager";
export const HomePage = () => {
  return (
    <>
      <AppName>Super Heroes Teambuilder</AppName>
      <SuperheroDataManager />
    </>
  );
};
