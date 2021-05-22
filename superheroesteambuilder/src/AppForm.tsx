import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import styled from "styled-components";
import { authenticationContext } from "./App";
import { useContext } from "react";

interface LoginFieldType {
  email: string;
  password: string;
}
interface AppFormProps {
  URL: string;
  type: "auth" | "heroes";
  history: any;
}
type LoginFields = "password" | "email";
const StyledP: Function = styled.p`
  color: #ee5555;
  padding: 1%;
  &::first-letter {
    text-transform: capitalize;
  }
`;
export const AppForm: any = (props: AppFormProps) => {
  const context: any = useContext(authenticationContext);
  return (
    <Formik
      initialValues={{ email: "", password: "", url: props.URL }}
      validate={(values: LoginFieldType) => {
        const errors: LoginFieldType = {} as any;
        for (let [key, value] of Object.entries(values)) {
          if (!value) {
            errors[key as LoginFields] = `${key} is required!`;
          }
        }
        if (
          props.type === "auth" &&
          values.email &&
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const { url, ...DATA } = values;
        try {
          // @ts-ignore
          const response: any = await axios.post(url, DATA);
          localStorage.setItem("token", response.data.token);
          setSubmitting(false);
          context.setToken(localStorage.getItem("token"));
          props.history.push("/home");
        } catch (error) {
          if (error.response.status !== 200) {
            alert("Login request server error");
          }
          console.log(error);
        }
      }}
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
            style={{
              padding: "1%",
              border: "solid 1px #5559",
              borderTop: "none",
              width: window.innerWidth < 600 ? "85%" : "50%",
              height: "50vh",
              borderRadius: "3px 3px",
              alignSelf: "center",
              boxShadow: "0 3px 5px #333",
            }}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label>Email address</Form.Label>
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
          </Form>
        </>
      )}
    </Formik>
  );
};
