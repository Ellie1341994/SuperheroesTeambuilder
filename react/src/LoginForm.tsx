import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components";
import { AuthContextProps } from "./App";
export interface LoginFormInitialValues {
  authContext: AuthContextProps;
  url: string;
  email: string;
  password: string;
}
export interface AppFormProps {
  history: any;
  initialValues: LoginFormInitialValues;
}
const SuperheroesLoginButton: any = styled(Button)`
  background-image: linear-gradient(90deg, #f00, #3333ff) !important;
  border: none;
`;
const ErrorsBox: Function = styled.p`
  color: #ee5555;
  &::first-letter {
    text-transform: capitalize;
  }
`;
const handleLoginValidation: any = (values: LoginFormInitialValues) => {
  const errors: any = {};
  for (let [key, value] of Object.entries(values)) {
    if (value === "") {
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

export const LoginForm: any = (props: AppFormProps) => {
  const handleLogin: any = async (
    values: LoginFormInitialValues,
    { setSubmitting }: any
  ) => {
    const { url, email, password } = values;
    try {
      const response: AxiosResponse = await axios.post(url, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setSubmitting(false);
      values.authContext.setToken(localStorage.getItem("token"));
      props.history.push("/home");
    } catch (error) {
      if (error.response.status >= 400) {
        alert("API error");
      }
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={props.initialValues}
      validate={handleLoginValidation}
      onSubmit={handleLogin}
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
        <>
          <Form
            id="LoginForm"
            className="rounded w-50 w-75 shadow pt-3 mx-auto"
            style={{ backgroundColor: "white" }}
            onSubmit={handleSubmit}
          >
            <Form.Group as={Row} className="p-0 m-0">
              <Form.Label
                className="fw-bolder"
                column
                xs={4}
                md={2}
                children={"Email"}
              />
              <Col xs={8} md={10}>
                <Form.Control
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  value={values.email}
                />
                <Form.Text
                  className="text-muted"
                  children={" We'll never share your email with anyone else."}
                />
                <ErrorsBox children={touched.email && errors.email} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="p-0 m-0">
              <Form.Label
                className="fw-bolder"
                children={"Password"}
                column
                xs={4}
                md={2}
              />
              <Col xs={8} md={10}>
                <Form.Control
                  name="password"
                  id="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  value={values.password}
                />
                <ErrorsBox children={touched.password && errors.password} />
              </Col>
            </Form.Group>
          </Form>
          <SuperheroesLoginButton
            className="w-75 mt-2 shadow mx-auto"
            form="LoginForm"
            disabled={isSubmitting}
            type="submit"
            children={"Login"}
          />
        </>
      )}
    </Formik>
  );
};
