import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const titleTextElement: HTMLElement = screen.getByText(
    /Superheroes Teambuilder/i
  );
  const emailInputElement: HTMLElement = screen.getByText(/Email/);
  const passwordInputElement: HTMLElement = screen.getByText(/Password/);
  const loginButtonElement: HTMLElement = screen.getByText(/Login/);
  expect(titleTextElement).toBeInTheDocument();
  expect(emailInputElement).toBeInTheDocument();
  expect(passwordInputElement).toBeInTheDocument();
  expect(loginButtonElement).toBeInTheDocument();
});
