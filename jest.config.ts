import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // If you have alias imports
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handle CSS imports
    "^../../env$": "<rootDir>/src/tests/__mocks__/env.ts", // Mock env.ts
    "^../env$": "<rootDir>/src/tests/__mocks__/env.ts", // Mock env.ts for different import paths
    "^../../store/store$": "<rootDir>/src/tests/__mocks__/store.ts", // Mock store module
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/src/tests/LoginModal.test.tsx",
    "<rootDir>/src/tests/WorkoutsPage.test.tsx",
    "<rootDir>/src/tests/CoachesPage.test.tsx",
  ],
};

export default config;
