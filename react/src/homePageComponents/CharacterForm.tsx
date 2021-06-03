import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { CharacterProps, isCharacter } from "./CharacterProps";
import superheroApiToken from "../superheroApiToken";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios, { AxiosResponse } from "axios";
import { FaSuperpowers } from "react-icons/fa";
interface CharacterFormProps {
  initialValues: { [key: string]: string };
  characterPosition: number;
  addCharacterData: Function;
  inputName: string;
  children: any;
}
export const CharacterForm: any = (props: CharacterFormProps) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={(values: any) => {
        const errors: any = {};
        if (!values[props.inputName]) {
          errors[props.inputName] = `Character name or id required!`;
        }
        return errors;
      }}
      onSubmit={async function requestCharacterData(values, { setFieldError }) {
        const identifier: any = values[props.inputName];
        const RELATIVE_BASE_SUPERHERO_URL: string = "/api/" + superheroApiToken;
        const SEARCH_SUPERHERO_URL: string =
          RELATIVE_BASE_SUPERHERO_URL + "/search/" + identifier;
        const DIRECT_SUPERHERO_URL: string =
          RELATIVE_BASE_SUPERHERO_URL + "/" + identifier;
        const identifierIsNumeric: boolean = /^[0-9]+$/.test(identifier);
        const URL: string = identifierIsNumeric
          ? DIRECT_SUPERHERO_URL
          : SEARCH_SUPERHERO_URL;
        try {
          const response: AxiosResponse = await axios.get(URL);
          let {
            response: responseMessage,
            error: responseError,
            "results-for": resultsFor,
            ...characterData
          } = response.data;
          if (!responseError) {
            // case for multiple results
            if (resultsFor) {
              const listOfNonNeutralCharacters: CharacterProps[] =
                characterData.results.filter((character: CharacterProps) =>
                  /bad|good/.test(character.biography.alignment)
                );
              listOfNonNeutralCharacters.length > 1
                ? (characterData = listOfNonNeutralCharacters)
                : (characterData = listOfNonNeutralCharacters.pop());
            }

            // if the character was search directly we need to check this
            if (
              isCharacter(characterData) &&
              !/bad|good/.test(characterData.biography.alignment)
            ) {
              let alignmentError: string = "Character is neutral";
              setFieldError(props.inputName, alignmentError);
            } else {
              let additionError = props.addCharacterData(
                characterData,
                props.characterPosition
              );
              if (additionError) {
                setFieldError(props.inputName, additionError);
              }
            }
          } else {
            setFieldError(props.inputName, responseError);
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="" as={FormikForm}>
          {isSubmitting ? (
            <>
              <FaSuperpowers size={32} color="black" />
              Searching characters ...
            </>
          ) : (
            <>
              <Form.Group className="text-center">
                <Form.Label
                  style={{ fontWeight: 600 }}
                  children={"Character Search"}
                />
                <Field
                  as={Form.Control}
                  placeholder="Character name or id"
                  type="text"
                  name={props.inputName}
                />
                <ErrorMessage
                  className="text-danger pt-2"
                  name={props.inputName}
                  component="div"
                />
              </Form.Group>
              <Container className="m-0 p-0 d-flex justify-content-between">
                <Button
                  type="submit"
                  children={"Search"}
                  disabled={isSubmitting}
                />
                {props.children}
              </Container>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};
