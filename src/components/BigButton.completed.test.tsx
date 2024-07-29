import { render, screen, fireEvent } from "@testing-library/react";
import { BigButton, BigButtonProps } from "./BigButton";
import { displayAlert, shuffle, getCurrentDay, throwError } from "../utils";

/**
 * Default props for the BigButton component
 */
const defaultProps: BigButtonProps = {
  label: "Test Button",
};

/**
 * returns a rendered BigButton component with passed-in props. If no props are passed, defaultProps are used.
 * @param props { BigButtonProps } The props to pass to the BigButton component. If none are specified, defaultProps are used.
 * @returns { HTMLElement } The BigButton component
 */
const getDefaultButton = (props: BigButtonProps = defaultProps) => {
  // render the BigButton component and return just the button
  render(<BigButton {...props} />);
  return screen.getByRole("button");
};

describe("BigButton component utility methods", () => {
  beforeEach(jest.restoreAllMocks);
  test("displayAlert calls an alert", () => {
    // We'll mock the window.alert function
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    // Call the function that calls window.alert
    displayAlert();
    // Assert the alert function was called
    expect(alertSpy).toHaveBeenCalledTimes(1);
    // Assert that the alert contains the string matching /hello/i
    expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/hello/i));
    // Restore the original alert function
    alertSpy.mockRestore();
  });

  test("shuffle returns an array that is different than the input array", () => {
    // Create a sample array
    const sampleArray = ["Larry", "Moe", "Curly"];
    // Iterate 10 times
    Array.from({ length: 10 }).forEach(() => {
      // Shuffle the array, then assert the shuffled array is not the same as the sample array
      const shuffledArray = shuffle(sampleArray);
      expect(shuffledArray).not.toEqual(sampleArray);
    });
  });

  test("getCurrentDay returns the current day", () => {
    const expectedValues = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = getCurrentDay();
    // Expect currentDay to be one of the values in expectedValues
    expect(expectedValues).toContain(currentDay);
  });

  test("throwError throws an error", () => {
    // Call throwError and expect it to throw an error
    expect(() => throwError()).toThrow();
  });
});

describe("BigButton default rendering and behavior", () => {
  beforeEach(jest.restoreAllMocks);
  /**
   * TODO: Remove unnecessary assertions. Also, add assertions to validate the expected defaults: color, language, and onClick.
   */
  test("renders BigButton component and validates visibility", () => {
    // Get the button element
    const button = getDefaultButton();

    // TODO: Remove unnecessary and/or brittle assertions
    // CSS-based assertions are known to be brittle, and should be avoided like the plague
    // expect(button.className).toContain("btn");

    // Visibility check makes these 2 checks completely redundant
    // expect(button).toBeTruthy();
    // expect(button).toBeInTheDocument();

    // A visibility check not only confirms visibility, but presence in the DOM (and truthiness)
    expect(button).toBeVisible();
  });

  test("renders BigButton component and validates default color is blue", () => {
    // Get the button element
    const button = getDefaultButton();

    // In general: NEVER use window.getComputedStyle(). It's brittle, somewhat costly (in terms of performance), ant most importantly: hard-to-follow and maintain. If you need more guarantees of pixel-perfection, run a visual regression test instead. Be straightforward like this...
    expect(button).toHaveStyle({ backgroundColor: "blue" });
  });

  test("renders BigButton component and validates default language is 'en'", () => {
    // Get the button element
    const button = getDefaultButton();

    // Assert that the language attribute is set to English — no need to first assert that the attribute exists
    expect(button.getAttribute("data-language")).toBe("en");
  });

  test("clicks BigButton 3 times and validates it is disabled", () => {
    // Get the button element
    const button = getDefaultButton();
    // Click the button 3 times and assert button is disabled
    Array.from({ length: 3 }).forEach(() => fireEvent.click(button));
    expect(button).toBeDisabled();
  });
});

