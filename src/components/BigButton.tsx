import React, { useState, useEffect } from "react";

// Create a type called StandardColor that is a union of the standard colors
export type StandardColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "pink"
  | "brown"
  | "black"
  | "white"
  | "gray"
  | "grey";

const STANDARD_COLORS: StandardColor[] = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "grey",
];

const standardizedColor = (color: string): string => {
  // Is color among the keys of the standardColors object?
  const colors: Array<string> = Object.keys(STANDARD_COLORS).map(
    (color) => `${color}`
  );
  if (colors.includes(color)) {
    return color;
  }
  // Is it hexadecimal?
  if (color.match(/^#[0-9A-F]{6}$/i)) {
    return color;
  }
  // Is it rgb? rgb(0, 0, 0)
  if (color.match(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/)) {
    return color;
  }
  // Is it rgba? rgba(0, 0, 0, .5)
  if (color.match(/^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, \.\d\)$/)) {
    return color;
  }
  return "blue";
};

interface BigButtonProps {
  label: string;
  color?: string;
  language?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

const translations: { [key: string]: string } = {
  en: "Click Me",
  es: "Haz clic",
  fr: "Cliquez moi",
};

const BigButton: React.FC<BigButtonProps> = ({
  label,
  color = "blue",
  language = "en",
  onClick = (): void => {},
  ...props
}) => {
  // Declare state variables
  const [clickCount, setClickCount] = useState(0);
  const [payloadPending, setPayloadPending] = useState(true);
  const maxClicks = 3;

  // Set up a click handler for the button
  const handleClick = async (): Promise<void> => {
    // Update the click count
    setClickCount((prevCount: number = 0) => prevCount + 1);
    setPayloadPending(true);
    setPayloadPending(false);
    // Call the onClick function passed as a prop
    onClick();
  };

  // Use useEffect to update buttonWidth when the click count changes
  useEffect(() => {
    // Optionally perform side effects here
  }, [clickCount]);

  // Set up a unique-ish data-testid attribute
  const dataTestId = props["data-testid"]
    ? `big-button-${props["data-testid"]}`
    : "big-button";

  return (
    <div
      data-testid="big-button-container"
      className="pb-4 pt-4 row border-bottom border-secondary"
    >
      <div className="col-4">
        <h2>
          <code>{label}</code>
        </h2>
        <button
          data-color={standardizedColor(color)}
          disabled={clickCount >= maxClicks}
          name={`button-${label}`}
          aria-label={label}
          value={label + "?"}
          {...props} // Spread the remaining props here
          className="btn btn-primary inline-block text-truncate"
          style={{
            backgroundColor: standardizedColor(color),
            maxWidth: "250px",
          }}
          onClick={handleClick}
          data-testid={dataTestId}
          data-language={language}
          data-translation={translations[language] || label}
        >
          {label}
        </button>
      </div>

      <div className="col-8">
        <textarea
          placeholder="Short story goes here..."
          disabled={payloadPending}
          data-testid={`textarea-${dataTestId}`}
          className="form-control"
          rows={6}
        ></textarea>
      </div>
    </div>
  );
};

export { BigButton };
export type { BigButtonProps };
