import { render, screen, fireEvent } from "@testing-library/react";
import {App} from "./App";

describe("App component rendering", () => {
  test("renders App", () => {
    // Render App and make assertions
    render(<App />);
    // Assert there are four buttons in the page 
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);

    // Get the languages of all the buttons
    const languages = buttons.map(button => button.getAttribute('data-language'));
    // Assert that at least 1 button is set to english, and 1 to french
    expect(languages).toContain('en');
    expect(languages).toContain('fr');
  });

});
