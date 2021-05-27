import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const SuperheroForm: any = (props: any) => {
  console.log("SuperheroForm props", props);
  return (
    <Formik
      initialValues={props.initialValues}
      validate={(values: any) => {
        console.log("validating");
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
        // I've read that formiks automatically sets submitting to false upon async function resolution
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
/* Update after a lot of struggling not making a common form work I discovered I was 
 * disabling somehow allevents within the SuperheroBox component when I had set up SuperheroBox child element onClick attribute to undefined
export const SuperheroFormB: any = (props: any) => {
  let state: any = {};
  state[props.inputName] = "";
  const [fields, setFields] = React.useState(state);
  const [errors, setErrors] = React.useState([]);
  console.log("SuperheroForm props", props);
  const handleSubmit: any = (event: any) => {
    event.preventDefault();
    console.log("submit works", props);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Superhero search</Form.Label>
        <Form.Control
          name={props.inputName}
          id={props.inputName}
          type="text"
          onChange={(event: any) => {
            event.preventDefault();
            let newState: any = {};
            newState[props.inputName] = event.target.value;
            setFields(newState);
            console.log("newState", newState);
          }}
          placeholder="Enter hero name or id"
          value={fields[props.inputName]}
        />
        <div>{errors}</div>
      </Form.Group>
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
};

/* Can't make formik work with this logic flow can't figure out why. I know it is expicitly 
 * asked to validate data thorough formik but two days trying is enough for me.
export const SuperheroForm: any = (props: any) => {
  console.log("SuperheroForm props", props);
  return (
    <Formik
      initialValues={props.initialValues}
      validate={(values: any) => {
        console.log("validating");
        const errors: any = {};
        if (!values[props.inputName]) {
          errors[props.inputName] = `${props.inputName} required`;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("SuperheroForm props", props);
        console.log("SuperheroForm values", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <label htmlFor={props.inputName}>Search hero</label>
          <Field as={Form.Control} type="text" name={props.inputName} />
          <ErrorMessage name={props.inputName} component="div" />
          <Button
            type="submit"
            variant="link"
            children={"Submit"}
            disabled={isSubmitting}
          />
        </FormikForm>
      )}
    </Formik>
  );
};
 * */
