module.exports = {
  setupFiles: ["./jest.setup.js"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/", "<rootDir>/tests_e2e/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/src/**/*.test.(ts|tsx)"],
};
