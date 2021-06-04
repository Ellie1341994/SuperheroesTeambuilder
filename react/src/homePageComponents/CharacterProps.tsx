export interface CharacterPowerstatsProps<T = string> {
  intelligence: T;
  strength: T;
  speed: T;
  durability: T;
  power: T;
  combat: T;
}
export interface CharacterBiographyProps {
  "full-name": string;
  "alter-egos": string;
  aliases: string[];
  "place-of-birth": string;
  "first-appearance": string;
  publisher: string;
  alignment: string;
}

export interface CharacterAppearenceProps<T = string> {
  gender: T;
  race: T;
  weight: [T, T];
  height: [T, T];
  "eye-color": T;
  "hair-color": T;
}
export interface CharacterWorkProps {
  occupation: string;
  base: string;
}
/**
 * @param   id  string;
 * @param   name  string;
 * @param   powerstats  CharacterPowerstatsProps;
 * @param   biography  CharacterBiographyProps;
 * @param   appearance  CharacterAppearenceProps;
 * @param   work  CharacterWorkProps;
 * @param  connections?  { "group-affiliation"  string; relatives  string;
 *         };
 * @param  image  { url  string; };
 */
export interface CharacterProps {
  id: string;
  name: string;
  powerstats: CharacterPowerstatsProps;
  biography: CharacterBiographyProps;
  appearance: CharacterAppearenceProps;
  work: CharacterWorkProps;
  connections?: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
}
export function isCharacter(
  object: CharacterProps | CharacterProps[] | null
): object is CharacterProps {
  return (
    object !== undefined &&
    object !== null &&
    (object as CharacterProps).biography !== undefined
  );
}
