import { render, screen, fireEvent } from "@testing-library/react";
import { BigButton, BigButtonProps } from "./BigButton";
import { displayAlert, shuffle, getCurrentDay, throwError } from "../utils";

/**
 * Rendered markup for the BigButton component:
 *
 * <button data-color="blue" name="button-Test Button" aria-label="Test Button" value="Test Button" class="btn btn-primary inline-block text-truncate" data-testid="big-button" data-language="en" data-translation="Click Me" style="background-color: blue; max-width: 250px;">Test Button</button>
 */

describe.skip("BigButton component utility methods", () => {
  test("displayAlert calls an alert", () => {
    // We'll mock the window.alert function
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    // Call the displayAlert function
    displayAlert();

    // TODO: Figure out how to determine if the alert appeared. Mock the window.alert function
  });

  test("shuffle returns a shuffled array", () => {
    const testArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(testArray);

    // TODO: Assert that the shuffled array is different from the original array
  });

  test("getCurrentDay returns the current day", () => {
    const currentDay = getCurrentDay();
    // TODO: Assert that the currentDay is something like... "Monday" or "Tuesday"
  });

  test.skip("throwError throws an error", () => {
    // Call the throwError function
    throwError();

    // TODO: Figure out how to determine if the error was thrown without crashing the test
  });
});

describe.skip("BigButton default rendering", () => {
  /**
   * TODO: Remove unnecessary assertions. Also, add assertions to validate the expected defaults: color, language, and onClick.
   */
  test("renders BigButton component and validates visibility", () => {
    // Render the component in the DOM
    render(<BigButton label="Test Button" color="not_blue" />);
    // Get the button element
    const button = screen.getByLabelText("Test Button");

    // TODO: Remove unnecessary and/or brittle assertions
    expect(button.className).toContain("btn");
    expect(button).toBeTruthy();
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
  });

  test("renders BigButton component and validates default color is blue", () => {
    // Render the component in the DOM
    render(<BigButton label="Test Button" color="not_blue" />);
    // Get the button element
    const button = screen.getByLabelText("Test Button");

    // TODO: Assert that the default style "background-color" is blue
  });

  test("renders BigButton component and validates default language is 'en'", () => {
    // Render the component in the DOM
    render(<BigButton label="Test Button" color="not_blue" />);
    // Get the button element
    const button = screen.getByLabelText("Test Button");

    // TODO: Assert that the default data-language attribute is "en"
  });

  test("clicks BigButton 3 times and validates it is disabled", () => {
    // Render the component in the DOM
    render(<BigButton label="Test Button" color="not_blue" />);
    // Get the button element
    const button = screen.getByLabelText("Test Button");

    // TODO: Click the button 3 times and assert that it's disabled after the 3rd click
  });

  test("ensures that BigButton disallows xss injection via label prop", () => {
    // Create button props with an XSS attack
    const xssProps: BigButtonProps = {
      label: `<a href="#" onclick="alert('North Korea says hello')">Click Me</a>`,
    };
    // Render the component in the DOM
    render(<BigButton {...xssProps} />);
    // Get the button element
    const button = screen.getByRole("button");

    // TODO: Validate that no xss injection occurred
  });
});

describe.skip("BigButton custom click handlers", () => {
  /**
   * TODO: Ensure that the onClick handler is called when the button is clicked.
   */
  test("validates custom click Handler on BigButton", () => {
    // Let's create a custom function to pass in as a click handler
    const customClickHandler = (): void => {};
    // Render the component in the DOM
    render(<BigButton label="Test Button" onClick={customClickHandler} />);
    // Get the button element
    const button = screen.getByRole("button");
    // Click the button
    fireEvent.click(button);

    // TODO: Assert the customClickHandler was called
  });
});

describe.skip("BigButton styling", () => {
  /**
   * TODO: Ensure the button is no wider than 300px even when the label is long.
   */
  test("renders BigButton with extremely long label", () => {
    const buttonProps: BigButtonProps = {
      label:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt tortor ac rutrum efficitur. Duis a condimentum ex. Aenean ac gravida erat. Nulla tristique, est eu hendrerit luctus, diam urna hendrerit ante, id maximus elit urna sit amet eros. Suspendisse vitae purus leo. Donec id tempor ligula, sed vestibulum tortor. Etiam sapien libero, rutrum eget tincidunt eu, malesuada venenatis sapien. Proin quis ipsum vitae metus egestas placerat. Pellentesque in turpis euismod, finibus dolor vitae, placerat nibh. Pellentesque at aliquet turpis, non varius nulla.",
      color: "red",
      language: "es",
    };

    // Render the component in the DOM
    render(<BigButton {...buttonProps} />);
    // Get the button element
    const button = screen.getByRole("button");

    // TODO: Assert that the button's max-width is 300px
  });
});

describe.skip("BigButton xss injection", () => {
  /**
   * TODO: Ensure that injecting markup into the button's label property does not result in xss injection.
   */
  test("ensures that BigButton disallows xss injection", () => {
    // We'll mock the window.alert function
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Create button props with an XSS attack
    const xssProps: BigButtonProps = {
      label: `<a href="#" onclick="alert('North Korea says hello')">Click Me</a>`,
    };
    // Render the component in the DOM
    render(<BigButton {...xssProps} />);
    // Get the button element
    const button = screen.getByRole("button");

    // Get a reference to the anchor tag inside the button
    const xssLink = button.querySelector("a")!;

    // Click the button right on top of the word Click Me
    fireEvent.click(xssLink);

    // Assert the alert spy was called
    expect(alertSpy).toHaveBeenCalledTimes(1);
    // Assert that the alert contains the string matching /hello/i
    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringMatching(/North Korea says hello/i)
    );
    // Restore the original alert function
    alertSpy.mockRestore();

    // console log the button's html to assist with assertions
    console.log(button.outerHTML);

    // Assert: component has not interpreted the HTML in its label
    expect(false).toBe(true); // comment this out
  });
});
