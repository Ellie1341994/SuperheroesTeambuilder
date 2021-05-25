import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import styled from "styled-components";
import { SuperheroProps } from "./homePageComponents/SuperheroProps";

interface AppFormProps {
  type: "login" | "superheroes";
  history?: any;
  initialValues: undefined;
  superheroCardId: string;
}
const StyledP: Function = styled.p`
  color: #ee5555;
  padding: 1%;
  &::first-letter {
    text-transform: capitalize;
  }
`;
const handleLogin: any = async (values: any, { setSubmitting }: any) => {
  const { url, email, password } = values;
  try {
    const response: any = await axios.post(url, { email, password });
    localStorage.setItem("token", response.data.token);
    setSubmitting(false);
    values.authContext.setToken(localStorage.getItem("token"));
    values.history.push("/home");
  } catch (error) {
    if (error.response.status >= 400) {
      alert("API error");
    }
    console.log(error);
  }
};
const handleSuperheroeAddtion: Function = async (
  values: any,
  { setSubmitting }: any
) => {
  try {
    // ask for superhero data
    const superheroicPackage: any = await values.requestSuperhero(
      values.identifier
    );
    setSubmitting(false);
    console.log(superheroicPackage);
    const wasDataSearched: boolean = Array.isArray(superheroicPackage.data);
    // display multiple results
    if (wasDataSearched && superheroicPackage.data.length > 1) {
      const superheroesName: string[] = [];
      superheroicPackage.data.forEach((superhero: SuperheroProps) => {
        superheroesName.push(
          superhero.biography["full-name"] + `(${superhero.name})`
        );
      });
      //setChoices(superheroesName);
      //console.log(choices);
    }
    // add single results
    const superhero: SuperheroProps[] = wasDataSearched
      ? superheroicPackage.data.pop()
      : superheroicPackage.data;
    superheroicPackage.addSuperhero(superhero, values.superheroCardPosition);
  } catch (error) {
    console.log(error);
  }
};
const handleValidation: any = (values: any) => {
  const errors: any = {};
  const { email, password, identifier } = values;
  const fields: any = identifier ? { identifier } : { email, password };
  for (let [key, value] of Object.entries(fields)) {
    if (!value) {
      errors[key] = `${key} is required!`;
    }
  }
  if (
    values.email?.length > 0 &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const formStyles: any = {
  padding: "1%",
  border: "solid 1px #5559",
  borderTop: "none",
  width: window.innerWidth < 600 ? "85%" : "50%",
  height: "50vh",
  borderRadius: "3px 3px",
  alignSelf: "center",
  boxShadow: "0 3px 5px #333",
};
export const AppForm: any = (props: AppFormProps) => {
  const initialValues: any = props.initialValues;
  return (
    <Formik
      initialValues={initialValues}
      validate={handleValidation}
      onSubmit={props.type === "login" ? handleLogin : handleSuperheroeAddtion}
      id={"Form" + props.superheroCardId}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form style={formStyles} onSubmit={handleSubmit}>
          {props.type === "superheroes" ? (
            <Form.Group>
              <Form.Label className="capitalize">Supeheroes search</Form.Label>
              <Form.Control
                name="identifier"
                id="identifier"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                placeholder="Superhero name"
                value={values.identifier}
              />
              <StyledP>{touched.identifier && errors.identifier}</StyledP>
            </Form.Group>
          ) : (
            <>
              <Form.Group>
                <Form.Label className="capitalize">Email</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                />
                <StyledP>{touched.email && errors.email}</StyledP>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label onChange={handleChange}>Password</Form.Label>
                <Form.Control
                  name="password"
                  id="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  value={values.password}
                />
                <StyledP>{touched.password && errors.password}</StyledP>
              </Form.Group>
              <Button
                variant="primary"
                disabled={isSubmitting}
                style={{ width: "100%" }}
                type="submit"
              >
                Login
              </Button>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};
