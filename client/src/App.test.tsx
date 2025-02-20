import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  test("checks if the footer exists", () => {
    render(<App />);
    const footerText = screen.getByText(/copyright 2025/i);
    expect(footerText).toBeInTheDocument();
  });

  test("checks if the buttons home and about exist", () => {
    render(<App />);
    const homeButton = screen.getByText(/home/i);
    expect(homeButton).toBeInTheDocument();

    const aboutButton = screen.getByText(/about/i);
    expect(aboutButton).toBeInTheDocument();
  });

  test("checks if the navigation bar exists and that it works", () => {
    render(<App />);
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();

    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toBeInTheDocument();

    setTimeout(() => {
      userEvent.click(aboutLink);
      expect(window.location.pathname).toBe("/about");
    }, 500);
  });

  test("checks if login page has a link that redirects to register page and that it works", () => {
    render(<App />);
    setTimeout(() => {
      const link = screen.getByText(/Register new user/i);
      userEvent.click(link);
      expect(window.location.pathname).toBe("/register");
    }, 1000);
  });

  test("checks if registration page works and redirects to login page", () => {
    render(<App />);
    setTimeout(() => {
      const link = screen.getByText(/Register new user/i);
      userEvent.click(link);
      expect(window.location.pathname).toBe("/register");
      const usernameField = screen.getByLabelText(/username/i);
      const passwordField = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole("button", { name: /Register/i });
      userEvent.type(usernameField, "alpha");
      userEvent.type(passwordField, "123");
      userEvent.click(submitButton);
      expect(window.location.pathname).toBe("/login");
    }, 1000);
  });
});
