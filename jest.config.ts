import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: __dirname + "/tsconfig.jest.json",
    },
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // setupFilesAfterEnv: [__dirname + "/jest.setup.ts"],
};

export default config;
