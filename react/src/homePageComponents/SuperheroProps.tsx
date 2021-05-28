export interface SuperHeroPowerstatsProps {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}
export interface SuperHeroBiographyProps {
  "full-name": string;
  "alter-egos": string;
  aliases: string[];
  "place-of-birth": string;
  "first-appearance": string;
  publisher: string;
  alignment: string;
}

export interface SuperHeroAppearenceProps {
  gender: string;
  race: string;
  weight: string[];
  height: string[];
  "eye-color": string;
  "hair-color": string;
}
export interface SuperHeroWorkProps {
  occupation: string;
  base: string;
}
/**
 * @param   id  string;
 * @param   name  string;
 * @param   powerstats  SuperHeroPowerstatsProps;
 * @param   biography  SuperHeroBiographyProps;
 * @param   appearance  SuperHeroAppearenceProps;
 * @param   work  SuperHeroWorkProps;
 * @param  connections?  { "group-affiliation"  string; relatives  string;
 *         };
 * @param  image  { url  string; };
 */
export interface SuperheroProps {
  id: string;
  name: string;
  powerstats: SuperHeroPowerstatsProps;
  biography: SuperHeroBiographyProps;
  appearance: SuperHeroAppearenceProps;
  work: SuperHeroWorkProps;
  connections?: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
}
export function isSuperhero(
  object: SuperheroProps | SuperheroProps[]
): object is SuperheroProps {
  return object && (object as SuperheroProps).biography !== undefined;
}
