import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";

describe("App", () => {
  it("Renders landing page", () => {
    const { email, password, submitButton } = renderApp();
    expect(screen.getByText("Bienvenido a AttendanceUC")).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
  it("Renders 404 error if invalid path", () => {
    render(
      <MemoryRouter initialEntries={["/this-route-does-not-exist"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
      })
    ).toHaveTextContent("Error 404");
  });
  it("Renders home page if logged in", () => {
    const { email, password, submitButton } = renderApp();
    act(() => {
      email.value = "ejemplo@uc.cl";
      password.value = "12345678";
      submitButton.click();
    });
    waitFor(() => {
      expect(screen.getByText("Cerrar Sesión")).toBeInTheDocument();
    });
  });
});

const renderApp = () => {
  const utils = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const email = screen.getByLabelText("email") as HTMLInputElement;
  const password = screen.getByLabelText("password") as HTMLInputElement;
  const submitButton = screen.getByLabelText("submit") as HTMLButtonElement;
  const snapshot = utils.container.firstChild;

  return {
    ...utils,
    snapshot,
    email,
    password,
    submitButton,
  };
};
