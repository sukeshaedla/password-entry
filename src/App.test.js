import { fireEvent, render, screen, act } from "@testing-library/react";
import App from "./App";

test("renders form elements", async () => {
  render(<App />);
  const passwordInput = screen.getByTestId("password");
  const passwordInputRepeat = screen.getByTestId("password_repeat");
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInputRepeat).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  await act(() => {
    fireEvent.click(submitButton);
  });

  expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
});

test("renders error message based on input", async () => {
  render(<App />);
  const passwordInput = screen.getByTestId("password");
  const passwordInputRepeat = screen.getByTestId("password_repeat");
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInputRepeat).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  await act(() => {
    fireEvent.click(submitButton);
  });

  expect(screen.getByText(/Password is required/i)).toBeInTheDocument();

  await act(() => {
    fireEvent.change(passwordInput, { target: { value: "12345" } });
    fireEvent.click(submitButton);
  });

  expect(
    screen.getByText(/Password should be at-least 6 characters/i)
  ).toBeInTheDocument();

  await act(() => {
    fireEvent.change(passwordInput, { target: { value: "1234567asb" } });
    fireEvent.click(submitButton);
  });

  expect(
    screen.getByText(
      /Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol/i
    )
  ).toBeInTheDocument();
});

test("passwords match", async () => {
  render(<App />);
  const passwordInput = screen.getByTestId("password");
  const passwordInputRepeat = screen.getByTestId("password_repeat");
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInputRepeat).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  await act(() => {
    fireEvent.click(submitButton);
  });

  expect(screen.getByText(/Password is required/i)).toBeInTheDocument();

  await act(() => {
    fireEvent.change(passwordInput, { target: { value: "1@W1aes1" } });
    fireEvent.change(passwordInputRepeat, { target: { value: "abscbssss" } });
    fireEvent.click(submitButton);
  });

  expect(screen.getByText(/The passwords do not match/i)).toBeInTheDocument();
});
