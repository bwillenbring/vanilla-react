module.exports = {
  setupFiles: ["./jest.setup.js"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx|mjs|cjs)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/tests_e2e/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: ["**/src/**/*.test.(ts|tsx)", "**/bin/**/*.test.(ts|tsx)"],
};
