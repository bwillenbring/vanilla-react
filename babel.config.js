module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }], // Enable the new JSX transform
    "@babel/preset-typescript",
  ],
};
