import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";

describe("App", () => {
  it("Renders landing page", () => {
    const { emailInput, passwordInput, submitButtonInput } = renderApp();
    expect(screen.getByText("Bienvenido a AttendanceUC")).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButtonInput).toBeInTheDocument();
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
});

const renderApp = () => {
  const utils = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText("email") as HTMLInputElement;
  const passwordInput = screen.getByLabelText("password") as HTMLInputElement;
  const submitButtonInput = screen.getByLabelText(
    "submit"
  ) as HTMLButtonElement;
  const snapshotInput = utils.container.firstChild;

  return {
    ...utils,
    snapshotInput,
    emailInput,
    passwordInput,
    submitButtonInput,
  };
};
