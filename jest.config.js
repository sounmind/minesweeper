module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
  },
};
