import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import styled from "styled-components";
//import { SuperheroProps } from "./homePageComponents/SuperheroProps";

interface AppFormProps {
  history: any;
  initialValues: any;
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
const handleLoginValidation: any = (values: any) => {
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
        <Form style={formStyles} onSubmit={handleSubmit}>
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
            <Form.Label>Password</Form.Label>
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
      )}
    </Formik>
  );
};