describe("BigButton custom click handlers", () => {
  beforeEach(jest.restoreAllMocks);
  /**
   * TODO: Ensure that the onClick handler is called when the button is clicked.
   */
  test("validates custom click Handler on BigButton", () => {
    // Mock function that manipulats a property we can assert on
    let genericProperty: number = 0;
    const mockHandler = jest.fn(() => genericProperty++);
    // Render the component in the DOM
    render(<BigButton label="Test Button" onClick={mockHandler} />);
    // Get the button element
    const button = screen.getByRole("button");

    // Click the button and assert the mock function was called
    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    expect(genericProperty).toBe(1);
  });

  /**
   * TODO: Ensure the button is no wider than 300px even when the label is long.
   */
  test("renders BigButton with extremely long label", () => {
    const buttonProps: BigButtonProps = {
      label:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt tortor ac rutrum efficitur. Duis a condimentum ex. Aenean ac gravida erat. Nulla tristique, est eu hendrerit luctus, diam urna hendrerit ante, id maximus elit urna sit amet eros. Suspendisse vitae purus leo. Donec id tempor ligula, sed vestibulum tortor. Etiam sapien libero, rutrum eget tincidunt eu, malesuada venenatis sapien. Proin quis ipsum vitae metus egestas placerat. Pellentesque in turpis euismod, finibus dolor vitae, placerat nibh. Pellentesque at aliquet turpis, non varius nulla. bear",
    };
    // Get the button element
    const button = getDefaultButton(buttonProps);

    // This is the best you can do with React Testing Library
    expect(button).toHaveStyle({ maxWidth: "250px" });

    // TLDR... For width, height, and bounding boxes, React Tesing Library is not the best tool for the job. Use a visual regression test instead. None of the following calculations will give you what a human user would see.
    // const rect = JSON.stringify(button.getBoundingClientRect());
    // const styles = window.getComputedStyle(button);
  });
});

describe("BigButton styling", () => {
  beforeEach(jest.restoreAllMocks);
  /**
   * TODO: Ensure that the button will replace an illegal rgb value with the string "blue"
   */
  test("sets BigButton color to bad value 'rgbb(0, 0, 0)' but gets a blue button rendered", () => {
    // Set up your props
    const colorProps: BigButtonProps = {
      label: "Test Button",
      color: "rgbb(0, 0, 0)",
    };
    // Render the component in the DOM and get the button
    render(<BigButton {...colorProps} />);
    const button = screen.getByRole("button");
    // Assert: button has color set to "blue"
    expect(button).toHaveStyle({ backgroundColor: "blue" });
  });

  test("sets BigButton color to good rgba value 'rgba(0, 0, 0, .5)'", () => {
    // Set up your props
    const colorProps: BigButtonProps = {
      label: "Test Button",
      color: "rgba(0, 0, 0, .5)",
    };
    // Render the component in the DOM and get the button
    render(<BigButton {...colorProps} />);
    const button = screen.getByRole("button");
    // Assert: button has color set to "blue"
    expect(button).toHaveStyle({ backgroundColor: colorProps.color });
  });

  test("sets BigButton color to good hex value '#0066FF'", () => {
    // Set up your props
    const colorProps: BigButtonProps = {
      label: "Test Button",
      color: "#0066FF",
    };
    // Render the component in the DOM and get the button
    render(<BigButton {...colorProps} />);
    const button = screen.getByRole("button");
    // Assert: button has color set to "blue"
    expect(button).toHaveStyle({ backgroundColor: colorProps.color });
  });

  test("sets BigButton color to empty string and gets blue", () => {
    // Set up your props
    const colorProps: BigButtonProps = {
      label: "Test Button",
      color: "",
    };
    // Render the component in the DOM and get the button
    render(<BigButton {...colorProps} />);
    const button = screen.getByRole("button");
    // Assert: button has color set to "blue"
    expect(button).toHaveStyle({ backgroundColor: "blue" });
  });
});

describe("BigButton xss injection", () => {
  /**
   * TODO: Ensure that injecting markup into the button's label property does not result in xss injection.
   */
  test("ensures that BigButton disallows xss injection via label prop", () => {
    // We'll mock the window.alert function
    const xssSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Create button props with an XSS attack
    const xssProps: BigButtonProps = {
      label: `<a href="#" onclick="alert('North Korea says hello')">Click Me</a>`,
    };

    // First, create a div element and set its innerHTML to the XSS attack
    // Render a div element into the document
    const newElemement = document.createElement("div");
    newElemement.setAttribute("data-testid", "xss-attack");
    newElemement.innerHTML = xssProps.label;
    // Append the div to the document body
    document.body.appendChild(newElemement);
    // Locate, then click on the xss link
    const xssLink = screen.getByTestId("xss-attack").querySelector("a")!;
    fireEvent.click(xssLink);
    // Assert the alert spy was called
    expect(xssSpy).toHaveBeenCalledTimes(1);
    // Assert that the alert contains the string matching /hello/i
    expect(xssSpy).toHaveBeenCalledWith(
      expect.stringMatching(/North Korea says hello/i)
    );
    // Reset the spy
    xssSpy.mockReset();

    // Render the component in the DOM
    render(<BigButton {...xssProps} />);
    // Get the button element
    const button = screen.getByRole("button");
    // Assert the button's label is correctly set && contains no HTML
    expect(button).toHaveTextContent(xssProps.label);
    expect(button.querySelector("a")).toBeNull();
    // Click the button and assert that no alert comes up
    fireEvent.click(button);
    expect(xssSpy).not.toHaveBeenCalled();
  });
});