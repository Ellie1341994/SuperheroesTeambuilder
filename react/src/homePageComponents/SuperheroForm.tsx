import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export const SuperheroForm: any = (props: any) => {
  console.log("SuperheroForm props", props);
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
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        //
        console.log(values);
        let errorResponse: any = await props.getSuperheroData(
          values[props.inputName],
          props.superheroPosition
        );
        if (errorResponse) {
          setFieldError(props.inputName, errorResponse);
        }
        // formiks automatically sets submitting to false upon async function resolution
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
