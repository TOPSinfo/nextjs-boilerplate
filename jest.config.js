const nextJest = require("next/jest");
const createJestConfig = nextJest({
    dir: "./",
});
const customJestConfig = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jest-environment-jsdom",
    modulePaths: ["<rootDir>", "./"],
    roots: ["<rootDir>", "./"],
};
module.exports = createJestConfig(customJestConfig);
global.IS_REACT_ACT_ENVIRONMENT = true
