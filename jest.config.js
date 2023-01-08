module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: { "ts-jest": { isolatedModules: true } },
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  moduleNameMapper: {},
};
