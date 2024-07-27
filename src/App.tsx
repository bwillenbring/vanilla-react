import React from 'react';
import { BigButton } from "./components/BigButton";
import { getCurrentDay, shuffle, displayAlert, throwError } from "./utils";

const handleClick1 = (): void => {
  const testArray = ["Larry", "Moe", "Curly"];
  const shuffledArray = shuffle(testArray);
  const retValue = `The 3 stooges were: ${shuffledArray.join(", ")}`;
  // Set the textarea value to the shuffled array
  const textArea = document.querySelector(
    "[data-testid='textarea-big-button-shuffler']"
  );
  if (textArea) {
    textArea.textContent = retValue;
  }

  // Get the button element and set its min-width to 400px
  const btn = document.querySelector("[data-testid='big-button-shuffler']");
  if (btn) {
    btn.setAttribute("style", "min-width: 400px;");
  }
};
const handleClick2 = (): void => {
  alert(getCurrentDay());
};

function App() {
  const multilineLabel = `This
  is a multi-line
  piece of text.`;
  return (
    <div className="container">
      <div data-testid="testcase-shuffler">
        <BigButton
          label={multilineLabel}
          color="rgb(0, 0, 0)"
          data-testid="shuffler"
          language="en"
          onClick={handleClick1}
        />
      </div>

      <div data-testid="testcase-get-current-day">
        <BigButton
          label="getCurrentDay()"
          data-testid="get-current-day"
          color="blue"
          language="fr"
          onClick={handleClick2}
        />
      </div>

      <div data-testid="testcase-display-alert">
        <BigButton
          label="displayAlert()"
          data-testid="display-alert"
          color="#757575"
          language="fr"
          onClick={displayAlert}
        />
      </div>

      <div data-testid="testcase-throw-error">
        <BigButton
          label="throwError()"
          data-testid="throw-error"
          color="#CCCCCC"
          language="en"
          onClick={throwError}
        />
      </div>

      <div data-testid="testcase-console-log">
        <BigButton
          label="console.log()"
          data-testid="console-log"
          color="#999999"
          language="es"
          onClick={() =>
            console.log("Katie poured coffee on father's grey suit.")
          }
        />
      </div>
    </div>
  );
}

export { App };
