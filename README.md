# Install
```
yarn 
```

## Run Unit tests with `Jest`
Does not require a server to be running.
```
yarn test:unit
```

**Expected output**
```
 PASS  src/App.test.tsx
 PASS  src/components/BigButton.test.tsx

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.56 s, estimated 2 s
Ran all test suites.
✨  Done in 2.02s.
```

**Note:** Add the `--verbose` option to get more output.
```
yarn test:unit --verbose
```

**Expected output**
```
 PASS  src/App.test.tsx
  App component rendering
    ✓ renders App (48 ms)

 PASS  src/components/BigButton.test.tsx
  BigButton component rendering
    ✓ ensures BigButton has no glaring accessibility issues (59 ms)
    ✓ renders BigButton component with the correct label and color (6 ms)
    ✓ ensures the onClick function is called when the button is clicked (4 ms)
    ✓ renders BigButton with a custom handler that modifies the dom (5 ms)
  BigButton component methods
    ✓ displayAlert calls an alert (1 ms)
    ✓ shuffle returns an array that is different than the input array (1 ms)
    ✓ getCurrentDay returns the current day (9 ms)
    ✓ throwError throws an error (1 ms)

Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        1.295 s, estimated 2 s
Ran all test suites.
✨  Done in 1.71s.
```


## Run e2e tests with `Playwright`
Requires a server to be running on port `9000`, which happens automatically when you do this...
```
yarn test:e2e
```
At the conclusion of the run...
- The server will do a graceful shutdown (no more web site on port 9000)
- You can: `yarn playwright show-report`

**Note: To run Playwright tests from `VSCode` plugin do this...**
```
yarn build && yarn serve
# And then you can run tests in VSCode
```

**Note: in CI, this is what happens...**
```
yarn test:e2e:ci
```

## Start the prod server (on port `:9000`) and keep it running
```
yarn build && yarn serve
```

**Note:** doing `yarn start` will use `react-scripts` and start the server on port 3000. It is a bit jankier, but is fine to view the rendered html. e2e tests will not, however, work.