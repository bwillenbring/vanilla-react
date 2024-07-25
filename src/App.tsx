import React from 'react';
import { BigButton } from "./components/BigButton";
import { getCurrentDay, shuffle, displayAlert, throwError } from "./utils";

const handleClick1 = (): void => {
  const testArray = ["Larry", "Curly", "Moe", "Shemp"];
  const retValue = JSON.stringify(shuffle(testArray));
  alert(retValue);
};
const handleClick2 = (): void => {
  alert(getCurrentDay());
};

function App() {
  return (
    <div className="container">
      <div data-testid="testcase-shuffler">
        <h1>
          <code>shuffle()</code>
        </h1>
        <BigButton
          label="shuffle()"
          data-testid="shuffler"
          color="green"
          language="en"
          onClick={handleClick1}
        />
      </div>

      <div data-testid="testcase-get-current-day">
        <h1>
          <code>getCurrentDay()</code>
        </h1>
        <BigButton
          label="getCurrentDay()"
          data-testid="get-current-day"
          color="blue"
          language="fr"
          onClick={handleClick2}
        />
      </div>

      <div data-testid="testcase-display-alert">
        <h1>
          <code>displayAlert()</code>
        </h1>
        <BigButton
          label="displayAlert()"
          data-testid="display-alert"
          color="#757575"
          language="fr"
          onClick={displayAlert}
        />
      </div>

      <div data-testid="testcase-throw-error">
        <h1>
          <code>throwError()</code>
        </h1>
        <BigButton
          label="throwError()"
          data-testid="throw-error"
          color="#CCCCCC"
          language="en"
          onClick={throwError}
        />
      </div>
    </div>
  );
}

export { App };
