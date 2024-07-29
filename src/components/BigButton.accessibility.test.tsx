import { render, screen } from "@testing-library/react";
import { BigButton } from "./BigButton";
import type { BigButtonProps } from "./BigButton";
import * as axe from "axe-core";

// Configure the accessibility checker with custom rules
const customRules: axe.Spec = {
  disableOtherRules: false,
  checks: [
    {
      id: "has-test-selector",
      evaluate: (node: Element) => {
        return node.getAttribute("data-testid") !== null &&
          node.getAttribute("data-testid")!.length > 3
          ? true
          : false;
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
  return screen.getByRole("button");
};

describe("BigButton component rendering", () => {
  test("ensures BigButton has no glaring accessibility issues", async () => {
    const component = getDefaultButton();
    const results = await axe.run(component);
    expect(results.violations.length).toBe(0); // Expecting violations because
  });
});
