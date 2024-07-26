import { render, screen, fireEvent } from "@testing-library/react";
import { BigButton } from "./BigButton";
import type { BigButtonProps } from "./BigButton";
import { displayAlert, shuffle, getCurrentDay, throwError } from "../utils";
import * as axe from "axe-core";

// Configure the accessibility checker with custom rules
const customRules: axe.Spec = {
  disableOtherRules: false,
  checks: [
    {
      id: "has-test-selector",
      evaluate: (node) => {
        return node.getAttribute("data-testid") !== null &&
          node.getAttribute("data-testid")!.length > 3
          ? true
          : false;
      },
      metadata: {
        impact: "critical",
        messages: {
          pass: "Element has a [data-testid] attribute",
          fail: "Element has no name attribute",
        },
      },
    },
  ],
  rules: [
    {
      id: "has-test-selector",
      selector: "button",
      all: ["has-test-selector"],
      tags: ["onebrief"],
    },
  ],
};

axe.configure(customRules);

/**
 * Default props for the BigButton component
 */
const defaultProps: BigButtonProps = {
  label: "Click Me",
  color: "#007bff",
  language: "en",
  onClick: () => {},
};

/**
 * returns a rendered BigButton component with passed-in props. If no props are passed, defaultProps are used.
 * @param props { BigButtonProps } The props to pass to the BigButton component. If none are specified, defaultProps are used.
 * @returns { HTMLElement } The BigButton component
 */
const getDefaultButton = (props: BigButtonProps = defaultProps) => {
  // Stub a function and render the BigButton component
  render(<BigButton {...props} />);
  const testID = props["data-testid"]
    ? `big-button-${props["data-testid"]}`
    : "big-button";
  return screen.getByTestId(testID);
};

describe("BigButton component rendering", () => {
  test("ensures BigButton has no glaring accessibility issues", async () => {
    const component = getDefaultButton();
    const results = await axe.run(component);
    expect(results.violations.length).toBe(0); // Expecting violations because
  });

  test("renders BigButton component with the correct label and color", () => {
    // Get a component with default props
    const component = getDefaultButton();

    // Make some basic assertions on the button's properties
    expect(component).toBeInTheDocument();
    // Expect it to be visible
    expect(component).toBeVisible();
    // Assert that it absolutely has a data-testid attribute
    expect(component).toHaveAttribute("data-testid");
    // Assert on text content on bgcolor
    expect(component).toHaveTextContent("Click Me");
    expect(component).toHaveStyle("background-color: #007bff");
  });

  test("ensures the onClick function is called when the button is clicked", () => {
    // Create a copy of defaultProps with its own onClick function
    const myProps = { ...defaultProps };
    const handleClick = jest.fn();
    myProps.onClick = handleClick;

    // Get a component with custom props
    const component = getDefaultButton(myProps);

    // Click on the button
    fireEvent.click(component);
    // Assert that the function passed to onClick was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders BigButton with a custom handler that modifies the dom", () => {
    // Create a copy of defaultProps with its own onClick function
    const myProps = { ...defaultProps };
    const handleClick = () => {
      // Get a timestamp
      const ts = new Date().getTime();
      const div = document.createElement("div");
      div.id = `injected-div-${ts}`;
      // Set the html of the div
      div.innerHTML = `This div was injected at ${ts}`;
      document.body.appendChild(div);
    };
    myProps.onClick = handleClick;

    // Get a component with custom props
    const component = getDefaultButton(myProps);

    // Get the count of all divs in the document
    let divCount = document.querySelectorAll(`div[id^="injected-div"]`).length;

    let clickCount = 5;
    for (let i = 0; i < clickCount; i++) {
      // Click on the button
      fireEvent.click(component);
      const expectedDivCount = divCount + i + 1;
      // Assert that the div was added to the document
      expect(document.querySelectorAll(`div[id^="injected-div"]`).length).toBe(
        expectedDivCount
      );
    }
  });
});

describe("BigButton component methods", () => {
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
    for (let i = 0; i < 10; i++) {
      const shuffledArray = shuffle(sampleArray);
      // Assert that shuffledArray is not the same as sampleArray
      expect(shuffledArray).not.toEqual(sampleArray);
    }
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
