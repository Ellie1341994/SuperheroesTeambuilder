import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { SuperheroProps } from "./SuperheroProps";
import superheroesApiToken from "../superheroApiToken";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios, { AxiosResponse } from "axios";
interface SuperheroFormProps {
  initialValues: { [key: string]: string };
  superheroPosition: number;
  addCharacterData: Function;
  inputName: string;
  children: any;
}
export const SuperheroForm: any = (props: SuperheroFormProps) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validate={(values: any) => {
        const errors: any = {};
        if (!values[props.inputName]) {
          errors[props.inputName] = `Superhero name or id required!`;
        }
        return errors;
      }}
      onSubmit={async function requestCharacterData(values, { setFieldError }) {
        const identifier: any = values[props.inputName];
        const RELATIVE_BASE_SUPERHERO_URL: string =
          "/api/" + superheroesApiToken;
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
            ...superheroData
          } = response.data;

          if (!responseError) {
            // case for multiple results
            if (resultsFor) {
              const listOfSuperheroesOrVillians: SuperheroProps[] =
                superheroData.results.filter((superhero: SuperheroProps) =>
                  /bad|good/.test(superhero.biography.alignment)
                );
              listOfSuperheroesOrVillians.length > 1
                ? (superheroData = listOfSuperheroesOrVillians)
                : (superheroData = listOfSuperheroesOrVillians.pop());
            }
            responseError = props.addCharacterData(
              superheroData,
              props.superheroPosition
            );
          }
          if (responseError) {
            setFieldError(props.inputName, responseError);
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form as={FormikForm}>
          <Form.Group>
            <Form.Label>Superhero search</Form.Label>
            <Field as={Form.Control} type="text" name={props.inputName} />
            <ErrorMessage name={props.inputName} component="div" />
          </Form.Group>
          <Button type="submit" children={"Search"} disabled={isSubmitting} />
          {props.children}
        </Form>
      )}
    </Formik>
  );
};
