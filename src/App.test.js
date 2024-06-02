import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Home from "./Home";

test("should be able to type into input", () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText(/Search Pokemon.../i);
  fireEvent.change(inputElement, { target: { value: "bulbasaur" } });
  expect(inputElement.value).toBe("bulbasaur");
});

test("should render a response", async () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText(/Search Pokemon.../i);
  fireEvent.change(inputElement, { target: { value: "bulbasaur" } });
  const divElement = await screen.findByTestId("response");
  expect(divElement).toBeVisible();
});

test("should set input field empty", async () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText(/Search Pokemon.../i);
  fireEvent.change(inputElement, { target: { value: "bulbasaur" } });
  const prevButton = await screen.findByTestId("previous");
  const nextButton = await screen.findByTestId("next");
  fireEvent.click(prevButton);
  fireEvent.click(nextButton);
  expect(inputElement).toHaveTextContent("");
});
